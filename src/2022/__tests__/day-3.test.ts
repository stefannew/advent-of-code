import { prioritySum, prioritySumForBadgeType } from '../day-3'

const input = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

describe('Day 3', () => {
  it('should return the sum of the priorities for each rucksack', () => {
    expect(prioritySum(input)).toEqual(157);
  });

  it('should return the sum of the priorities for each group', () => {
    expect(prioritySumForBadgeType(input)).toEqual(70);
  });
});
