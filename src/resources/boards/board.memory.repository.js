const Board = require('./board.model');


let boardsDB =[];

const getAll = async () => boardsDB;

const create = async (data) => {
	const newBoard = new Board({title: data.title});
	newBoard.addColumn(data.columns);
	boardsDB.push(newBoard);
	console.log("Board.repo Create After ", boardsDB);
	return newBoard;
}


module.exports = { getAll, create };
