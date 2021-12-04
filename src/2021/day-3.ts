import { fetchInput, invert } from '../../utils/fetch-input';

export const createGetCommonBitAtPosition = (predicate: typeof Math.min | typeof Math.max, tiebreaker: number | null) =>
	(input: string[], position: number) => {
		const counts = input.reduce((acc: Record<string, number>, curr) => {
			acc[curr[position]] += 1;
			return acc;
		}, {
			0: 0,
			1: 0
		});

		if (counts[0] === counts[1] && tiebreaker !== null) {
			return tiebreaker;
		}

		const result = predicate(counts[0], counts[1]);
		return invert(counts)[result];
	}

export const getMostCommonBitAtPosition = createGetCommonBitAtPosition(Math.max, null);
export const getLeastCommonBitAtPosition = createGetCommonBitAtPosition(Math.min, null);

export const getBits = (input: string[], fn: Function) => {
	const res = [];

	for (let i = 0; i < input[0].length; i++) {
		res.push(fn(input, i));
	}

	return res.join('');
}

export const findRating = (input: string[], predicate: Function, currentPosition = 0) => {
	if (input.length === 1) {
		return input[0];
	}

	const common = predicate(input, currentPosition);
	const filtered = input.filter(i => parseInt(i.split('')[currentPosition]) === parseInt(common));

	return findRating(filtered, predicate, currentPosition + 1);
}

export const getResult = (n: string, m: string) => parseInt(n, 2) * parseInt(m, 2);

// FIXME I don't know any bit arithmetic so this is just stupid string counting
(async () => {
	const input = await fetchInput(3).then(res => res.split('\n'));
	const gamma = getBits(input, getMostCommonBitAtPosition);
	const epsilon = getBits(input, getLeastCommonBitAtPosition);
	const oxygenGeneratorRating = findRating(input, createGetCommonBitAtPosition(Math.max, 1));
	const co2ScrubberRating = findRating(input, createGetCommonBitAtPosition(Math.min, 0));

	console.log('Power consumption of submarine:', getResult(gamma, epsilon));
	console.log('Life support rating:', getResult(oxygenGeneratorRating, co2ScrubberRating));
})();