import { findTopOfEachStack } from '../day-5';

describe('Day 5', () => {
  const input = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
  `;

  describe('Part 1', () => {
    it('should return the values at the top of each stack after the procedures', () => {
      expect(findTopOfEachStack(input)).toEqual('CMZ');
    });
  });

  describe('Part 2', () => {
    it('should return the values at the top of each stack after the procedures', () => {
      expect(findTopOfEachStack(input, true)).toEqual('MCD');
    });
  });
});