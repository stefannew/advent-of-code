import { inputToInstructionArray, runPartOne, runPartTwo } from '../day-8';

describe('Day 8', () => {
   let instructionArray = [];

   describe('inputToInstructionArray', () => {
      const instructions = `
          nop +0
          acc +1
          jmp +4
          acc +3
          jmp -3
          acc -99
          acc +1
          jmp -4
          acc +6
      `;

      instructionArray = inputToInstructionArray(instructions);

      it('should return the list of instructions input as an array of instructions', () => {
         expect(instructionArray).toEqual([{
            operation: 'nop',
            value: 0
         }, {
            operation: 'acc',
            value: 1
         }, {
            operation: 'jmp',
            value: 4
         }, {
            operation: 'acc',
            value: 3
         }, {
            operation: 'jmp',
            value: -3
         }, {
            operation: 'acc',
            value: -99
         }, {
            operation: 'acc',
            value: 1
         }, {
            operation: 'jmp',
            value: -4
         }, {
            operation: 'acc',
            value: 6
         }]);
      });
   });

   describe('Part 1', () => {
      it('should return the accumulator before the first repeated instruction', () => {
         expect(runPartOne(instructionArray)).toEqual(5);
      });
   })

   describe.only('Part 2', () => {
      it('should return the final value of the accumulator', () => {
         expect(runPartTwo(instructionArray)).toEqual(8)
      });
   });
});
