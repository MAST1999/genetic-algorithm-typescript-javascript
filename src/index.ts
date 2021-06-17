/* eslint-disable prefer-const */
type GeneticAlgorithm = {
  population: Population;
  iterate: number;
  candidateBits: number;
  crossOver: number;
  mutationRate: number;
  scores: number[];
};

let algorithm: (
  info: GeneticAlgorithm
) => { bestPerson: number[]; bestScore: number };

type Population = number[][];

const generatePopulation = (
  numberOfPopulation: number,
  candidateBits: number
): { population: Population; scores: number[] } => {
  const population: Population = [];
  const scores: number[] = [];
  for (let i = 0; i < numberOfPopulation; i++) {
    let personScore = 0;
    const person: number[] = [];
    for (let j = 0; j < candidateBits; j++) {
      person.push(Math.floor(Math.random() * 2));
      personScore += person[person.length - 1];
    }
    population.push(person);
    scores.push(personScore);
  }
  return { population, scores };
};

const selectPopulation = (
  population: Population,
  scores: number[]
): { selectedPopulation: Population; selectedScores: number[] } => {
  const selectedPopulation: Population = [];
  const selectedScores: number[] = [];
  let maxFitness = 0;
  scores.forEach((score) => {
    maxFitness += score;
  });
  for (let counter = 0; counter < population.length; counter++) {
    const pick: number = Math.floor(Math.random() * maxFitness) + 1;
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

algorithm = ({
  population,
  candidateBits,
  crossOver,
  iterate,
  mutationRate,
  scores,
}) => {
  let bestScore = 0;
  let bestPerson: number[] = [];
  return { bestPerson, bestScore };
};

const numberOfPopulation = 100;
const iterate = 100;
const candidateBits = 20;
const crossOverMargin = 0.9;
const mutationRate = 1.0 / candidateBits;

const {
  population,
  scores,
}: { population: Population; scores: number[] } = generatePopulation(
  numberOfPopulation,
  candidateBits
);

const { selectedPopulation, selectedScores } = selectPopulation(
  population,
  scores
);

const { bestPerson, bestScore } = algorithm({
  population: selectedPopulation,
  candidateBits,
  crossOver: crossOverMargin,
  iterate,
  mutationRate,
  scores: selectedScores,
});

console.log(bestPerson, bestScore);
