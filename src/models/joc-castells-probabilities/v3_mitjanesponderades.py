import numpy as np
import random
from os import system
import copy

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
        upper_limit = (i + 1) / bins
        print(f'{upper_limit:.2f}: {"|" * bar_widths[i]}')

# Define the multipliers
EASY_MULTIPLIERS = {
    "D": [1.2, 0.85, 0.85, 0.85],
    "C": [1.1, 1.05, 0.9, 1.05],
    "I": [0.95, 0.95, 0.8, 1.1],
    "ID": [1, 1, 1.05, 0.8],
}

MEDIUM_MULTIPLIERS = {
    "D": [1.1, 0.85, 0.85, 0.85],
    "C": [1.05, 1.05, 0.95, 1.05],
    "I": [0.95, 0.95, 0.85, 1.1],
    "ID": [1, 1, 1.05, 0.85],
}

HARD_MULTIPLIERS = {
    "D": [1.1, 0.9, 0.9, 0.9],
    "C": [1.05, 1.05, 0.95, 1.05],
    "I": [0.95, 0.95, 0.85, 1.1],
    "ID": [1, 1, 1.05, 0.85],
}

IMPOSSIBLE_MULTIPLIERS = {
    "D": [1.1, 0.95, 0.95, 0.95],
    "C": [1.05, 1.05, 0.95, 1.05],
    "I": [0.95, 0.95, 0.95, 1.05],
    "ID": [1, 1, 1.05, 0.95],
}

# Define the caps
DEFAULT_LOWER_CAP = 0.02
DEFAULT_UPPER_CAP = 0.96

CASTELLS = {
    "pd3": {
        "pes_dependencies": 0,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0.1, 0.2, 0.4, 0.3],
        "dependencies": {},
    },
    "pd3s": {
        "pes_dependencies": 0.6,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0.1, 0.8, 0.1],
        "dependencies": {
            "pd3": 1
        }
    },
    "pd3n": {
        "pes_dependencies": 0.15,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0.1, 0.8, 0.1],
        "dependencies": {
            "pd3": 1
        }
    },
    "pd4": {
        "pes_dependencies": 0.8,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "pd3n": 0.8,
            "pd3": 0.2
        }
    },
    "pd4s": {
        "pes_dependencies": 0.6,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "pd3n": 0.8,
            "pd3s": 0.2
        }
    },
    "pd4n": {
        "pes_dependencies": 0.15,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "pd3n": 1,
        }
    },
    "pd5": {
        "pes_dependencies": 0.8,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "pd4n": 0.8,
            "pd4": 0.2
        }
    },
    "pd5s": {
        "pes_dependencies": 0.4,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "pd4n": 0.8,
            "pd4s": 0.2
        }
    },
    "pd5n": {
        "pes_dependencies": 0.2,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "pd4n": 1,
        }
    },
    "pd6sf": {
        "pes_dependencies": 0.8,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "pd5n": 0.95,
            "pd5": 0.05
        }
    },
    "ftpd6f": {
        "pes_dependencies": 0.8,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "pd5": 1
        }
    },
    "pd6f": {
        "pes_dependencies": 0.3,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "ftpd6f": 1
        }
    },
    "mtpd7fm": {
        "pes_dependencies": 0.9,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "ftpd6f": 1,
        }
    },
    "ftpd7fm": {
        "pes_dependencies": 0.7,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "pd6f": 0.8,
            "mtpd7fm": 0.2
        }
    },
    "pd7fm": {
        "pes_dependencies": 0.2,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "ftpd7fm": 1
        }
    },
    "ptpd8fmp": {
        "pes_dependencies": 0.7,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "mtpd7fm": 1
        }
    },
    "mtftpd8fmp": {
        "pes_dependencies": 0.7,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "ftpd7fm": 0.8,
            "ptpd8fmp": 0.2
        }
    },
    "ftpd8fmp": {
        "pes_dependencies": 0.8,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "pd7fm": 0.8,
            "mtftpd8fmp": 0.2
        }
    },
    "pd8fmp": {
        "pes_dependencies": 0.2,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "ftpd8fmp": 0.7,
            "mtftpd8fmp": 0.2,
            "ptpd8fmp": 0.1
        }
    }
}

CLONE_CASTELLS = copy.deepcopy(CASTELLS)

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
    result = random.choices(["D", "C", "I", "ID"], probs)[0]
    newProbs = improve_unique(result, castell)
    
    return result, newProbs

# STRATEGY
N_ITERS = 10
COUNTS = {}

for j in range(N_ITERS):
    CASTELLS = copy.deepcopy(CLONE_CASTELLS)

    for i in range(20):
        result, newProbs = simulate_play("pd3")

    for i in range(40):
        result, newProbs = simulate_play("pd3n")

    for i in range(20):
        result, newProbs = simulate_play("pd4")

    for i in range(100):
        result, newProbs = simulate_play("pd4n")

    for i in range(100):
        result, newProbs = simulate_play("pd5")

    for i in range(40):
        result, newProbs = simulate_play("ftpd6f")

    for i in range(50):
        result, newProbs = simulate_play("pd6f")

    for i in range(20):
        result, newProbs = simulate_play("mtpd7fm")

    for i in range(40):
        result, newProbs = simulate_play("ftpd7fm")

    for i in range(80):
        result, newProbs = simulate_play("pd7fm")

    for i in range(30):
        result, newProbs = simulate_play("ptpd8fmp")

    for i in range(30):
        result, newProbs = simulate_play("mtftpd8fmp")

    for i in range(40):
        result, newProbs = simulate_play("ftpd8fmp")

    for i in range(80):
        result, newProbs = simulate_play("pd8fmp")

    for i in range(160):
        result, newProbs = simulate_play("pd5n")

    for i in range(40):
        result, newProbs = simulate_play("pd6sf")

    # Calculate counts
    for castell in CASTELLS:
        if castell not in COUNTS:
            COUNTS[castell] = [np.array(PFinal(castell))]
        else:
            COUNTS[castell] += [np.array(PFinal(castell))]

# HISTOGRAMES
for castell in CASTELLS:
    print(castell)
    histogram(COUNTS[castell])