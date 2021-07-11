import * as uuid from 'uuid';
/** Class representing a Column */
class Column {
    constructor({ id = uuid.v4(), title = 'string', order = 0 } = {}) {
        this.id = id;
        this.title = title;
        this.order = order;
    }
}
;
// module.exports = Column;
export default Column;
