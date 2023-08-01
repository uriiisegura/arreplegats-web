const RESULTS = ['DESCARREGAT', 'CARREGAT', 'INTENT', 'INTENT DESMUNTAT'];

function PFinal(stats, castell) {
    const probs = stats[castell];
    const PD = probs["pes_dependencies"];
    const U = probs["unique"];
    const D = probs["dependencies"];

    const deps = Object.keys(D).map(d => D[d] * PFinal(d));
    const unique = U;

    if (deps.length == 0) {
        return unique;
    } else {
        const sumDeps = deps.reduce((a, b) => a + b, 0);
        return PD * sumDeps + (1 - PD) * unique;
    }
}

function improveUniques(stats, result, castell) {
    let uniques = [...stats[castell]["unique"]];
    const multipliers = stats[castell]["multipliers"];
    const [lower_cap, upper_cap] = stats[castell]["caps"];

    // Cap
    uniques = uniques.map(val => Math.max(lower_cap, Math.min(val, upper_cap)));

    // Apply multipliers
    if (result in multipliers) {
        uniques = uniques.map(val => val * multipliers[result]);
    }

    // Cap
    uniques[0] = Math.min(uniques[0], upper_cap);
    uniques[1] = Math.min(uniques[1], upper_cap);
    uniques[2] = Math.max(lower_cap, Math.min(uniques[2], upper_cap));
    uniques[3] = Math.max(lower_cap, Math.min(uniques[3], upper_cap));

    // Normalize
    let sumU = uniques.reduce((a, b) => a + b, 0);
    if (sumU !== 0) {
        uniques = uniques.map(val => val / sumU);
    } else {
        uniques = [0, 0, 0, 1];
    }

    // Update probabilities
    stats[castell]["unique"] = [...uniques];

    return uniques;
}

export function updateProbs({ stats, castell, result }) {
    improveUniques(stats, castell, result)
}

function weightedRandomChoice(options, weights) {
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const randomNum = Math.random() * totalWeight;
    const weightSum = 0;

    for (const i = 0; i < options.length; i++) {
        weightSum += weights[i];
        weightSum = +weightSum.toFixed(2);

        if (randomNum < weightSum) {
            return options[i];
        }
    }
}

export function getCastellResult(castell) {
    const probs = PFinal(castell);
    const result = weightedRandomChoice(RESULTS, probs);
    
    return {
        result: result,
        oldProbs: probs,
    }
}