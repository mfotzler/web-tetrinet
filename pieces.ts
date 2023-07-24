import {draw_square, COLORS, GHOST_COLORS} from 'draw_util';
import { randInt } from 'util';

export class Shape {
  coords: number[][];

  constructor(coords: number[][]) {
    this.coords = coords;
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    for (let coord of this.coords) {
      draw_square(ctx, coord[0] + x, coord[1] + y);
    }
  }
}

export class Piece {
  shapes: Shape[];
  color: number;

  constructor(shapes: Shape[], color: number) {
    this.shapes = shapes;
    this.color = color;
  }

  private _draw(ctx: CanvasRenderingContext2D, x: number, y: number, orientation: number, colorString: string) {
    const shape = this.shapes[orientation % this.shapes.length];
    ctx.fillStyle = colorString;
    shape.draw(ctx, x, y);
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number, orientation: number) {
    this._draw(ctx, x, y, orientation, COLORS[this.color]);
  }

  drawGhost(ctx: CanvasRenderingContext2D, x: number, y: number, orientation: number) {
    this._draw(ctx, x, y, orientation, GHOST_COLORS[this.color]);
  }

  randomOrientation = () => {
    return randInt(this.shapes.length);
  }
}

// https://tetris.wiki/TetriNet_Rotation_System
export const PIECES = [
  // I
  new Piece([
    new Shape([[-2, 0], [-1, 0], [0, 0], [1, 0]]),
    new Shape([[0, 0], [0, 1], [0, 2], [0, 3]]),
  ], 1),
  // O
  new Piece([
    new Shape([[0, 0], [0, 1], [1, 0], [1, 1]]),
  ], 2),
  // J
  new Piece([
    new Shape([[-1, 0], [-1, 1], [0, 1], [1, 1]]),
    new Shape([[-1, 0], [0, 0], [-1, 1], [-1, 2]]),
    new Shape([[-1, 0], [0, 0], [1, 0], [1, 1]]),
    new Shape([[0, 0], [0, 1], [0, 2], [-1, 2]])
  ], 3),
  // L
  new Piece([
    new Shape([[1, 0], [-1, 1], [0, 1], [1, 1]]),
    new Shape([[-1, 0], [0, 2], [-1, 1], [-1, 2]]),
    new Shape([[-1, 0], [0, 0], [1, 0], [-1, 1]]),
    new Shape([[-1, 0], [0, 0], [0, 1], [0, 2]])
  ], 4),
  // Z
  new Piece([
    new Shape([[-1, 0], [0, 0], [0, 1], [1, 1]]),
    new Shape([[0, 0], [-1, 1], [0, 1], [-1, 2]])
  ], 5),
  // S
  new Piece([
    new Shape([[0, 0], [1, 0], [-1, 1], [0, 1]]),
    new Shape([[-1, 0], [-1, 1], [0, 1], [0, 2]]),
  ], 1),
  // T
  new Piece([
    new Shape([[-1, 1], [0, 0], [0, 1], [1, 1]]),
    new Shape([[-1, 0], [-1, 1], [-1, 2], [0, 1]]),
    new Shape([[-1, 0], [0, 0], [1, 0], [0, 1]]),
    new Shape([[0, 0], [0, 1], [0, 2], [-1, 1]])
  ], 2)
];

export function randomPiece(piecesFreq: number[]): Piece {
  return PIECES[piecesFreq[randInt(100)]];
}

// for debugging
export function cyclePiece(p: Piece): Piece {
  let i = (PIECES.indexOf(p)+1)%PIECES.length;
  return PIECES[i];
}
