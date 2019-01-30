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
        const saveButton = document.getElementById("save-button");
        if (saveButton != null) {
            saveButton.remove();
        }
        cardTitle.innerHTML = "";
        currentCard.style.display = 'none';
    },
    saveNewTitle: function () {
        const currentCardTitle = document.getElementById('card-title');
        const newTitle = document.getElementById('new-title').value;
        const renameField = document.getElementById("new-title");
        const saveButton = document.getElementById("save-button");
        dom.restoreCardModal(currentCardTitle, renameField, newTitle, saveButton)

    },
    restoreCardModal: function (currentCardTitle, renameField, newTitle, saveButton) {
        currentCardTitle.innerHTML = newTitle;
        currentCardTitle.dataset.oldtitle = newTitle;
        renameField.remove();
        saveButton.remove();

        // adatbázisba kimentés, restoreWhenEscIsPressed-nél is enterre!!
        currentCardTitle.addEventListener('click', dom.renameCardTitle);
    },
    addRenameInputField: function (currentCardTitle, oldTitle) {
        const renameInputField = document.createElement("input");
        renameInputField.id = "new-title";
        renameInputField.setAttribute("type", "text");
        renameInputField.setAttribute("value", oldTitle);
        currentCardTitle.appendChild(renameInputField);
        currentCardTitle.removeEventListener('click', dom.renameCardTitle);
        renameInputField.focus();
    },
    addNewTitleSaveButton: function (currentCardContainer) {
        const saveTitleButton = document.createElement('i');
        saveTitleButton.id = "save-button";
        saveTitleButton.classList.add('far');
        saveTitleButton.classList.add('fa-save');
        saveTitleButton.title = "Save title";
        saveTitleButton.addEventListener('click', dom.saveNewTitle);
        currentCardContainer.appendChild(saveTitleButton);
    },
    renameCardTitle: function () {
        const currentCardTitle = document.getElementById('card-title');
        const currentCardContainer = document.getElementById('card-data-container');
        const oldTitle = currentCardTitle.innerHTML;
        currentCardTitle.dataset.oldtitle = oldTitle;
        currentCardTitle.innerHTML = "";

        dom.addRenameInputField(currentCardTitle, oldTitle);
        dom.addNewTitleSaveButton(currentCardContainer);
    },
    openCurrentCard: function () {
        const currentCardTitle = event.target.childNodes[0].nodeValue;
        const cardModal = document.getElementById('card-container');
        const cardTitle = document.getElementById('card-title');
        cardTitle.innerHTML = currentCardTitle;
        cardModal.style.display = 'block';
        cardTitle.addEventListener('click', dom.renameCardTitle);
        addEventListener('keydown', dom.actionWhenButtonIsPressed);
        cardModal.addEventListener('click', dom.cardModalClickEventHandlers);
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
    },
    actionWhenButtonIsPressed: function (event) {
        const currentCardTitle = document.getElementById('card-title');
        const oldTitle = currentCardTitle.dataset.oldtitle;
        const saveButton = document.getElementById('save-button');
        const renameField = document.getElementById('new-title');
        if (event.keyCode === 27 && saveButton != null) {
            dom.restoreCardModal(currentCardTitle, renameField, oldTitle, saveButton);
        } else if (event.keyCode === 13 && saveButton != null) {
            dom.saveNewTitle();
        }
    },
    cardModalClickEventHandlers: function (event) {
        const currentCardTitle = document.querySelector('#card-title');
        const oldTitle = currentCardTitle.dataset.oldtitle;
        const saveButton = document.getElementById('save-button');
        const renameField = document.getElementById('new-title');

        if (event.target != currentCardTitle && saveButton != null) {
            dom.restoreCardModal(currentCardTitle, renameField, oldTitle, saveButton);
        }
    }
};
