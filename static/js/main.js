// This function is to initialize the application
function init() {
    // init data
    dataHandler.init();
    // loads the boards to the screen
    dom.loadBoards();

    const closeButton = document.getElementById('close-card-modal');
    closeButton.addEventListener('click', dom.closeCard);

}

init();
