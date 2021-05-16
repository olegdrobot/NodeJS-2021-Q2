const { v4: uuidv4 } = require('uuid');

const Column = require('../columns/column.model');

class Board {
  constructor({
    id = uuidv4(),
    title = 'String',
    columns = []
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  addColumn(arr){
    for(let i=0; i<arr.length; i+=1){
      this.columns.push(new Column(arr[i]));  
    }
    
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  } 
};

module.exports = Board;
