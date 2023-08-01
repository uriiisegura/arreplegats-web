const RESULTS = ['DESCARREGAT', 'CARREGAT', 'INTENT', 'INTENT DESMUNTAT'];

function sum_lists(...list) {
    const result = [];
    for (let i = 0; i < list[0].length; i++) {
        result.push(list.reduce((a, b) => a + b[i], 0));
    }
    return result;
}

function PFinal(stats, castell) {
    const probs = stats[castell]['probabilitats'];
    const PD = probs["pes_dependencies"];
    const D = probs["dependencies"];
    const unique = probs["unique"];

    const deps = Object.keys(D).map(d => PFinal(d).map(el => el * D[d]));

    if (deps.length == 0) {
        return unique;
    } else {
        return sum_lists(
            sum_lists(deps).map(el => PD * el),
            unique.map(el => (1 - PD) * el)
        )
    }
}

function improveUniques(stats, castell, result) {
    let uniques = stats[castell]['probabilitats']["unique"]
    const multipliers = stats[castell]['probabilitats']["multipliers"]
    const [lower_cap, upper_cap] = stats[castell]['probabilitats']["caps"]

    // Cap
    uniques = uniques.map(val => Math.max(lower_cap, Math.min(val, upper_cap)));

    // Apply multipliers
    if (result in multipliers) {
        uniques = uniques.map((val, i) => val * multipliers[result][i]);
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
    stats[castell]['probabilitats']["unique"] = uniques

    return {
        newProbs: PFinal(stats, castell)
    }
}

export function updateProbs({ stats, castell, result }) {
    return improveUniques(stats, castell, result)
}

function weightedRandomChoice(options, weights) {
    if (options.length !== weights.length) {
        throw new Error("Options and weights arrays must have the same length");
    }

    let cumWeights = [];
    weights.reduce((a, b, i) => cumWeights[i] = a + b, 0);

    let random = Math.random() * cumWeights[cumWeights.length - 1];
    let index = cumWeights.findIndex(cumWeight => random < cumWeight);
    return options[index];
}

export function generateCastellResult({ stats, castell }) {
    const probs = PFinal(stats, castell);
    const result = weightedRandomChoice(RESULTS, probs);

    return {
        result: result,
        oldProbs: probs,
    }
}