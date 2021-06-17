"use strict";
// calculate score
const calcScore = (p) => {
  let sum = [];
  p.forEach((someone) => {
    let sumForSomeone = 0;
    someone.forEach((bit) => {
      sumForSomeone += bit;
    });
    sum.push(sumForSomeone);
  });
  return sum;
};
// this is the blueprint for the algorithm function
let algorithm;
// this function generates random population
/**
 *
 * @param numberOfPopulation this is the number of population that needs to be created
 * @param candidateBits this is the number of bits that each person has
 * @returns the created population and their relative scores
 */
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
// this function uses the roulette random selection to select people
/**
 *
 * @param population the population that the selection will happen on
 * @param scores the relative score of the population
 * @returns a new population which has been selected randomly with roulette random selection
 */
const selectPopulation = (population, scores, numberOfPopulation) => {
  const selectedPopulation = [];
  const selectedScores = [];
  let maxFitness = 0;
  scores.forEach((score) => {
    maxFitness += score;
  });
  for (let counter = 0; counter < numberOfPopulation; counter++) {
    const pick = Math.floor(Math.random() * maxFitness) + 1;
    let current = 0;
    for (let i = 0; i < numberOfPopulation; i++) {
      current += scores[i];
      if (current > pick) {
        selectedPopulation.push(population[i]);
        selectedScores.push(scores[i]);
        current = 0;
        break;
      }
    }
  }
  if (selectedPopulation.length === 99) {
    selectedPopulation.push(population[5]);
  }
  return { selectedPopulation, selectedScores };
};
const crossover = (parent1, parent2, crossOverMargin) => {
  let children1 = parent1;
  let children2 = parent2;
  if (Math.random() < crossOverMargin) {
    const pos = Math.floor(Math.random() * parent1.length) + 1;
    children1 = parent1
      .slice(0, pos)
      .concat(parent2.slice(pos, parent2.length));
    children2 = parent2
      .slice(0, pos)
      .concat(parent1.slice(pos, parent1.length));
  }
  return [children1, children2];
};
const mutation = (child, mutationRate) => {
  child.forEach((bit, i) => {
    if (Math.random() < mutationRate) {
      child[i] = 1 - bit;
    }
  });
};

algorithm = ({
  population,
  numberOfPopulation,
  crossOverMargin,
  iterate,
  mutationRate,
  scores,
}) => {
  let bestScore = 0;
  let bestPerson = [];
  for (let index = 0; index < iterate; index++) {
    for (let i = 0; i < population.length; i++) {
      if (scores[i] > bestScore) {
        bestScore = scores[i];
        bestPerson = population[i];
        console.log(index, " New Best Found", bestPerson, bestScore);
      }
    }
    const { selectedPopulation } = selectPopulation(
      population,
      scores,
      numberOfPopulation
    );
    let children = [];
    // Create the next generation
    for (let counter = 0; counter < population.length; counter += 2) {
      let parent1 = selectedPopulation[counter];
      let parent2 = selectedPopulation[counter + 1];
      const kids = crossover(parent1, parent2, crossOverMargin);
      kids.forEach((kid) => {
        mutation(kid, mutationRate);
        children.push(kid);
      });
    }
    population = children;
    scores = calcScore(population);
  }
  return { bestPerson, bestScore };
};
// these are the basic setting for the application
// number of people in the population
const numberOfPopulation = 100;
// number of times it will iterate
const iterate = 100;
// number of bits in each person will get
const candidateBits = 20;
// cross over rate
const crossOverMargin = 0.9;
// mutation rate
const mutationRate = 1.0 / candidateBits;
const { population, scores } = generatePopulation(
  numberOfPopulation,
  candidateBits
);
const { bestPerson, bestScore } = algorithm({
  population,
  numberOfPopulation,
  crossOverMargin,
  iterate,
  mutationRate,
  scores,
});
console.log(
  "The best Person is :",
  bestPerson,
  " with the score of : ",
  bestScore
);
