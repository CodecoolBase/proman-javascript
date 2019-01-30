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
            this.loadCards(board.id)
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
                    column.appendChild(cardToAdd)
                }
            }
        }
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
    createCardElement: function (title) {
        let card = document.createElement('div');
        card.classList.add('my-card');
        card.innerText = title;

        return card
    }
};