// It uses data_handler.js to visualize elements
let dom = {
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
    closeCard: function () {
        const currentCard = document.getElementById('card-container');
        const cardTitle = document.getElementById('card-title');
        cardTitle.innerHTML = "";
        currentCard.style.display = 'none';
    },
    saveNewTitle: function () {
        const currentCardTitle = document.getElementById('card-title');
        const newTitle = document.getElementById('new-title').value;

        const renameField = document.createElement("input");
        const saveButton = document.createElement("save-button");
        renameField.remove();
        saveButton.remove();

        currentCardTitle.innerHTML = newTitle;
        // adatbázisba kimentés

    },
    renameCardTitle: function () {
        const currentCardTitle = document.getElementById('card-title');
        const oldTitle = currentCardTitle.innerHTML;
        currentCardTitle.innerHTML = "";

        const renameField = document.createElement("input");
        renameField.id = "new-title";
        renameField.setAttribute("type", "text");
        renameField.setAttribute("value", oldTitle);
        currentCardTitle.appendChild(renameField);
        currentCardTitle.removeEventListener('click', dom.renameCardTitle);

        const saveTitleButton = document.createElement('i');
        saveTitleButton.id = "save-button";
        saveTitleButton.classList.add('far');
        saveTitleButton.classList.add('fa-save');
        saveTitleButton.title = "Save title";
        saveTitleButton.addEventListener('click', dom.saveNewTitle);
        currentCardTitle.appendChild(saveTitleButton);
    },
    openCurrentCard: function () {
        const currentCardTitle = event.target.childNodes[0].nodeValue;
        const cardModal = document.getElementById('card-container');
        const cardTitle = document.getElementById('card-title');
        cardTitle.innerHTML = currentCardTitle;
        cardModal.style.display = 'block';
        cardTitle.addEventListener('click', dom.renameCardTitle)
    },
    addNewCard: function () {
        const board = document.getElementById('board-one');
        const newCard = document.createElement('div');
        const newCardTitle = document.createElement('p');
        newCardTitle.innerHTML = 'New card title here';
        newCardTitle.addEventListener('click', dom.openCurrentCard);
        newCard.appendChild(newCardTitle);
        newCard.classList.add('card-design');
        board.appendChild(newCard);
    }
};
