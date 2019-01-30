// It uses data_handler.js to visualize elements
let dom = {
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        fetch('/get-boards')
            .then((response) => response.json())
            .then((response) => this.showBoards(response))
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        for (const board of boards) {
            const boardToAdd = this.createBoardElement(board.title, board.id);
            document.querySelector('#boards').appendChild(boardToAdd);

            this.loadCards(board.id);
            const addNewCardToBoardButton = document.querySelectorAll('.new-card-button')[(board.id - 1)];
            addNewCardToBoardButton.dataset.boardId = board.id;
            addNewCardToBoardButton.addEventListener('click', this.addNewCard);
        }
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        fetch('/get-cards/' + boardId)
            .then((response) => response.json())
            .then((response) => this.showCards(response, boardId))
    },
    showCards: function (cards, boardId) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let board = document.querySelector(`.board[data-id="${boardId}"]`);
        let allColumns = board.querySelectorAll('td');

        for (const card of cards) {
            for (const column of allColumns) {
                if (card.status == column.dataset.status) {
                    const cardToAdd = this.createCardElement(card.title);
                    column.appendChild(cardToAdd);
                    cardToAdd.dataset.cardId = card.id;
                    cardToAdd.addEventListener('click', dom.openCurrentCard);
                }
            }
        }
    },
    // here comes more features
    createBoardElement: function (boardTitle, boardID) {
        let board = document.createElement('div');
        board.classList.add('board');
        board.dataset.id = boardID;
        board.innerHTML = `
                <div class="board-header">
                    <h2>${boardTitle}<button class="new-card-button">+ New Card</button></h2>
                </div>
                <table class="board-body">
                    <tr>
                        <th>New</th>
                        <th class="darker">In progress</th>
                        <th>Testing</th>
                        <th class="darker">Done</th>
                    </tr>
                    <tr>
                        <td data-status=1></td>
                        <td data-status=2 class="darker"></td>
                        <td data-status=3></td>
                        <td data-status=4 class="darker"></td>
                    </tr>
                </table>`;
        return board
    },
    addNewCard: function () {
        const boardId = parseInt(event.target.dataset.boardId);
        const board = document.querySelector(`.board[data-id="${boardId}"]`);

        const cardTitle = 'New task';    //TODO ez jöjjön majd modalból -> majd
        const newCard = dom.createCardElement(cardTitle);
        newCard.addEventListener('click', dom.openCurrentCard);

        const allColumn = board.querySelectorAll('td');
        allColumn[0].appendChild(newCard);
        const orderNum = allColumn[0].childNodes.length;
        dataHandler.createNewCard(cardTitle, boardId, orderNum);
    },
    createCardElement: function (title) {
        let card = document.createElement('div');
        card.classList.add('my-card');
        card.innerText = title;

        return card
    },
    openCurrentCard: function () {
        const currentCardId = event.target.dataset.cardId;
        const currentCardTitle = event.target.childNodes[0].nodeValue;
        const modal = document.getElementById('card-container');
        modal.dataset.cardId = currentCardId;

        const cardTitle = document.getElementById('card-title');
        cardTitle.innerHTML = currentCardTitle;
        modal.style.display = 'block';

        cardTitle.addEventListener('click', dom.renameCardTitle);
        modal.addEventListener('keydown', dom.cardModalButtonPressEvents);
        modal.addEventListener('click', dom.cardModalClickEvents);
    },
    renameCardTitle: function () {
        const currentCardTitleContainer = document.getElementById('card-data-container');
        const currentCardTitle = document.getElementById('card-title');
        const oldTitle = currentCardTitle.innerHTML;

        currentCardTitle.dataset.oldtitle = oldTitle;
        currentCardTitle.innerHTML = "";

        dom.addRenameInputField(currentCardTitle, oldTitle, currentCardTitleContainer);
        dom.addNewTitleSaveButton(currentCardTitleContainer);
    },
    addRenameInputField: function (currentCardTitle, oldTitle, currentCardTitleContainer) {
        const renameInputField = document.createElement("input");
        renameInputField.id = "new-title";
        renameInputField.setAttribute("type", "text");
        renameInputField.setAttribute("value", oldTitle);

        currentCardTitleContainer.appendChild(renameInputField);
        currentCardTitle.removeEventListener('click', dom.renameCardTitle);

        renameInputField.focus();
        const inputLength = renameInputField.value.length;
        renameInputField.setSelectionRange(inputLength, inputLength);
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
    cardModalClickEvents: function (event) {
        const currentCardTitle = document.getElementById('card-title');
        const oldTitle = currentCardTitle.dataset.oldtitle;
        const saveButton = document.getElementById('save-button');
        const renameInputField = document.getElementById('new-title');

        if (event.target !== currentCardTitle && saveButton != null) {
            dom.restoreCardModalAndShowTitleOnly(currentCardTitle, renameInputField, oldTitle, saveButton);
        }
    },
    restoreCardModalAndShowTitleOnly: function (currentCardTitle, renameField, newTitle, saveButton) {
        currentCardTitle.innerHTML = newTitle;
        currentCardTitle.dataset.oldtitle = newTitle;
        renameField.remove();
        saveButton.remove();
        currentCardTitle.addEventListener('click', dom.renameCardTitle);
    },
    saveNewTitle: function () {
        const currentCardTitle = document.getElementById('card-title');
        const newTitle = document.getElementById('new-title').value;
        const renameField = document.getElementById("new-title");
        const saveButton = document.getElementById("save-button");

        const modal = document.getElementById('card-container');
        const currentCardId = parseInt(modal.dataset.cardId);

        dataHandler.saveNewCardTitle(currentCardId, newTitle);
        dom.restoreCardModalAndShowTitleOnly(currentCardTitle, renameField, newTitle, saveButton);
        dom.updateCardTitleInBoard(newTitle, currentCardId);
    },
    updateCardTitleInBoard: function (newTitle, currentCardId) {
        const currentCard = document.querySelector(`.my-card[data-card-id="${currentCardId}"]`);
        currentCard.innerHTML = newTitle;
    },
    closeCard: function () {
        const modal = document.getElementById('card-container');
        const saveButton = document.getElementById('save-button');
        if (saveButton != null) {
            saveButton.remove();
        }
        modal.style.display = 'none';
    },
    cardModalButtonPressEvents: function (event) {
        const currentCardTitle = document.getElementById('card-title');
        const oldTitle = currentCardTitle.dataset.oldtitle;
        const saveButton = document.getElementById('save-button');
        const renameField = document.getElementById('new-title');

        const escButton = 27;
        const enterButton = 13;
        const pressedButton = event.keyCode;

        if (pressedButton=== escButton && saveButton != null) {
            dom.restoreCardModalAndShowTitleOnly(currentCardTitle, renameField, oldTitle, saveButton);
        } else if (pressedButton === enterButton && saveButton != null) {
            dom.saveNewTitle();
        }
    },
    checkEmptyTitle: function (title, errorId) {
        const errorElement = document.getElementById(errorId);
        if (title.trim() === "") {
            errorElement.innerHTML = "Please input a title.";
            return false;
        }
        return true;
    },
    emptyBoard: function (boardId) {
        const board = document.querySelector(`.board[data-id="${boardId}"]`);
        const allColumn = board.querySelectorAll('td');

        for (let i=0; i < allColumn.length; i++) {
            allColumn[i].innerHTML = "";
        }
    }
};