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

const run = (instructions: Instruction[]) => {
    const visitedOperations = [];
    let currentPointer = 0;
    let accumulator = 0;

    while (currentPointer <= instructions.length) {
        const { operation, value } = instructions[currentPointer];
        visitedOperations.push(currentPointer);

        if (operation === 'jmp') {
            currentPointer += value;
        }

        if (operation === 'nop') {
            currentPointer += 1;
        }

        if (operation === 'acc') {
            accumulator += value;
            currentPointer += 1;
        }
    }

    return accumulator;
}

export const runPartOne = (instructions: Instruction[]) => {
    const visitedOperations = [];
    let currentPointer = 0;
    let accumulator = 0;

    while (!visitedOperations.includes(currentPointer)) {
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
    }

    return accumulator;
}

export const runPartTwo = (instructions: Instruction[]) => {
    return run(instructions);
}

const init = async () => {
    const input = await fetchInput(8);
    const instructions = inputToInstructionArray(input);
    console.log('Day 8 - Part 1: Accumulator before first repeated instruction', runPartOne(instructions));
    console.log('Day 8 - Part 2: Accumulator after fixing nop/jmp', runPartTwo(instructions));
}

init();
