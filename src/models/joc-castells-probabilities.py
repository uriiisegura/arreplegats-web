import numpy as np
from os import system


PROBABILITATS_INICIALS = [0.05, 0.05, 0.7, 0.2]

PROBABILITAT_MAXIMA = 0.7
PROBABILITAT_MINIMA = 0.05


def pointwise_prod(list1, list2):
    result = []
    for i in range(len(list1)):
        result.append(list1[i] * list2[i])
    return result


def main():
    if abs((total := sum(PROBABILITATS_INICIALS)) - 1) > 0.01:
        print(f'ERROR: initial probabilities add to {"%.2f" % total} but must be 1!')
        return
    if PROBABILITATS_INICIALS[0] > PROBABILITAT_MAXIMA or PROBABILITATS_INICIALS[0] < PROBABILITAT_MINIMA:
        print(f'ERROR: initial probability is {PROBABILITATS_INICIALS[0]} but must be between {PROBABILITAT_MINIMA} and {PROBABILITAT_MAXIMA}!')
        return

    coefs_D  = [ 1.1, 1.05, 0.95, 0.9  ]
    coefs_C  = [ 1  , 0.9 , 0.8 , 1.1  ]
    coefs_I  = [ 0.8, 0.9 , 0.9 , 1.05 ]
    coefs_ID = [ 1  , 1.05, 1.1 , 0.8  ]

    prob = PROBABILITATS_INICIALS
    Nd = Nc = Ni = Nid = 0

    for _ in range(100):
        outcome = np.random.choice(['D', 'C', 'I', 'ID'], p=prob)

        if outcome == 'D':
            prob = pointwise_prod(prob, coefs_D)
            Nd += 1
        elif outcome == 'C':
            prob = pointwise_prod(prob, coefs_C)
            Nc += 1
        elif outcome == 'I':
            prob = pointwise_prod(prob, coefs_I)
            Ni += 1
        else:
            prob = pointwise_prod(prob, coefs_ID)
            Nid += 1
        print(outcome)

        if prob[0] > PROBABILITAT_MAXIMA:
            prob[0] = PROBABILITAT_MAXIMA
        elif prob[0] < PROBABILITAT_MINIMA:
            prob[0] = PROBABILITAT_MINIMA

        # Normalize
        prob = [x / sum(prob) for x in prob]

    prob = np.array(prob) * 100

    print(
        f'Probabilitat de D: {"%.2f" % prob[0]}%',
        f'Probabilitat de C: {"%.2f" % prob[1]}%',
        f'Probabilitat de I: {"%.2f" % prob[2]}%',
        f'Probabilitat de ID: {"%.2f" % prob[3]}%',
        f'Nombre de D: {Nd}',
        f'Nombre de C: {Nc}',
        f'Nombre de I: {Ni}',
        f'Nombre de ID: {Nid}',
        sep='\n'
    )

    print(
        ',',
        f'"probabilitatsInicials": {PROBABILITATS_INICIALS},',
        f'"probabilitatsLimit": [{PROBABILITAT_MAXIMA}, {PROBABILITAT_MINIMA}]',
        sep='\n\t\t'
    )


if __name__ == '__main__':
    system('clear')
    main()
