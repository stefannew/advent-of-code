import { fetchInput } from '../../utils/fetch-input';

function expandList(start: number, end: number) {
  return [...Array(end - start + 1).keys()].map(x => x + start);
}

export function rangeEncapsulatesOther(rangeOne: number[], rangeTwo: number[]): boolean {
  const one = rangeOne.every(value => rangeTwo.includes(value));
  const two = rangeTwo.every(value => rangeOne.includes(value));

  return one || two;
}

export function rangeOverlaps(rangeOne: number[], rangeTwo: number[]): boolean {
  const one = rangeOne.some(value => rangeTwo.includes(value));
  const two = rangeTwo.some(value => rangeOne.includes(value));

  return one || two;
}

type Comparator = (rangeOne: number[], rangeTwo: number[]) => boolean;

export function findOverlaps(input: string, fn: Comparator) {
  const lines = input.trim().split('\n');
  const pairs = lines.map(line => line.split(',').map(pair => {
    const [start, end] = pair.split('-');
    return expandList(parseInt(start), parseInt(end));
  }));

  return pairs.reduce((acc, curr) => {
    const [rangeOne, rangeTwo] = curr;

    if (fn(rangeOne, rangeTwo)) {
      acc += 1;
    }

    return acc;
  }, 0);
}

(async () => {
  const input = await fetchInput(2022, 4);
  console.log('Number of fully contained pairs', findOverlaps(input, rangeEncapsulatesOther));
  console.log('Number of pairs which overlap', findOverlaps(input, rangeOverlaps));
})();