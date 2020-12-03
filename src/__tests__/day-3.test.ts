import { findNumberOfTreesInPath } from '../day-3';

const input = [
	'..##.......',
	'#...#...#..',
	'.#....#..#.',
	'..#.#...#.#',
	'.#...##..#.',
	'..#.##.....',
	'.#.#.#....#',
	'.#........#',
	'#.##...#...',
	'#...##....#',
	'.#..#...#.#',
];

describe('Day 3', () => {
	describe('findPath', () => {
		it('should return the number of trees ("#") in a run', () => {
			expect(findNumberOfTreesInPath(input, 3, 1)).toEqual(7);
		});
	});
});