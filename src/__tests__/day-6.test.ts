import { getNumberOfNonUniqueAnswersForGroup, getNumberOfUniqueAnswersForGroup } from '../day-6';

describe('Day 6', () => {
	describe('getNumberOfUniqueAnswersForGroup', () => {
		it('should return the number of unique answers for the group', () => {
			expect(getNumberOfUniqueAnswersForGroup(['abcx', 'abcy', 'abcz'])).toEqual(6);
			expect(getNumberOfUniqueAnswersForGroup(['abc'])).toEqual(3);
			expect(getNumberOfUniqueAnswersForGroup(['a', 'b', 'c'])).toEqual(3);
			expect(getNumberOfUniqueAnswersForGroup(['ab', 'ac'])).toEqual(3);
			expect(getNumberOfUniqueAnswersForGroup(['a', 'a', 'a', 'a'])).toEqual(1);
			expect(getNumberOfUniqueAnswersForGroup(['b'])).toEqual(1);
		});
	});

	describe('getNumberOfNonUniqueAnswersForGroup', () => {
		it('should return the number of duplicates in the group', () => {
			expect(getNumberOfNonUniqueAnswersForGroup(['abc'])).toEqual(3);
			expect(getNumberOfNonUniqueAnswersForGroup(['a', 'b', 'c'])).toEqual(0);
			expect(getNumberOfNonUniqueAnswersForGroup(['ab', 'ac'])).toEqual(1);
			expect(getNumberOfNonUniqueAnswersForGroup(['a', 'a', 'a', 'a'])).toEqual(1);
			expect(getNumberOfNonUniqueAnswersForGroup(['b'])).toEqual(1);
		});
	});
});