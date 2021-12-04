import {
	createGetCommonBitAtPosition,
	findRating,
	getBits,
	getLeastCommonBitAtPosition,
	getMostCommonBitAtPosition,
	getResult
} from '../day-3';


describe('day 3', () => {
	const input = ['00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010'];
	const gamma = getBits(input, getMostCommonBitAtPosition);
	const epsilon = getBits(input, getLeastCommonBitAtPosition);

	it('should return the most common bit value for a specific position', () => {
		expect(getMostCommonBitAtPosition(input, 0)).toEqual('1');
		expect(getMostCommonBitAtPosition(input, 1)).toEqual('0');
		expect(getMostCommonBitAtPosition(input, 2)).toEqual('1');
		expect(getMostCommonBitAtPosition(input, 3)).toEqual('1');
		expect(getMostCommonBitAtPosition(input, 4)).toEqual('0');
	});

	it('should return the least common bit value for a specific position', () => {
		expect(getLeastCommonBitAtPosition(input, 0)).toEqual('0');
		expect(getLeastCommonBitAtPosition(input, 1)).toEqual('1');
		expect(getLeastCommonBitAtPosition(input, 2)).toEqual('0');
		expect(getLeastCommonBitAtPosition(input, 3)).toEqual('0');
		expect(getLeastCommonBitAtPosition(input, 4)).toEqual('1');
	});

	it('should get the "gamma" rate', () => {
		expect(gamma).toEqual('10110');
	});

	it('should get the "epsilon" rate', () => {
		expect(epsilon).toEqual('01001');
	});

	it('should get the result as decimal', () => {
		expect(getResult(gamma, epsilon)).toEqual(198);
	});

	it('should find the oxygen generator rating', () => {
		expect(findRating(input, createGetCommonBitAtPosition(Math.max, 1), 0)).toEqual('10111');
	});

	it('should find the CO2 scrubber rating', () => {
		expect(findRating(input, createGetCommonBitAtPosition(Math.min, 0), 0)).toEqual('01010');
	});
});