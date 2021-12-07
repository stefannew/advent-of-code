import { fetchInput, toNumberArray } from '../../utils/fetch-input';

export const alignmentCost = (input: number[], incrementFuel = false) => {
  const sorted = input.sort((a, b) => a - b);
  const counts = [];

  for (let i = 0; i < sorted.length; i++) {
    let count = 0;

    for (let j = 0; j < input.length; j++) {
      const distance = Math.abs(input[j] - sorted[i]);
      // Factorial but addition (triangle number?)
      count += incrementFuel ? distance * (distance + 1) / 2 : distance;
    }

    counts.push(count);
  }

  return counts.sort((a, b) => a - b)[0];
}

(async() => {
  const input = await fetchInput(7).then(toNumberArray);
  console.log('Least fuel possible', alignmentCost(input));
  console.log('Least fuel possible (incrementing fuel)', alignmentCost(input, true));
})();