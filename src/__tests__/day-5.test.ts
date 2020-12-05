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
			expect(findValue('BFFFBBF', ROW_RANGE)).toEqual(70);
			expect(findValue('RRR', COL_RANGE)).toEqual(7);
			expect(findValue('FFFBBBF', ROW_RANGE)).toEqual(14);
			expect(findValue('RRR', COL_RANGE)).toEqual(7);
			expect(findValue('BBFFBBF', ROW_RANGE)).toEqual(102);
			expect(findValue('RLL', COL_RANGE)).toEqual(4);
		});
	});

	describe('getSeatNumber', () => {
		it('should return the seat number for a row and column', () => {
			expect(getSeatNumber(44, 5)).toEqual(357);
			expect(getSeatNumber(70, 7)).toEqual(567);
			expect(getSeatNumber(14, 7)).toEqual(119);
			expect(getSeatNumber(102, 4)).toEqual(820);
		});
	});
});