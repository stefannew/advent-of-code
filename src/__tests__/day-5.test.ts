import { getSeatNumber } from '../day-5';

describe('Day 5', () => {
	describe('getSeatNumber', () => {
		it('should return the seat number for a row and column', () => {
			expect(getSeatNumber(44, 5)).toEqual(357);
			expect(getSeatNumber(70, 7)).toEqual(567);
			expect(getSeatNumber(14, 7)).toEqual(119);
			expect(getSeatNumber(102, 4)).toEqual(820);
		});
	});
});