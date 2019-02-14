//let modalBody = document.getElementById('newBoardModalWrapper');
//modalBody.addEventListener('click', hideModal);
document.getElementById('closeButton').addEventListener('click', hideModal);
document.getElementById('submitNewBoardData').addEventListener('click', addBoard);



function hideModal(){
    //this.style.display = 'none';
    document.getElementById('newBoardModalWrapper').style.display = 'none';
}
function showModal(){
    document.getElementById('newBoardModalWrapper').style.display = 'block';
}
function addBoard(){
    let boardTitle = document.getElementById('boardTitle').value;
    dataHandler.createNewBoard(boardTitle, dom.loadBoards);
    hideModal();
    dataHandler._saveData();
}

let newBoardButton = document.getElementById('newBoardButton');
newBoardButton.addEventListener('click', showModal);






