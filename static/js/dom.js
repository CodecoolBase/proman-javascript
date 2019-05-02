// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    _appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (let childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
        });
    },


    getBoardTitle: function (title) {
        const template = document.querySelector('#board');
        const clone = document.importNode(template.content, true);

        if (title[1] == 'New Board') {
            clone.querySelector('.board-title').textContent = title[1];
            console.log("yes")
        } else {
            clone.querySelector('.board-title').textContent = title;
        }


    return clone;
    },


    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        //console.log(clone);
        let boardList = document.createElement("section");
        boardList.id ="board";
        for (let board of boards) {
            boardList.appendChild(this.getBoardTitle(board.title))
        }

        let container = document.querySelector('.board-container');
        container.appendChild(boardList);

    },


    addNewBoardEventListener: function () {
        let addNewBoardButton = document.getElementsByClassName("add-new-board-button");
        addNewBoardButton[0].addEventListener("click", this.addNewBoardClickHandler)
    },


    addNewBoardClickHandler: function () {
        dataHandler.addNewBoard(function (newCardTitle) {
            dom.showBoard(newCardTitle);
        })

    },

    showBoard: function (newCardTitle) {
        let boardList = document.createElement("section");
        boardList.id ="board";

        boardList.appendChild(this.getBoardTitle(newCardTitle));



        let container = document.querySelector('.board-container');
        container.appendChild(boardList);
    },

    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features
};
