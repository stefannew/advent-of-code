import { findOverlaps, rangeEncapsulatesOther, rangeOverlaps } from '../day-4';

describe('Day 4', () => {
  const input = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
  `;

  describe('Part 1', () => {
    it('should return the number of pairs which fully contain the other', () => {
      expect(findOverlaps(input, rangeEncapsulatesOther)).toEqual(2);
    });
  });

  describe('Part 2', () => {
    it('should return the number of pairs which overlap at all', () => {
      expect(findOverlaps(input, rangeOverlaps)).toEqual(4);
    });
  });
});