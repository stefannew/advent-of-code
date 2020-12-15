import { findContiguous, getEncryptionWeakness, getFirstInvalid } from '../day-9';

const input = [35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576];

describe('Day 9', () => {
	describe('getFirstInvalid', () => {
		it('should return the first invalid number', () => {
			expect(getFirstInvalid(input, 5)).toEqual(127);
		});
	});

	describe('findContiguous', () => {
		it('should return the first range of values which, summed, equal the specified value', () => {
			expect(findContiguous(input, 127)).toEqual([15, 25, 47, 40]);
		});
	});

	describe('getEncryptionWeakness', () => {
		it('should return the sum of the smallest number and the largest number', () => {
			expect(getEncryptionWeakness([15, 25, 47, 40])).toEqual(62);
		});
	});
});