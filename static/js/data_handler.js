// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
let dataHandler = {
    keyInLocalStorage: 'proman-data', // the string that you use as a key in localStorage to save your application data
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _loadData: function () {
        this._data = JSON.parse(localStorage.getItem(keyInLocalStorage));
    },
    _saveData: function () {
        localStorage.setItem(keyInLocalStorage, JSON.stringify(this._data));
    },
    init: function () {
        this._loadData();
    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards
        let boards = this._data.boards;
        //console.log(boards);
        //callback(boards as HTML)
        callback(boards);
    },
    getBoard: function (boardID, callback) {
        let boards = this.getBoards();
        for (i = 0 ;i < boards.length ; i++){
            if(boardID == boards[i].id){
                console.log(boards[i]);
                callback(boards[i]);
            }
        }
    },
    getStatuses: function (callback) {
        callback(dataHandler._data["statuses"]);
    },
    getStatus: function (statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
        let statuses = getStatuses();
        for (i = 0 ;i < statuses.length ; i++){
            if(statusId == statuses[i].id){
                callback(statuses[i]);
            }
        }
    },
    getCardsByBoardId: function (boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
        let cards = dataHandler._data["cards"];
        let cardsByBoard = [];
        for (i = 0 ;i < cards.length ; i++){
            if(cards[i].board_id == boardId){
                callback(cards[i]);
                cardsByBoard.push(cards[i]);
            }
        }
    },
    getCard: function (cardID, callback) {
        // the card is retrieved and then the callback function is called with the card
        let cards = dataHandler._data.cards;
        for (i = 0; i < cards.length; i++) {
            if (cards[i].id == cardID) {
                callback(cards[i]);
                return cards[i];
            }
        }
    },

    createNewBoard: function (boardTitle, callback) {
        // creates new board, saves it and calls the callback function with its data
        let boards = dataHandler._data.boards;
        let newID = boards.length + 1;
        let newBoard = {'id': newID,
                        'title': boardTitle,
                        'is_active': true};
        callback(newBoard);
        boards.push(newBoard);
    },
    createNewCard: function (cardTitle, boardID, statusID, order) {
        // creates new card, saves it and calls the callback function with its data

        let cards = dataHandler._data.cards;
        let newID = cards.length + 1;
        let newCard = {'id': newID,
                        'title': cardTitle,
                        'board_id': boardID,
                        'status_id': statusID,
                        'order': order};
        callback(newCard);
        cards.push(newCard);
    },
    createNewCard: function (cardTitle, boardTitle, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
        let cards = [];
        cards.push(dataHandler._data["statuses"])
        let newCard = [{
            "id": cards.length -2,
            "title": cardTitle,
            "board_id": boardTitle,
            "status_id": statusId,
            "order": 4}];
        callback(newCard);
        cards.push(newCard);
    },
    // here comes more features

};
