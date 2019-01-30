// This function is to initialize the application
import {dataHandler} from "./data_handler.js";
import {dom} from "./dom.js";

function init() {
    // init data
    dataHandler.init();
    // loads the boards to the screen
    dom.loadBoards();

    const closeButton = document.getElementById('close-card-modal');
    closeButton.addEventListener('click', dom.closeCard);

    dom.assignNewBoardEventListeners();
}

init();
