import { getRowColumn } from '../day-5';

describe('Day 5', () => {
	describe('getRowColumn', () => {
		it('should return the row and column', () => {
			expect(getRowColumn('BFFBBFBRRL')).toEqual([77, 6]);
			expect(getRowColumn('FFFBFBBLLR')).toEqual([11, 1]);
		});
	});
});