import * as uuid from 'uuid';
import Column from '../columns/column.model';



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
  columns: any[];
  
  constructor({
    id = uuid.v4(),
    title = 'String',
    columns = []
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Add new column in the Board
   * @param (array) arr - Array of columns objects
  */

  addColumn(arr: any[]){
    for(let i=0; i<arr.length; i+=1){
      this.columns.push(new Column(arr[i]));  
    }
    
  }

  /**
    * Return Boadrs object
    * @param (class) board - Class Boards instance   
    * @return (object) 
  */

  static toResponse(board: any) {
    const { id, title, columns } = board;
    return { id, title, columns };
  } 
};

//module.exports = Board;
export default Board;