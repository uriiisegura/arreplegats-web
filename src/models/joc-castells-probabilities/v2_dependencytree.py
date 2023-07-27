import numpy as np
from os import system
from pprint import pprint


RESULTS = ['D', 'C', 'I', 'ID']

INCREMENT = {
    'D':  [ 0.75, 0.00, 0.00, 0.25 ],
    'C':  [ 0.65, 0.35, 0.00, 0.00 ],
    'I':  [ 0.00, 0.40, 0.00, 0.60 ],
    'ID': [ 0.40, 0.00, 0.60, 0.00 ]
}

DECREMENT = {
    'D':  [ 0.00, 0.20, 0.80, 0.00 ],
    'C':  [ 0.00, 0.00, 0.60, 0.40 ],
    'I':  [ 0.65, 0.00, 0.35, 0.00 ],
    'ID': [ 0.00, 0.30, 0.00, 0.70 ]
}

PROBABILITIES = {
    'Pd3':  { 'prob': [ 0.65, 0.25, 0.10, 0.00 ], 'max': 0.99 },
    'Pd3s': { 'prob': [ 0.50, 0.30, 0.20, 0.00 ], 'max': 0.99 },
    'Pd4':  { 'prob': [ 0.40, 0.35, 0.15, 0.10 ], 'max': 0.99 },
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
        }
    ]
}


def probability_delta(castell):
    delta = 0.2
    return delta


def new_probabilities(castell, delta, outcome, index=1):
    old_prob = PROBABILITIES[castell]['prob']
    inc_deltas = [index * k * delta for k in INCREMENT[outcome]]
    dec_deltas = [index * k * delta for k in DECREMENT[outcome]]

    new_prob = []
    for i in range(4):
        prob  = old_prob[i] + inc_deltas[i]
        prob -= dec_deltas[i]
        if prob < 0:
            prob = 0
        new_prob.append(prob)
    
    if new_prob[0] > PROBABILITIES[castell]['max']:
        PROBABILITIES[castell]['prob'][0] = PROBABILITIES[castell]['max']

    return [x / sum(new_prob) for x in new_prob]


def main(castell, n=100):
    total = { 'D': 0, 'C': 0, 'I': 0, 'ID': 0}

    for iter in range(n):
        outcome = np.random.choice(RESULTS, p=PROBABILITIES[castell]['prob'])

        delta = probability_delta(castell)

        print(f'===== Iter {iter + 1}/{n} =====')
        print(f'{outcome} | {delta}')
        print(PROBABILITIES[castell]['prob'])

        PROBABILITIES[castell]['prob'] = new_probabilities(castell, delta, outcome)

        print(PROBABILITIES[castell]['prob'])

        total[outcome] += 1

        for c in DEPENDENCY_TREE[castell]:
            PROBABILITIES[c['castell']]['prob'] = new_probabilities(c['castell'], delta, outcome, index=c['index'])
    
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

    main('Pd3')
    pprint(PROBABILITIES)
