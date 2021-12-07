import { fetchInput, toNumberArray } from '../../utils/fetch-input';

// O(n)...
export const simulate = (fish: number[], lifespan: number, day: number = 0) => {
  if (day === lifespan) return fish.length;
  let born = [];
  const next = fish.map(f => {
    if (f === 0) {
      born.push(8);
      return 6;
    }

    return f - 1;
  });

  return simulate([...next, ...born], lifespan, day + 1);
}

const rotateArray = (arr: number[]) => {
  const first = arr.shift();
  arr.push(first);
  return arr;
}

export const count = (fish: number[], lifespan: number) => {
  let counters = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  fish.forEach(f => counters[f] += 1);

  for (let day = 0; day < lifespan; day++) {
    counters = rotateArray(counters);
    counters[6] += counters[8];
  }

  return counters.reduce((acc, curr) => {
    acc += curr;
    return acc;
  }, 0);
}

(async () => {
  const input = await fetchInput(6).then(toNumberArray);

  // O(n) - falls apart after 100 inputs
  // console.log('Number of fish after 80 days', simulate(input, 80));
  // console.log('Number of fish after 256 days', simulate(input, 256));

  console.log('Number of fish after 80 days', count(input, 80));
  console.log('Number of fish after 256 days', count(input, 256));
})();