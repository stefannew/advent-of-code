import { getTotalScore, getTotalScoreForSecondColumn } from '../day-2';

const input = `
A Y
B X
C Z
`;

describe('Day 2', () => {
  it('Part One: should return the total score', () => {
    expect(getTotalScore(input)).toEqual(15);
  });

  it('Part Two: should return the total score for second column', () => {
    expect(getTotalScoreForSecondColumn(input)).toEqual(12);
  });
});
