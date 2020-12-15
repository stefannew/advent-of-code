import { fetchInput } from '../utils';

export const getMaximumJoltageRating = (adapters: number[]) => {
	const sorted = adapters.sort((a, b) => a - b);
	return sorted[adapters.length - 1] + 3;
}

export const findDifferences = (adapters: number[]) => {
	const map = {
		1: 0,
		2: 0,
		3: 0
	}

	for (let i = 0; i < adapters.length - 1; i++) {
		const difference = adapters[i + 1] - adapters[i];
		map[difference] += 1;
	}

	return map;
}

export const getChain = (adapters: number[]) => {
	const sorted = adapters.sort((a, b) => a - b);
	const result: number[] = [0];
	let current = 0;

	for (let i = 0; i < sorted.length; i++) {
		const difference = sorted[i] - current;
		if (difference === 1 || difference === 2 || difference === 3) {
			current = sorted[i];
			result.push(sorted[i]);
		}
	}

	return [...result, getMaximumJoltageRating(adapters)];
}

const init = async () => {
	const input = await fetchInput(10).then(res => res.split('\n').filter(Boolean).map(x => parseInt(x)));
	const chain = getChain(input);
	const differences = findDifferences(chain);

	console.log('Day 10 - Part One:', differences[1] * differences[3]);
}

init();