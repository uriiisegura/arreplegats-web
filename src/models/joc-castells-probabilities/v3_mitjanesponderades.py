import numpy as np
from random import choices
from copy import deepcopy
from os import system


RESULTS = ['D', 'C', 'I', 'ID']

EFFECTS = {
    'D':  [ +0.75, -0.20, -0.80, +0.25 ],
    'C':  [ +0.65, +0.35, -0.60, -0.40 ],
    'I':  [ -0.65, +0.40, -0.35, +0.60 ],
    'ID': [ +0.30, -0.30, +0.70, -0.70 ]
}

CASTELLS = {
    "Pd3": {
        "pes_dependencies": 0,
        "unique": [0.15, 0.25, 0.6, 0],
        "max": 0.99,
        "k": 0.12,
        "dependencies": {}
    },
    "Pd3s": {
        "pes_dependencies": 0.6,
        "unique": [0, 0.1, 0.9, 0],
        "max": 0.99,
        "k": 0.15,
        "dependencies": {
            "Pd3": 1
        }
    },
    "Pd3n": {
        "pes_dependencies": 0.15,
        "unique": [0, 0.15, 0.85, 0],
        "max": 0.99,
        "k": 0.1,
        "dependencies": {
            "Pd3": 1
        }
    },
    "Pd4": {
        "pes_dependencies": 0.8,
        "unique": [0, 0, 0.8, 0.2],
        "max": 0.99,
        "k": 0.1,
        "dependencies": {
            "Pd3n": 0.8,
            "Pd3": 0.2
        }
    },
    "Pd4s": {
        "pes_dependencies": 0.6,
        "unique": [0, 0, 0.8, 0.2],
        "max": 0.99,
        "k": 0.1,
        "dependencies": {
            "Pd3n": 0.8,
            "Pd3s": 0.2
        }
    },
    "Pd4n": {
        "pes_dependencies": 0.15,
        "unique": [0, 0, 0.8, 0.2],
        "max": 0.98,
        "k": 0.09,
        "dependencies": {
            "Pd3n": 1,
        }
    },
    "Pd5": {
        "pes_dependencies": 0.8,
        "unique": [0, 0, 0.2, 0.8],
        "max": 0.99,
        "k": 0.08,
        "dependencies": {
            "Pd4n": 0.8,
            "Pd4": 0.2
        }
    },
    "Pd5s": {
        "pes_dependencies": 0.4,
        "unique": [0, 0, 0.2, 0.8],
        "max": 0.85,
        "k": 0.02,
        "dependencies": {
            "Pd4n": 0.8,
            "Pd4s": 0.2
        }
    },
    "FT Pd6f": {
        "pes_dependencies": 0.8,
        "unique": [0, 0, 0.2, 0.8],
        "max": 0.99,
        "k": 0.07,
        "dependencies": {
            "Pd5": 1
        }
    },
    "Pd6f": {
        "pes_dependencies": 0.3,
        "unique": [0, 0, 0.05, 0.95],
        "max": 0.97,
        "k": 0.05,
        "dependencies": {
            "FT Pd6f": 0.8
        }
    },
    "MT Pd7fm": {
        "pes_dependencies": 0.9,
        "unique": [0, 0, 0.2, 0.8],
        "max": 0.99,
        "k": 0.065,
        "dependencies": {
            "FT Pd6f": 1,
        }
    },
    "FT Pd7fm": {
        "pes_dependencies": 0.7,
        "unique": [0, 0, 0.05, 0.95],
        "max": 0.97,
        "k": 0.045,
        "dependencies": {
            "Pd6f": 0.8,
            "MT Pd7fm": 0.2
        }
    },
    "Pd7fm": {
        "pes_dependencies": 0.2,
        "unique": [0, 0, 0, 1],
        "max": 0.80,
        "k": 0.009,
        "dependencies": {
            "MT Pd7fm": 0.15,
            "FT Pd7fm": 0.85
        }
    },
    "Pd5n": {
        "pes_dependencies": 0.05,
        "unique": [0, 0, 0.2, 0.8],
        "max": 0.60,
        "k": 0.01,
        "dependencies": {
            "Pd4n": 1,
        }
    },
    "Pd6sf": {
        "pes_dependencies": 0.8,
        "unique": [0, 0, 0.2, 0.8],
        "max": 0.65,
        "k": 0.005,
        "dependencies": {
            "Pd5n": 0.95,
            "Pd5": 0.05
        }
    },
    "PT Pd8fmp": {
        "pes_dependencies": 0.7,
        "unique": [0, 0, 0.2, 0.8],
        "max": 0.99,
        "k": 0.06,
        "dependencies": {
            "MT Pd7fm": 1
        }
    },
    "MT Pd8fmp": {
        "pes_dependencies": 0.7,
        "unique": [0, 0, 0.05, 0.95],
        "max": 0.98,
        "k": 0.04,
        "dependencies": {
            "FT Pd7fm": 0.8,
            "PT Pd8fmp": 0.2
        }
    },
    "FT Pd8fmp": {
        "pes_dependencies": 0.8,
        "unique": [0, 0, 0, 1],
        "max": 0.95,
        "k": 0.008,
        "dependencies": {
            "Pd7fm": 0.8,
            "MT Pd8fmp": 0.2
        }
    },
    "Pd8fmp": {
        "pes_dependencies": 0.3,
        "unique": [0, 0, 0, 1],
        "max": 0.55,
        "k": 0.004,
        "dependencies": {
            "FT Pd8fmp": 0.7,
            "MT Pd8fmp": 0.2,
            "PT Pd8fmp": 0.1
        }
    }
}

