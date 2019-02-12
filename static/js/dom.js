// It uses data_handler.js to visualize elements
let dom = {
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(dom.showBoards)
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        let boards_container = document.getElementById('boards');
        boards_container.innerHTML = '';
        boards.forEach( (board) => {
            board = dom.makeBoard(board);
            dom.appendToElement(boards_container, board.outerHTML);
        });
        // it adds necessary event listeners also
        console.log(boards);
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
    // here comes more features
    createNewElement: function (tagName, attributes) {
        /*
        param: tagName (string)
        param: attributes(dictionary)
        return: created element*/
        let newElement = document.createElement(tagName);
        for(let key in attributes){
            newElement.setAttribute(key, attributes[key]);
        }
        return newElement
    },

    makeBoard: function (board) {
        //param: board: object containing board  details
        //return: HTML object
        let newBoard = document.createElement('div');
        newBoard.id = board['id'];
        newBoard.classList.add('board');
        newBoard.setAttribute('data-is-active', board['is_active']);
        let boardHeader = document.createElement('div');
        newBoard.appendChild(boardHeader);
        let boardTitle = document.createElement('span');
        boardTitle.textContent = board['title'];
        boardHeader.appendChild(boardTitle);
        //create "New Card" button and append it
        //add event listener to toggle 'data-is-active' on click
        //boardHeader.appendChild(boardTitle);
        return newBoard
    }
};

