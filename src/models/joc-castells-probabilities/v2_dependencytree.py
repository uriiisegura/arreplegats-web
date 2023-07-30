import numpy as np
from os import system
from pprint import pprint


RESULTS = ['D', 'C', 'I', 'ID']

EFFECT = {
    'D':  [ +0.75, -0.20, -0.80, +0.25 ],
    'C':  [ +0.65, +0.35, -0.60, -0.40 ],
    'I':  [ -0.65, +0.40, -0.35, +0.60 ],
    'ID': [ +0.30, -0.30, +0.70, -0.70 ]
}

PROBABILITIES = {
    'Pd3'   : { 'prob': [ 0.65, 0.25, 0.10, 0.00 ], 'max': 0.99, 'k': 0.120 },
    'Pd3s'  : { 'prob': [ 0.25, 0.35, 0.40, 0.00 ], 'max': 0.99, 'k': 0.150 },
    '3d5'   : { 'prob': [ 0.40, 0.30, 0.10, 0.20 ], 'max': 0.99, 'k': 0.150 },
    '4d5'   : { 'prob': [ 0.40, 0.30, 0.10, 0.20 ], 'max': 0.99, 'k': 0.170 },
    'Td5'   : { 'prob': [ 0.35, 0.25, 0.25, 0.15 ], 'max': 0.99, 'k': 0.130 },
    '3d5a'  : { 'prob': [ 0.20, 0.35, 0.15, 0.30 ], 'max': 0.99, 'k': 0.120 },
    '4d5a'  : { 'prob': [ 0.20, 0.35, 0.15, 0.30 ], 'max': 0.99, 'k': 0.140 },
    'Pd4'   : { 'prob': [ 0.20, 0.30, 0.40, 0.10 ], 'max': 0.99, 'k': 0.100 },
    '5d5'   : { 'prob': [ 0.15, 0.20, 0.35, 0.30 ], 'max': 0.99, 'k': 0.150 },
    '5d5m'  : { 'prob': [ 0.10, 0.25, 0.30, 0.35 ], 'max': 0.99, 'k': 0.130 },
    '3d5s'  : { 'prob': [ 0.17, 0.15, 0.40, 0.28 ], 'max': 0.99, 'k': 0.120 },
    'Td5s'  : { 'prob': [ 0.15, 0.13, 0.42, 0.30 ], 'max': 0.99, 'k': 0.110 },
    '7d5'   : { 'prob': [ 0.20, 0.15, 0.30, 0.35 ], 'max': 0.99, 'k': 0.150 },
    '9d5'   : { 'prob': [ 0.17, 0.18, 0.33, 0.32 ], 'max': 0.99, 'k': 0.130 },
    'Pd4s'  : { 'prob': [ 0.10, 0.15, 0.45, 0.30 ], 'max': 0.99, 'k': 0.100 },

    'Td8fm' : { 'prob': [ 0.00, 0.00, 0.80, 0.20 ], 'max': 0.65, 'k': 0.006 },
}

DEPENDENCY_TREE = {
    'Pd3': [
        {
            'castell': 'Pd3s',
            'index': 0.05
        },
        {
            'castell': 'Pd4',
            'index': 0.01
        },
        {
            'castell': '3d5a',
            'index': 0.03
        },
        {
            'castell': '4d5a',
            'index': 0.03
        }
    ]
}


def calculate_delta(castell, n):
    def f(x):
        k = PROBABILITIES[castell]['k']
        return (k * x) / (x - 70 * (1 - k))
    return f(-n)


def new_probabilities(castell, delta, outcome, index=1):
    old_prob = PROBABILITIES[castell]['prob']
    deltas = [index * k * delta for k in EFFECT[outcome]]

    new_prob = []
    for i in range(4):
        prob = old_prob[i] + deltas[i]
        if prob < 0:
            prob = 0
        new_prob.append(prob)
    
    if new_prob[0] > PROBABILITIES[castell]['max']:
        PROBABILITIES[castell]['prob'][0] = PROBABILITIES[castell]['max']

    return [x / sum(new_prob) for x in new_prob]


def main(castell, n=100):
    total = {k: 0 for k in RESULTS}

    for iter in range(n):
        outcome = np.random.choice(RESULTS, p=PROBABILITIES[castell]['prob'])
        total[outcome] += 1

        delta = calculate_delta(castell, sum(total.values()))

        print(f'===== Iter {iter + 1}/{n} =====')
        print(f'{outcome} | delta: {delta}')
        print(PROBABILITIES[castell]['prob'])

        PROBABILITIES[castell]['prob'] = new_probabilities(castell, delta, outcome)

        print(PROBABILITIES[castell]['prob'])


        try:
            for c in DEPENDENCY_TREE[castell]:
                PROBABILITIES[c['castell']]['prob'] = new_probabilities(c['castell'], delta, outcome, index=c['index'])
        except KeyError:
            print(f'No dependencies for {castell}, skipping...')
    
    print(
        f'==============================================',
        f'==============================================',
        f'==============================================',
        f'Nombre de D: {total["D"]}',
        f'Nombre de C: {total["C"]}',
        f'Nombre de I: {total["I"]}',
        f'Nombre de ID: {total["ID"]}',
        f'==============================================',
        sep='\n'
    )


if __name__ == '__main__':
    system('clear')

    main('Td8fm', n=1000)
    pprint(PROBABILITIES)
