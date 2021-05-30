import * as uuid from 'uuid';

/** Class representing a Column */

class Column {
/** Create a Column
	* @param (string) id - ID of Column
	* @param (string) title - The title of the Column
	* @param (number) order - The Columns order
*/

  id: string;

  title: string;

  order: number;

  constructor({
    id = uuid.v4(),
    title = 'string',
    order = 0,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
};


// module.exports = Column;
export default Column;
