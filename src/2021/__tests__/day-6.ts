import { count } from '../day-6';

describe('Day 6', () => {
  it('should return the number of lanternfish after n days', () => {
    expect(count([3, 4, 3, 1, 2], 18)).toEqual(26);
    expect(count([3, 4, 3, 1, 2], 80)).toEqual(5934);
    expect(count([3, 4, 3, 1, 2], 256)).toEqual(26984457539);
  });
})