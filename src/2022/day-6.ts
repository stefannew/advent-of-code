import { fetchInput } from '../../utils/fetch-input';

function hasUniqueCharacters(str: string): boolean {
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j < str.length; j++) {
      if (str[i] === str[j]) {
        return false;
      }
    }
  }

  return true;
}

export function getPositionOfPacketMarker(buffer: string, numberOfChars: number): number {
  let chars = '';

  for (let pointer = 0; pointer < buffer.length; pointer++) {
    if (chars.length === numberOfChars) {
      if (hasUniqueCharacters(chars)) {
        return pointer;
      }

      let array = chars.split('');
      array.shift();
      chars = array.join('');
    }

    chars += buffer[pointer];
  }

  return -1;
}

(async () => {
  const input = await fetchInput(2022, 6);

  console.log('Position of start-of-packet marker', getPositionOfPacketMarker(input, 4));
  console.log('Position of start-of-message marker', getPositionOfPacketMarker(input, 14));
})();