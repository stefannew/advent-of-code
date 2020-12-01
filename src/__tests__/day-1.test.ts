import { findThreeValuesInArrayThatEqual, findTwoValuesInArrayThatEqual } from '../day-1';

describe('Day One', () => {
	describe('findTwoValuesInArrayThatEqual', () => {
		it('should return the two values which equal the specified value', () => {
			const values = [1721, 979, 366, 299, 675, 1456];
			expect(findTwoValuesInArrayThatEqual(2020, values)).toEqual([1721, 299]);
		});
	});

	describe('findThreeValuesInArrayThatEqual', () => {
		it('should return the three values which equal the specified value', () => {
			const values = [1721, 979, 366, 299, 675, 1456];
			expect(findThreeValuesInArrayThatEqual(2020, values)).toEqual([979, 366, 675]);
		});
	});
});