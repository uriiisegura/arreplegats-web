import numpy as np
import random
from os import system
import copy

from v3.calculateProbs import CASTELLS, CLONE_CASTELLS, RESULTS

def histogram(data, max_width=40):
    # extract the first elements
    first_elements = [sub_list[0] for sub_list in data]

    # define the number of bins
    bins = 4

    # create histogram
    histogram = [0]*bins
    for value in first_elements:
        index = int(value * bins)
        if index == bins:  # include 1.0 in the last bin
            index -= 1
        histogram[index] += 1

    # calculate width of each bar
    max_count = max(histogram)
    bar_widths = [int((count / max_count) * max_width) for count in histogram]

    # print histogram
    for i in range(bins):
        lower_limit = i / bins
        upper_limit = (i + 1) / bins
        print(f'{lower_limit:.2f}-{upper_limit:.2f}: {"|" * bar_widths[i]}')

def PFinal(castell):
    probs = CASTELLS[castell]
    PD = probs["pes_dependencies"]
    U = probs["unique"]
    D = probs["dependencies"]

    deps = np.array([ k*PFinal(d) for d, k in D.items() ])
    unique = np.array(U)

    if len(deps) == 0:
        return unique
    else:
        return PD*np.sum(deps, axis=0) + (1-PD)*unique

def improve_unique(result, castell):
    npU = np.array(CASTELLS[castell]["unique"])
    multipliers = CASTELLS[castell]["multipliers"]
    [lower_cap, upper_cap] = CASTELLS[castell]["caps"]

    # Cap
    npU = np.clip(npU, lower_cap, upper_cap)

    # Apply multipliers
    if result in multipliers:
        npU *= multipliers[result]

    # Cap
    npU[0] = min(npU[0], upper_cap)
    npU[1] = min(npU[1], upper_cap)
    npU[2] = max(lower_cap, min(npU[2], upper_cap))
    npU[3] = max(lower_cap, min(npU[3], upper_cap))

    # Normalize
    if np.sum(npU) != 0:
        npU /= np.sum(npU)
    else:
        npU = np.array([0, 0, 0, 1])

    # Update probabilities
    CASTELLS[castell]["unique"] = npU.tolist()

    return npU

def simulate_play(castell):
    probs = PFinal(castell)
    result = random.choices(RESULTS, probs)[0]
    newProbs = improve_unique(result, castell)
    
    return result, newProbs

# STRATEGY
N_ITERS = 100
COUNTS = {}

STRATEGY = [
    {
        "castell": "4d4n",
        "tries": 20
    },
    {
        "castell": "10d4n",
        "tries": 20
    },
    {
        "castell": "10d5",
        "tries": 20
    },
    {
        "castell": "4d5n",
        "tries": 20
    },
    {
        "castell": "10d5n",
        "tries": 30
    },
    {
        "castell": "10d6",
        "tries": 20
    },
    {
        "castell": "4d6n",
        "tries": 30
    },
    {
        "castell": "10d6n",
        "tries": 40
    },
    {
        "castell": "10d7",
        "tries": 40
    },
]

TRIED_CASTELLS = [
    step["castell"] for step in STRATEGY
]

for j in range(N_ITERS):
    CASTELLS = copy.deepcopy(CLONE_CASTELLS)

    for step in STRATEGY:
        castell = step["castell"]
        tries = step["tries"]

        for i in range(tries):
            result, newProbs = simulate_play(castell)

    # Calculate counts
    for castell in TRIED_CASTELLS:
        if castell not in COUNTS:
            COUNTS[castell] = [np.array(PFinal(castell))]
        else:
            COUNTS[castell] += [np.array(PFinal(castell))]

# HISTOGRAMES
for castell in TRIED_CASTELLS:
    print(castell)
    histogram(COUNTS[castell])
