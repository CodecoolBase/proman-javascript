// This function is to initialize the application
function init() {
    // init data
    dataHandler.init();
    // loads the boards to the screen
    dom.loadBoards();

    const addNewCard = document.getElementById('add-new-card-button');
    addNewCard.addEventListener('click', dom.addNewCard);

    const closeButton = document.getElementById('close-card-modal');
    closeButton.addEventListener('click', dom.closeCard);

}

init();