CASTELLS_CLONE = deepcopy(CASTELLS)


def final_probability(castell):
    probs = CASTELLS[castell]
    beta = probs['pes_dependencies']
    U = probs['unique']
    D = probs['dependencies']

    dependencies = np.array([final_probability(d) * k for d, k in D.items()])
    unique = np.array(U)

    if len(dependencies) == 0:
        final = unique
    else:
        final = beta * np.sum(dependencies, axis=0) + (1 - beta) * unique
    
    if (diff := final[0] - probs['max']) > 0:
        final[0] = probs['max']
        final[1] += diff / 3
        final[2] += diff / 3
        final[3] += diff / 3
    
    return final


def calculate_delta(castell, n):
    def f(x):
        k = CASTELLS[castell]['k']
        return (k * x) / (x - 70 * (1 - k))
    return f(-n)


def improve_unique(castell, delta, result):
    probs = CASTELLS[castell]
    old_prob = probs['unique']
    deltas = [k * delta for k in EFFECTS[result]]

    new_prob = []
    for i in range(4):
        prob = old_prob[i] + deltas[i]
        if prob < 0:
            prob = 0
        new_prob.append(prob)
    new_prob = [x / sum(new_prob) for x in new_prob]
    
    CASTELLS[castell]['unique'] = new_prob

    return new_prob


def main(castell, n=100, must_print=True):
    total = {k: 0 for k in RESULTS}

    if must_print:
        print(
            f'Simulation for {castell}',
            f'N = {n}',
            f'=====================',
            f'Initial probs:',
            final_probability(castell).tolist(),
            sep='\n'
        )

    for iter in range(n):
        probs = final_probability(castell)
        result = choices(RESULTS, probs)[0]

        delta = calculate_delta(castell, sum(total.values()))
        improve_unique(castell, delta, result)

        if must_print:
            print(f'===== Iter {iter + 1}/{n} =====')
            print(f'{result} | delta: {delta}')
            print(probs.tolist())

        total[result] += 1
    
    if must_print:
        print(
            f'Final probs:',
            final_probability(castell).tolist(),
            f'=====================',
            f'Nombre de  D: {total["D"]}',
            f'Nombre de  C: {total["C"]}',
            f'Nombre de  I: {total["I"]}',
            f'Nombre de ID: {total["ID"]}',
            sep='\n'
        )


