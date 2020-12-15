import { fetchInput } from '../utils';

type Operation = 'acc' | 'jmp' | 'nop';

type Instruction = {
    operation: Operation;
    value: number;
}

export const inputToInstructionArray = (input: string): Instruction[] =>
    input.split('\n').filter(Boolean).map(line => {
        const [operation, value] = line.trim().split(' ');
        return {
            operation: operation as Operation,
            value: parseInt(value)
        }
    // @ts-ignore
    }).filter(x => x.operation !== '');

const createPossibleInstructionArrays = (instructions: Instruction[]) => {
    const instructionsArray: Array<Instruction[]> = [];

    instructions.forEach((instruction, index) => {
       const copy = [...instructions];

       if (instruction.operation === 'nop') {
           copy[index] = {
               ...instruction,
               operation: 'jmp'
           }
       }

       if (instruction.operation === 'jmp') {
           copy[index] = {
               ...instruction,
               operation: 'nop'
           }
       }

       instructionsArray.push(copy);
    });

    return instructionsArray;
}

export const run = (instructions: Instruction[], returnAccOnFail = false) => {
    const visitedOperations = [];
    let currentPointer = 0;
    let accumulator = 0;

    while (!visitedOperations.includes(currentPointer)) {
        try {
            const instruction = instructions[currentPointer];

            visitedOperations.push(currentPointer);

            if (instruction.operation === 'acc') {
                accumulator += instruction.value;
                currentPointer += 1;
            }

            if (instruction.operation === 'jmp') {
                currentPointer += instruction.value;
            }

            if (instruction.operation === 'nop') {
                currentPointer += 1;
            }
        } catch (error) {
            return accumulator;
        }

    }

    return returnAccOnFail ? accumulator : -1;
}

export const runPartTwo = (instructions: Instruction[]) => {
    const arrays = createPossibleInstructionArrays(instructions);
    const results = arrays.map(x => run(x));
    return results.filter(x => x !== -1)[0];
}

const init = async () => {
    const input = await fetchInput(8);
    const instructions = inputToInstructionArray(input);
    // console.log('Day 8 - Part 1: Accumulator before first repeated instruction', run(instructions));
    console.log('Day 8 - Part 2: Accumulator after fixing nop/jmp', runPartTwo(instructions));
}

init();
