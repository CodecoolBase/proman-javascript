// This function is to initialize the application
import {dataHandler} from "./data_handler.js";

function init() {
    // init data
    dataHandler.init();
    // loads the boards to the screen
    dom.loadBoards();
    let newBoard = document.getElementById('new-board-button');
    newBoard.addEventListener('click', dataHandler.createNewBoard);
}

init();
