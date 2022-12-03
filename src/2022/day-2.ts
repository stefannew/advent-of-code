import { fetchInput } from '../../utils/fetch-input';

enum Opponent {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C'
}

enum Player {
  Rock = 'X',
  Paper = 'Y',
  Scissors = 'Z'
}

enum DesiredOutcome {
  Lose = 'X',
  Draw = 'Y',
  Win = 'Z'
}

const choiceScore = {
  [Player.Rock]: 1,
  [Player.Paper]: 2,
  [Player.Scissors]: 3
};

const WIN_SCORE = {
  [Opponent.Rock]: {
    [Player.Rock]: 3,
    [Player.Paper]: 6,
    [Player.Scissors]: 0
  },
  [Opponent.Paper]: {
    [Player.Rock]: 0,
    [Player.Paper]: 3,
    [Player.Scissors]: 6
  },
  [Opponent.Scissors]: {
    [Player.Rock]: 6,
    [Player.Paper]: 0,
    [Player.Scissors]: 3
  }
}

const OUTCOMES = {
  [DesiredOutcome.Lose]: {
    [Opponent.Rock]: Player.Scissors,
    [Opponent.Paper]: Player.Rock,
    [Opponent.Scissors]: Player.Paper
  },
  [DesiredOutcome.Draw]: {
    [Opponent.Rock]: Player.Rock,
    [Opponent.Paper]: Player.Paper,
    [Opponent.Scissors]: Player.Scissors
  },
  [DesiredOutcome.Win]: {
    [Opponent.Rock]: Player.Paper,
    [Opponent.Paper]: Player.Scissors,
    [Opponent.Scissors]: Player.Rock
  }
}

export function getTotalScore(input: string) {
  const rounds = input.trim().split('\n');
  return rounds.reduce((acc, round) => {
    const [opponent, player] = round.split(' ');

    return acc + (WIN_SCORE[opponent][player] + choiceScore[player]);
  }, 0);
}

export function getTotalScoreForSecondColumn(input: string) {
  const rounds = input.trim().split('\n');
  const day2input = rounds.reduce((acc, round) => {
    const [opponent, outcome] = round.split(' ');
    const result = OUTCOMES[outcome][opponent];

    return acc.concat(`${opponent} ${result}\n`);
  }, '');

  return getTotalScore(day2input);
}

(async () => {
  const input = await fetchInput(2022, 2);
  console.log('Total score of strategy guide', getTotalScore(input))
  console.log('Total score of strategy guide for second column outcome', getTotalScoreForSecondColumn(input));
})();
