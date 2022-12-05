import { fetchInput } from '../../utils/fetch-input';

function createStacks(input: string): Map<number, Array<string>> {
  const stacks = new Map<number, Array<string>>();
  const height = input.match(/\n/g).length;
  const width = input.indexOf('\n') + 1;

  for (let pointer = input.length; pointer > 0; pointer--) {
    const value = input[pointer];
    if (/\d/g.test(value)) {
      const stack = [];
      const stackNumber = parseInt(value);

      for (let i = 1; i <= height; i++) {
        const next = pointer - (width * i);
        stack.push(input[next]);
      }

      stacks.set(stackNumber, stack.filter(x => x !== ' '));
    }
  }

  return new Map(Array.from(stacks).reverse()); // insertion order is backwards because we're iterating backward
}

type Instruction = {
  amount: number;
  from: number;
  to: number;
}

function createInstruction(input: string): Instruction {
  const instructionString = input.split(' ');
  return {
    amount: parseInt(instructionString[1]),
    from: parseInt(instructionString[3]),
    to: parseInt(instructionString[5])
  }
}

function runInstructions(stacks: Map<number, Array<string>>, instructions: Instruction[], partTwo = false) {
  const copy = stacks;

  instructions.forEach(instruction => {
    const source = copy.get(instruction.from);
    const target = copy.get(instruction.to);

    if (partTwo) {
      let crates = [];
      for (let i = 0; i < instruction.amount; i++) {
        crates.push(source.pop());
      }
      crates.reverse();
      target.push(...crates);
    } else {
      for (let i = 0; i < instruction.amount; i++) {
        const crate = source.pop();
        target.push(crate);
      }
    }

    copy.set(instruction.from, source);
    copy.set(instruction.to, target);
  });

  return copy;
}

export function findTopOfEachStack(input: string, partTwo = false) {
  const [stackDefinition, instructions] = input.split('\n\n');
  const stacks = createStacks(stackDefinition.replace(/^(?:[\t ]*(?:\r?\n|\r))+/g, ''));
  const parsedInstructions = instructions.trim().split('\n').map(createInstruction);
  const reorderedStacks = runInstructions(stacks, parsedInstructions, partTwo);
  return Array.from(reorderedStacks.values()).map(x => x.pop()).join('');
}

(async () => {
  const input = await fetchInput(2022, 5);
  console.log('The top crate on each stack after instructions', findTopOfEachStack(input));
  console.log('The top create on each stack after instructions (CrateMover 9001)', findTopOfEachStack(input, true))
})();