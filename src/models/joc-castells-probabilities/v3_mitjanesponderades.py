import numpy as np
import random
from os import system
import copy

# Define the multipliers
MULTIPLIERS = {
    "D": [1.2, 0.85, 0.85, 0.85],
    "C": [1.1, 1.05, 0.9, 1.05],
    "I": [0.95, 0.95, 0.8, 1.1],
    "ID": [1, 1, 1.05, 0.8],
}

# Define the caps
LOWER_CAP = 0.02
UPPER_CAP = 0.96

CASTELLS = {
    "pd3": {
        "pes_dependencies": 0,
        "unique": [0.1, 0.2, 0.4, 0.3],
        "dependencies": {}
    },
    "pd3s": {
        "pes_dependencies": 0.6,
        "unique": [0, 0.1, 0.8, 0.1],
        "dependencies": {
            "pd3": 1
        }
    },
    "pd3n": {
        "pes_dependencies": 0.15,
        "unique": [0, 0.1, 0.8, 0.1],
        "dependencies": {
            "pd3": 1
        }
    },
    "pd4": {
        "pes_dependencies": 0.8,
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "pd3n": 0.8,
            "pd3": 0.2
        }
    },
    "pd4s": {
        "pes_dependencies": 0.6,
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "pd3n": 0.8,
            "pd3s": 0.2
        }
    },
    "pd4n": {
        "pes_dependencies": 0.15,
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "pd3n": 1,
        }
    },
    "pd5": {
        "pes_dependencies": 0.8,
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "pd4n": 0.8,
            "pd4": 0.2
        }
    },
    "pd5s": {
        "pes_dependencies": 0.4,
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "pd4n": 0.8,
            "pd4s": 0.2
        }
    },
    "pd5n": {
        "pes_dependencies": 0.05,
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "pd4n": 1,
        }
    },
    "pd6sf": {
        "pes_dependencies": 0.8,
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "pd5n": 0.95,
            "pd5": 0.05
        }
    },
    "ftpd6f": {
        "pes_dependencies": 0.8,
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "pd5": 1
        }
    },
    "pd6f": {
        "pes_dependencies": 0.3,
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "ftpd6f": 0.8
        }
    },
    "mtpd7fm": {
        "pes_dependencies": 0.9,
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "ftpd6f": 1,
        }
    },
    "ftpd7fm": {
        "pes_dependencies": 0.7,
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "pd6f": 0.8,
            "mtpd7fm": 0.2
        }
    },
    "pd7fm": {
        "pes_dependencies": 0.2,
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "ftpd7fm": 1
        }
    },
    "ptpd8fmp": {
        "pes_dependencies": 0.7,
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "mtpd7fm": 1
        }
    },
    "mtftpd8fmp": {
        "pes_dependencies": 0.7,
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "ftpd7fm": 0.8,
            "ptpd8fmp": 0.2
        }
    },
    "ftpd8fmp": {
        "pes_dependencies": 0.8,
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "pd7fm": 0.8,
            "mtftpd8fmp": 0.2
        }
    },
    "pd8fmp": {
        "pes_dependencies": 0.3,
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
    probs = CASTELLS[castell]
    npU = np.array(probs["unique"])

    # Cap
    npU = np.clip(npU, LOWER_CAP, UPPER_CAP)

    # Apply multipliers
    if result in MULTIPLIERS:
        npU *= MULTIPLIERS[result]

    # Cap
    npU[0] = min(npU[0], UPPER_CAP)
    npU[1] = min(npU[1], UPPER_CAP)
    npU[2] = max(LOWER_CAP, min(npU[2], UPPER_CAP))
    npU[3] = max(LOWER_CAP, min(npU[3], UPPER_CAP))

    # Normalize
    if np.sum(npU) != 0:
        npU /= np.sum(npU)
    else:
        npU = np.array([0, 0, 0, 1])

    # Update probabilities
    probs["unique"] = npU.tolist()

    return npU

def simulate_play(castell):
    probs = PFinal(castell)
    result = random.choices(["D", "C", "I", "ID"], probs)[0]
    newProbs = improve_unique(result, castell)
    
    return result, newProbs

# STRATEGY
TOTAL_STEPS = 0
DOMINATS = 0

for j in range(1000):
    # pd3
    # print("before pd3, pd3:", PFinal("pd3"))

    for i in range(20):
        result, newProbs = simulate_play("pd3")
        # print(result, newProbs)

    TOTAL_STEPS += 20
    # print("after pd3, pd3:", PFinal("pd3"))
    # print("total steps for pd3:", TOTAL_STEPS)

    # pd3n
    # print("before pd3n, pd3n:", PFinal("pd3n"))

    for i in range(40):
        result, newProbs = simulate_play("pd3n")
        # print(result, newProbs)

    TOTAL_STEPS += 40
    # print("after pd3n, pd3n:", round(PFinal("pd3n")[0]*100), PFinal("pd3n"))
    # print("total steps for pd3n:", TOTAL_STEPS)

    # pd4
    # print("before pd4, pd4:", PFinal("pd4"))

    for i in range(20):
        result, newProbs = simulate_play("pd4")
        # print(result, newProbs)

    # print("after pd4, pd4:", PFinal("pd4"))

    # pd4n
    # print("before pd4n, pd4n:", PFinal("pd4n"))

    for i in range(40):
        result, newProbs = simulate_play("pd4n")
        # print(result, newProbs)

    # print("after pd4n, pd4n:", PFinal("pd4n"))

    # pd5
    # print("before pd5, pd5:", PFinal("pd5"))

    for i in range(20):
        result, newProbs = simulate_play("pd5")
        # print(result, newProbs)

    # print("after pd5, pd5:", PFinal("pd5"))

    # pd5n
    # print("before pd5n, pd5n:", PFinal("pd5n"))

    for i in range(40):
        result, newProbs = simulate_play("pd5n")
        # print(result, newProbs)

    # print("after pd5n, pd5n:", PFinal("pd5n"))

    # pd6sf
    # print("before pd6sf, pd6sf:", PFinal("pd6sf"))

    for i in range(20):
        result, newProbs = simulate_play("pd6sf")
        # print(result, newProbs)

    # print("after pd6sf, pd6sf:", PFinal("pd6sf"))

    DOMINATS += 1 if PFinal("pd6sf")[0] > 0.5 else 0
    CASTELLS = copy.deepcopy(CLONE_CASTELLS)

print(DOMINATS, "pd6sf", "dominats de 1000", sep=" ")