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

def PFinal(castell):
    import numpy as np

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
    import numpy as np

    probs = CASTELLS[castell]
    npU = np.array(probs["unique"])

    # Cap
    npU = np.clip(npU, 0.05, 0.95)

    if result == "D":
        npU[0] *= 1.2
        npU[1] *= 0.9
        npU[2] *= 0.85
        npU[3] *= 0.9
    elif result == "C":
        npU[0] *= 1.05
        npU[1] *= 1.1
        npU[2] *= 0.9
        npU[3] *= 1.05
    elif result == "I":
        npU[0] *= 0.95
        npU[1] *= 0.95
        npU[2] *= 0.8
        npU[3] *= 1.1
    elif result == "ID":
        npU[0] *= 1
        npU[1] *= 1
        npU[2] *= 1.05
        npU[3] *= 0.8

    # Cap
    npU[0] = min(npU[0], 0.95)
    npU[1] = min(npU[1], 0.95)
    npU[2] = max(0.05, min(npU[2], 0.95))
    npU[3] = max(0.05, min(npU[3], 0.95))
    
    # Normalize
    if np.sum(npU) != 0:
        npU /= np.sum(npU)
    else:
        npU = np.array([0, 0, 0, 1])

    # Update probabilities
    probs["unique"] = npU.tolist()

    return npU

def simulate_play(castell):
    import random

    probs = PFinal(castell)
    result = random.choices(["D", "C", "I", "ID"], probs)[0]
    newProbs = improve_unique(result, castell)
    
    return result, newProbs

# Main
print("start pd3:", PFinal("pd3"))
print("start pd3n:", PFinal("pd3n"))
print("start pd4:", PFinal("pd4"))

# pd3
print("before pd3, pd3:", PFinal("pd3"))

for i in range(20):
    result, newProbs = simulate_play("pd3")
    # print(result, newProbs)

print("after pd3, pd3:", PFinal("pd3"))

# pd3n
print("before pd3n, pd3n:", PFinal("pd3n"))

for i in range(30):
    result, newProbs = simulate_play("pd3n")
    # print(result, newProbs)

print("after pd3n, pd3n:", PFinal("pd3n"))

# pd4
print("before pd4, pd4:", PFinal("pd4"))

for i in range(20):
    result, newProbs = simulate_play("pd4")
    # print(result, newProbs)

print("after pd4, pd4:", PFinal("pd4"))