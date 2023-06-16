import { Player } from "./Player";

export class Game {
  constructor(
    public board: string[],
    public currentPlayer: string,
    public gameOver: boolean,
    public players: Player[],
    public hasWinner: boolean
  ) {}
}
