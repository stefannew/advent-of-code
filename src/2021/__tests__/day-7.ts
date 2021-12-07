import { alignmentCost } from '../day-7';

describe('Day 7', () => {
  it('should return the optimal alignment', () => {
    expect(alignmentCost([16, 1, 2, 0, 4, 2, 7, 1, 2, 14])).toEqual(37);
    expect(alignmentCost([16, 1, 2, 0, 4, 2, 7, 1, 2, 14], true)).toEqual(170);
  });
});