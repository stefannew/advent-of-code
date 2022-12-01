import { findLargestGroupSum, findTopThreeLargestGroupSums } from '../day-1';

describe('Day 1', () => {
  const list = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

  describe('part one', () => {
    it('should return the largest group of numbers with the highest sum', () => {
      const { sum } = findLargestGroupSum(list);
      expect(sum).toEqual(24000);
    });
  });

  describe('part two', () => {
    it('should return the sum of the three largest groups', () => {
      const sum = findTopThreeLargestGroupSums(list);
      expect(sum).toEqual(45000);
    });
  });


});
