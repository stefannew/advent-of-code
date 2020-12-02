import { isValidPasswordPartOne, isValidPasswordPartTwo } from '../day-2';

describe('Day 2', () => {
	describe('isValidPasswordPartOne', () => {
		it('should return true or false if the password is or is not valid', () => {
			expect(isValidPasswordPartOne('1-3 a: abcde')).toEqual(true);
			expect(isValidPasswordPartOne('1-3 b: cdefg')).toEqual(false);
			expect(isValidPasswordPartOne('2-9 c: ccccccccc')).toEqual(true);
		});
	});

	describe('isValidPasswordPartTwo', () => {
		it('should return true or false if the password is or is not valid', () => {
			expect(isValidPasswordPartTwo('1-3 a: abcde')).toEqual(true);
			expect(isValidPasswordPartTwo('1-3 b: cdefg')).toEqual(false);
			expect(isValidPasswordPartTwo('2-9 c: ccccccccc')).toEqual(false);
		});
	});
});