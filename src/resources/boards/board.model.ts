import * as uuid from 'uuid';
import Column from '../columns/column.model';

interface IBoard {
  id: string;
  title: string;
  columns: object[];
}

/** Class representing a Board */

class Board {
  /**
   * Create a Board
   * @param (string) id - ID of Board
   * @param (string) title - The title of the Board
   * @param (array) columns - The Boards columns
  */

  id: string;

  title: string;

  columns: object[];

  constructor({
    id = uuid.v4(),
    title = 'String',
    columns = [],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Add new column in the Board
   * @param (array) arr - Array of columns objects
  */

  addColumn(arr: object[]) {
    for (let i=0; i<arr.length; i+=1) {
      this.columns.push(new Column(arr[i]));
    }
  }

  /**
    * Return Boadrs object
    * @param (class) board - Class Boards instance
    * @return (object)
  */

  static toResponse(board: Partial<IBoard>) {
    const { id, title, columns } = board;
    /*
    let obj = {
      id: String(board['id']),
      title: String(board.title),
      columns: board.columns
    }
    */
    return { id, title, columns };
  }
};

export default Board;
