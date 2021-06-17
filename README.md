# genetic-algorithm-typescript-javascript
This is my genetic algorithm with javascript/typescript with full documentation.

## How to run
To run first you need to use `yarn install` to install all the dependencies. Then use `yarn start` to start the app with `nodemon` or just run the `index.js` in `public` folder yourself.

You don't need `yarn` to run the algorithm but if you want to install it you can do it here: [yarn download page](https://classic.yarnpkg.com/en/docs/install/#windows-stable), If you are on windows I suggest that you use the alternative method and install using the `.mis` installer.

## Changing the configuration
You can also edit the configuration with editing the values of either the `index.ts` in `src` folder or `index.js` in the `public` folder. But note if you edit the values in `index.ts` you will have to compile them with typescript compiler. `yarn install` will also install typescript locally so you can use `yarn tsc -w` to watch for changes in `index.ts` and compile them to `index.js`.

Also note that you will have to always run the `index.js` because the browsers or node don't understand typescript.

These values are:
1. `numberOfPopulation`: This is the number of people in the test (candidates)
2. `iterate`: This is the number of generatios that will be generated
3. `candidateBits`: This is the number of bits that each candidate will have
4. `crossOverMargin`: This is the cross over rate which is advised to be very high, around 0.8 or 0.9
5. `mutationRate`: this is dependant on the `candidateBits`

The rest is done by the algorithm.

The selection process is also [roulette wheel selection](https://en.wikipedia.org/wiki/Fitness_proportionate_selection).


## Bugs
I had some trouble with consistant runs, sometimes the population would decrease but I have fixed it and since then I had no trouble with the algorithm.
