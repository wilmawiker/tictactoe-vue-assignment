import { Player } from "./Player";

export interface IGame {
  players: Player[];
  gameBoard: string[];
  currentPlayer: Player;
  winner: string;
  gameIsActive: boolean;
}
