import { COL_RANGE, findValue, getSeatNumber, ROW_RANGE, takeHalf } from '../day-5';

describe('Day 5', () => {
	describe('takeHalf', () => {
		it('should return half of the array', () => {
			const input = [1, 2, 3, 4];
			expect(takeHalf(input, 'F')).toEqual([1, 2]);
			expect(takeHalf(input, 'B')).toEqual([3, 4]);
			expect(takeHalf(input, 'L')).toEqual([1, 2]);
			expect(takeHalf(input, 'R')).toEqual([3, 4]);
		});
	});

	describe('findValue', () => {
		it('should return the value from an array of "instructions"', () => {
			expect(findValue('FBFBBFF', ROW_RANGE)).toEqual(44);
			expect(findValue('RLR', COL_RANGE)).toEqual(5);
		});
	});

	describe('getSeatNumber', () => {
		it('should return the seat number for a boarding pass', () => {
			expect(getSeatNumber('FBFBBFFRLR')).toEqual(357);
			expect(getSeatNumber('BFFFBBFRRR')).toEqual(567);
			expect(getSeatNumber('FFFBBBFRRR')).toEqual(119);
			expect(getSeatNumber('BBFFBBFRLL')).toEqual(820);
		});
	});
});