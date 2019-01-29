// It uses data_handler.js to visualize elements
let dom = {
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        fetch('/get-boards')
        .then((response) => response.json())
        .then((response) => dom.showBoards(response))
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        for (const board of boards) {
            const boardToAdded = createBoardElement(board.title);
            document.querySelector('#boards').appendChild(boardToAdded)
        }
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
    }
    // here comes more features
};

const createBoardElement = function (boardTitle) {
    let board = document.createElement('div');
            board.classList.add('board');
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
                            <td></td>
                            <td class="darker"></td>
                            <td></td>
                            <td class="darker"></td>
                        </tr>
                    </table>
                    `;
    return board
};