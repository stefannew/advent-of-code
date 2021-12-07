import { fetchInput } from '../../utils/fetch-input';

type Vector = {
  from: number[];
  to: number[];
}

export const getInputValues = (input: string) => {
  return input.trim().split('\n')
    .reduce((acc: Vector[], curr) => {
      const [from, to] = curr.split(' -> ');
      acc.push({ from: from.split(',').map(x => parseInt(x)), to: to.split(',').map(x => parseInt(x)) });
      return acc;
    }, [])
}

const createGrid = (input: Vector[]) => {
  const { x, y } = input.reduce((acc, curr) => {
    if (curr.from[0] > acc.x) {
      acc.x = curr.from[0];
    }

    if (curr.from[1] > acc.y) {
      acc.y = curr.from[1];
    }

    if (curr.to[0] > acc.x) {
      acc.x = curr.to[0];
    }

    if (curr.to[1] > acc.y) {
      acc.y = curr.to[1];
    }

    return acc;
  }, { x: 0, y: 0 });

  return Array.from({ length: y + 1 }, () =>
    Array.from({ length: x + 1 }, () => 0)
  );
}

export const drawLinesToGrid = (input: Vector[], considerDiagonals = false) => {
  const grid = createGrid(input);

  for (let i = 0; i < input.length; i++) {
    const { from, to } = input[i];

    let [x1, y1] = from;
    let [x2, y2] = to;

    if (considerDiagonals && (Math.abs(y2 - y1) / Math.abs(x2 - x1) === 1)) {
      let y = y1;

      if (x1 > x2) {
        for (let x = x1; x >= x2; x--) {
          grid[y][x] += 1;
          y1 > y2 ? y-- : y++;
        }
      } else {
        for (let x = x1; x <= x2; x++) {
          grid[y][x] += 1;
          y1 > y2 ? y-- : y++;
        }
      }
    }

    // horizontal
    if (x1 === x2 || y1 === y2) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
          grid[y][x] += 1;
        }
      }
    }
  }

  // console.table(grid);

  return grid;
}

export const solveGrid = (grid: number[][]) => {
  let count = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[x][y] > 1) count += 1;
    }
  }

  return count;
}

(async () => {
  const input = await fetchInput(5);

  console.log('Number of points where at least two lines overlap:', solveGrid(drawLinesToGrid(getInputValues(input))))
  console.log('Number of points where at least two lines overlap (considering diagonals):', solveGrid(drawLinesToGrid(getInputValues(input), true)));
})();