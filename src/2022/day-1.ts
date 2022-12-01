import { fetchInput } from '../../utils/fetch-input';

const sumFn = (x: number, y: number) => x + y;
const sumGroup = (group: string) => group.split('\n').map(x => parseInt(x)).reduce(sumFn);

export function findLargestGroupSum(list: string) {
  const groups = list.trim().split('\n\n')
  return groups.reduce((acc, curr, index) => {
    const sum = sumGroup(curr);

    if (acc.sum > sum) {
      return acc;
    }

    return {
      index,
      sum
    }
  }, { index: 0, sum: 0 });
}

export function findTopThreeLargestGroupSums(list: string) {
  const groups = list.trim().split('\n\n');
  const groupSums = groups.map(sumGroup);
  const sorted = groupSums.sort((a, b) => b - a);
  return sorted[0] + sorted[1] + sorted[2];
}

(async () => {
  const input = await fetchInput(2022, 1);

  console.log('Largest sum', findLargestGroupSum(input));
  console.log('Sum of three largest groups', findTopThreeLargestGroupSums(input));
})();
