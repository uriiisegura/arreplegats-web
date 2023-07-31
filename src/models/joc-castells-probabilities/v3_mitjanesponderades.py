import numpy as np
from random import choices
from os import system


RESULTS = ['D', 'C', 'I', 'ID']

CASTELLS = {
    "Pd3": {
        "pes_dependencies": 0,
        "unique": [0.05, 0.15, 0.4, 0.3],
        "dependencies": {}
    },
    "Pd3s": {
        "pes_dependencies": 0.6,
        "unique": [0, 0.1, 0.8, 0.1],
        "dependencies": {
            "Pd3": 1
        }
    },
    "Pd3n": {
        "pes_dependencies": 0.15,
        "unique": [0, 0.1, 0.8, 0.1],
        "dependencies": {
            "Pd3": 1
        }
    },
    "Pd4": {
        "pes_dependencies": 0.8,
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "Pd3n": 0.8,
            "Pd3": 0.2
        }
    },
    "Pd4s": {
        "pes_dependencies": 0.6,
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "Pd3n": 0.8,
            "Pd3s": 0.2
        }
    },
    "Pd4n": {
        "pes_dependencies": 0.15,
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "Pd3n": 1,
        }
    },
    "Pd5": {
        "pes_dependencies": 0.8,
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "Pd4n": 0.8,
            "Pd4": 0.2
        }
    },
    "Pd5s": {
        "pes_dependencies": 0.4,
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "Pd4n": 0.8,
            "Pd4s": 0.2
        }
    },
    "Pd5n": {
        "pes_dependencies": 0.05,
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "Pd4n": 1,
        }
    },
    "Pd6sf": {
        "pes_dependencies": 0.8,
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "Pd5n": 0.95,
            "Pd5": 0.05
        }
    },
    "FT Pd6f": {
        "pes_dependencies": 0.8,
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "Pd5": 1
        }
    },
    "Pd6f": {
        "pes_dependencies": 0.3,
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "FT Pd6f": 0.8
        }
    },
    "MT Pd7fm": {
        "pes_dependencies": 0.9,
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "FT Pd6f": 1,
        }
    },
    "FT Pd7fm": {
        "pes_dependencies": 0.7,
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "Pd6f": 0.8,
            "MT Pd7fm": 0.2
        }
    },
    "Pd7fm": {
        "pes_dependencies": 0.2,
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "FT Pd7fm": 1
        }
    },
    "PT Pd8fmp": {
        "pes_dependencies": 0.7,
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "MT Pd7fm": 1
        }
    },
    "MT Pd8fmp": {
        "pes_dependencies": 0.7,
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "FT Pd7fm": 0.8,
            "PT Pd8fmp": 0.2
        }
    },
    "FT Pd8fmp": {
        "pes_dependencies": 0.8,
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "Pd7fm": 0.8,
            "MT Pd8fmp": 0.2
        }
    },
    "Pd8fmp": {
        "pes_dependencies": 0.3,
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "FT Pd8fmp": 0.7,
            "MT Pd8fmp": 0.2,
            "PT Pd8fmp": 0.1
        }
    }
}


def final_probability(castell):
    probs = CASTELLS[castell]
    beta = probs['pes_dependencies']
    U = probs['unique']
    D = probs['dependencies']

    dependencies = np.array([final_probability(d) * k for d, k in D.items()])
    unique = np.array(U)

    if len(dependencies) == 0:
        return unique
    else:
        return beta * np.sum(dependencies) + (1 - beta) * unique


def simulate_play(castell):
    probs = final_probability(castell)
    return choices(RESULTS, probs)[0]


def main(castell, n=10):
    total = {k: 0 for k in RESULTS}

    for _ in range(n):
        res = simulate_play(castell)
        total[res] += 1
    
    print(
        f'Simulation for {castell}',
        f'N = {n}',
        f'====================',
        f'Nombre de  D: {total["D"]}',
        f'Nombre de  C: {total["C"]}',
        f'Nombre de  I: {total["I"]}',
        f'Nombre de ID: {total["ID"]}',
        sep='\n'
    )


if __name__ == '__main__':
    system('clear')

    main('Pd3', n=1000)