if __name__ == '__main__':
    system('clear')

    print('======== Pd3 ========')
    print(f'Initial:\n{final_probability("Pd3").tolist()}')
    main('Pd3', n=100, must_print=False)
    print(f'Final:\n{final_probability("Pd3").tolist()}')

    CASTELLS = deepcopy(CASTELLS_CLONE)

    print('======== Pd3s ========')
    print(f'Initial:\n{final_probability("Pd3s").tolist()}')
    main('Pd3', n=100, must_print=False)
    main('Pd3s', n=100, must_print=False)
    print(f'Final:\n{final_probability("Pd3s").tolist()}')

    CASTELLS = deepcopy(CASTELLS_CLONE)

    print('======== Pd4 ========')
    print(f'Initial:\n{final_probability("Pd4").tolist()}')
    main('Pd3', n=100, must_print=False)
    main('Pd3n', n=100, must_print=False)
    main('Pd4', n=100, must_print=False)
    print(f'Final:\n{final_probability("Pd4").tolist()}')

    CASTELLS = deepcopy(CASTELLS_CLONE)

    print('======== Pd4s ========')
    print(f'Initial:\n{final_probability("Pd4s").tolist()}')
    main('Pd3n', n=100, must_print=False)
    main('Pd3s', n=100, must_print=False)
    main('Pd4s', n=100, must_print=False)
    print(f'Final:\n{final_probability("Pd4s").tolist()}')

    CASTELLS = deepcopy(CASTELLS_CLONE)

    print('======== Pd5 ========')
    print(f'Initial:\n{final_probability("Pd5").tolist()}')
    main('Pd4', n=100, must_print=False)
    main('Pd4n', n=100, must_print=False)
    main('Pd5', n=100, must_print=False)
    print(f'Final:\n{final_probability("Pd5").tolist()}')

    CASTELLS = deepcopy(CASTELLS_CLONE)

    print('======== Pd5s ========')
    print(f'Initial:\n{final_probability("Pd5s").tolist()}')
    main('Pd4n', n=100, must_print=False)
    main('Pd4s', n=100, must_print=False)
    main('Pd5s', n=100, must_print=False)
    print(f'Final:\n{final_probability("Pd5s").tolist()}')

    CASTELLS = deepcopy(CASTELLS_CLONE)

    print('======== Pd6f ========')
    print(f'Initial:\n{final_probability("Pd6f").tolist()}')
    main('FT Pd6f', n=100, must_print=False)
    main('Pd6f', n=100, must_print=False)
    print(f'Final:\n{final_probability("Pd6f").tolist()}')

    CASTELLS = deepcopy(CASTELLS_CLONE)

    print('======== Pd7fm ========')
    print(f'Initial:\n{final_probability("Pd7fm").tolist()}')
    main('MT Pd7fm', n=100, must_print=False)
    main('FT Pd7fm', n=100, must_print=False)
    main('Pd7fm', n=100, must_print=False)
    print(f'Final:\n{final_probability("Pd7fm").tolist()}')

    CASTELLS = deepcopy(CASTELLS_CLONE)

    print('======== Pd6sf ========')
    print(f'Initial:\n{final_probability("Pd6sf").tolist()}')
    main('Pd5', n=100, must_print=False)
    main('Pd5n', n=100, must_print=False)
    main('Pd6sf', n=100, must_print=False)
    print(f'Final:\n{final_probability("Pd6sf").tolist()}')

    CASTELLS = deepcopy(CASTELLS_CLONE)

    print('======== Pd8fmp ========')
    print(f'Initial:\n{final_probability("Pd8fmp").tolist()}')
    main('PT Pd8fmp', n=100, must_print=False)
    main('MT Pd8fmp', n=100, must_print=False)
    main('FT Pd8fmp', n=100, must_print=False)
    main('Pd8fmp', n=100, must_print=False)
    print(f'Final:\n{final_probability("Pd8fmp").tolist()}')
