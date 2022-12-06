import { getPositionOfPacketMarker } from '../day-6';

describe('Day 6', () => {
  const bufferOne = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';
  const bufferTwo = 'bvwbjplbgvbhsrlpgdmjqwftvncz';
  const bufferThree = 'nppdvjthqldpwncqszvftbrmjlhg';
  const bufferFour = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg';
  const bufferFive = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw';

  describe('Part 1', () => {
    it('should return the character after the first start-of-packet marker', () => {
      expect(getPositionOfPacketMarker(bufferOne, 4)).toEqual(7);
      expect(getPositionOfPacketMarker(bufferTwo, 4)).toEqual(5);
      expect(getPositionOfPacketMarker(bufferThree, 4)).toEqual(6);
      expect(getPositionOfPacketMarker(bufferFour, 4)).toEqual(10);
      expect(getPositionOfPacketMarker(bufferFive, 4)).toEqual(11);
    });
  });

  describe('Part 2', () => {
    it('should return the character after the first start-of-message marker', () => {
      expect(getPositionOfPacketMarker(bufferOne, 14)).toEqual(19);
      expect(getPositionOfPacketMarker(bufferTwo, 14)).toEqual(23);
      expect(getPositionOfPacketMarker(bufferThree, 14)).toEqual(23);
      expect(getPositionOfPacketMarker(bufferFour, 14)).toEqual(29);
      expect(getPositionOfPacketMarker(bufferFive, 14)).toEqual(26);
    });
  });
});