import { fetchInput } from '../../utils/fetch-input';

function chunkArray<T>(array: Array<T>, chunkSize: number): Array<Array<T>> {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }

  return chunks;
}

function getItemValue(item: string) {
  if (item.toUpperCase() === item) {
    return item.charCodeAt(0) - 38;
  }

  return item.charCodeAt(0) - 96;
}

function findDuplicates(compartmentOne: string, compartmentTwo: string) {
  const map = new Map<string, number>();

  compartmentOne.split('').forEach(item => {
    if (compartmentTwo.includes(item)) {
      map.set(item, 2);
    }
  });

  return map;
}

function findCommon(strings: string[]) {
  const all = strings.join('');
  let found = '';

  for (let i = 0; i < all.length; i++) {
    const item = all[i];

    if (strings.every(str => str.includes(item))) {
      found = item;
    }
  }

  return found;
}

export function prioritySum(input: string) {
  const rucksacks = input.trim().split('\n');

  return rucksacks.reduce((acc, rucksack) => {
    const length = rucksack.length;
    const [compartmentOne, compartmentTwo] = [rucksack.substr(0, length / 2), rucksack.substr(length / 2)];
    const duplicates = findDuplicates(compartmentOne, compartmentTwo);

    duplicates.forEach((_value, key) => {
      acc += getItemValue(key);
    });

    return acc;
  }, 0);
}

export function prioritySumForBadgeType(input: string) {
  const rucksacks = input.trim().split('\n');
  const groups = chunkArray(rucksacks, 3);

  return groups.reduce((acc, group) => {
    const common = findCommon(group);
    acc += getItemValue(common);
    return acc;
  }, 0);
}

(async () => {
  const input = await fetchInput(2022, 3);
  console.log('Priority sum of duplicate items', prioritySum(input));
  console.log('Priority sum for badge type', prioritySumForBadgeType(input));
})();
