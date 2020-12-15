import { fetchInput } from '../utils';

const isSum = (preamble: number[], value: number) => {
	return preamble.some((item, i) => preamble.slice(i + 1).includes(value - item));
}

export const getFirstInvalid = (input: number[], preambleLength: number, currentIndex?: number) => {
	const index = currentIndex || preambleLength;
	const preamble = input.slice(index - preambleLength, index);

	return isSum(preamble, input[index]) ?
		getFirstInvalid(input, preambleLength, index + 1) :
		input[index];
}

export const findContiguous = (input: number[], value: number): number[] => {
	let currentArray = [];
	let pointer = 0;

	for (let i = 0; i < input.length; i++) {
		const sum = currentArray.reduce((acc, curr) => acc + curr, 0);

		if (sum === value) {
			return currentArray;
		}

		if (sum > value) {
			currentArray = [];
			i = pointer;
			pointer += 1;
			continue;
		}

		currentArray.push(input[i]);
	}

	return currentArray;
}

export const getEncryptionWeakness = (range: number[]) => {
	const sorted = range.sort((a, b) => a - b);
	return sorted[0] + sorted[sorted.length - 1];
};

const init = async () => {
	const input = await fetchInput(9).then(res => res.split('\n').map(x => parseInt(x)));
	const invalidNumber = getFirstInvalid(input, 25);
	console.log('Day 9 - Part 1: ', invalidNumber);
	console.log('Day 9 - Part 2:', getEncryptionWeakness(findContiguous(input, invalidNumber)));
}

init();