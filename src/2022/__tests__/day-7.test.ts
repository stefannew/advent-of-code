import { getSizeSmallestDeletableDirectory, getSumDirectories } from '../day-7';

describe('Day 7', () => {
  const input = `
  $ cd /
  $ ls
  dir a
  14848514 b.txt
  8504156 c.dat
  dir d
  $ cd a
  $ ls
  dir e
  29116 f
  2557 g
  62596 h.lst
  $ cd e
  $ ls
  584 i
  $ cd ..
  $ cd ..
  $ cd d
  $ ls
  4060174 j
  8033020 d.log
  5626152 d.ext
  7214296 k
  `;

  describe('Part 1', () => {
    it('returns the sum of all directories with at most size of 100000', () => {
      expect(getSumDirectories(input, 100000)).toEqual(95437);
    });
  });

  describe('Part 2', () => {
    it('returns the size of the smallest deletable directory to free up 30000000', () => {
      expect(getSizeSmallestDeletableDirectory(input)).toEqual(24933642);
    });
  });
});