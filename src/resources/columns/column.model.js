const { v4: uuidv4 } = require('uuid');

/** Class representing a Column */

class Column {

/** Create a Column
	* @param (string) id - ID of Column
	* @param (string) title - The title of the Column
	* @param (number) order - The Columns order
*/	
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


module.exports = Column;
