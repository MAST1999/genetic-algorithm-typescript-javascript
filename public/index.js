"use strict";
let algorithm;
const generatePopulation = (numberOfPopulation, candidateBits) => {
    const population = [];
    const scores = [];
    for (let i = 0; i < numberOfPopulation; i++) {
        let personScore = 0;
        const person = [];
        for (let j = 0; j < candidateBits; j++) {
            person.push(Math.floor(Math.random() * 2));
            personScore += person[person.length - 1];
        }
        population.push(person);
        scores.push(personScore);
    }
    return { population, scores };
};
const selectPopulation = (population, scores) => {
    const selectedPopulation = [];
    const selectedScores = [];
    let maxFitness = 0;
    scores.forEach((score) => {
        maxFitness += score;
    });
    for (let counter = 0; counter < population.length; counter++) {
        const pick = Math.floor(Math.random() * maxFitness) + 1;
        let current = 0;
        for (let i = 0; i < population.length; i++) {
            current += scores[i];
            if (current > pick) {
                selectedPopulation.push(population[i]);
                selectedScores.push(scores[i]);
                break;
            }
        }
    }
    return { selectedPopulation, selectedScores };
};
algorithm = ({ population, candidateBits, crossOver, iterate, mutationRate, scores, }) => {
    let bestScore = 0;
    let bestPerson = [];
    return { bestPerson, bestScore };
};
const numberOfPopulation = 100;
const iterate = 100;
const candidateBits = 20;
const crossOverMargin = 0.9;
const mutationRate = 1.0 / candidateBits;
const { population, scores, } = generatePopulation(numberOfPopulation, candidateBits);
const { selectedPopulation, selectedScores } = selectPopulation(population, scores);
const { bestPerson, bestScore } = algorithm({
    population: selectedPopulation,
    candidateBits,
    crossOver: crossOverMargin,
    iterate,
    mutationRate,
    scores: selectedScores,
});
console.log(bestPerson, bestScore);
