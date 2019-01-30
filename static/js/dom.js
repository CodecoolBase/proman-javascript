// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    loadBoards: function () {
        // retrieves boards and makes showBoards called
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    checkEmptyTitle: function(title, errorId){
        const errorElement = document.getElementById(errorId);
        if (title.trim() == ""){
            errorElement.innerHTML = "Please input a title.";
            return false;
        }

        return true;
    },
    assignNewBoardEventListeners: function(){
        const newBoardModalOpen = document.getElementById('open-new-board');
        newBoardModalOpen.addEventListener('click', dom.openNewBoardModal);

        const newBoardModalClose = document.getElementById('new-board-close');
        newBoardModalClose.addEventListener('click', dom.closeNewBoardModal);

        const newBoard = document.getElementById('new-board-save');
        newBoard.addEventListener('click', dataHandler.createNewBoard);

    },
    openNewBoardModal: function(){
        const modal = document.getElementById('new-board-modal');

        modal.style.display = 'block';
    },
    closeNewBoardModal: function(){
        const modal = document.getElementById('new-board-modal');
        modal.style.display = 'none';
    }
    // here comes more features
};
