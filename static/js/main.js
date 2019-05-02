import { dom } from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();
    // add event listener on 'add new board' button
    dom.addNewBoardEventListener()

}

init();
