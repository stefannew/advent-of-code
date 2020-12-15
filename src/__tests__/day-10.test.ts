import { findDifferences, getChain, getMaximumJoltageRating } from '../day-10';

const input = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];
const sorted = [0, 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19, 22];
const inputTwo = [28, 33, 18, 42, 31, 14, 46, 20, 48, 47, 24, 23, 49, 45, 19, 38, 39, 11, 1, 32, 25, 35, 8, 17, 7, 9, 4, 2, 34, 10, 3];

describe('Day 10', () => {
	describe('getMaximumJoltageRating', () => {
		it('should return the maximum joltage rating', () => {
			expect(getMaximumJoltageRating(input)).toEqual(22);
		});
	});

	describe('getChain', () => {
		it('should return the valid adapter chain in order', () => {
			expect(getChain(input)).toEqual(sorted);
		});
	});

	describe('findDifferences', () => {
		it('should return the number of differences between each adapter in the chain', () => {
			expect(findDifferences(sorted)).toEqual({
				1: 7,
				2: 0,
				3: 5
			});

			const chain = getChain(inputTwo);
			expect(findDifferences(chain)).toEqual({
				1: 22,
				2: 0,
				3: 10
			})
		});
	});
});