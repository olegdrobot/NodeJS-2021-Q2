const { v4: uuidv4 } = require('uuid');

class Column {
  constructor({
    id = uuidv4(),
    title = 'string',
    order = 0
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
};

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
    for(let i=0; i<arr.length; i++){
      this.columns.push(new Column(arr[i]));  
    }
    
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  } 
};

module.exports = Board;
