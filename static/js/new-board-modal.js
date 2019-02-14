function hideModal(){
    //this.style.display = 'none';
    document.getElementById('newBoardModalWrapper').style.display = 'none';
}
//let modalBody = document.getElementById('newBoardModalWrapper');
//modalBody.addEventListener('click', hideModal);
document.getElementById('closeButton').addEventListener('click', hideModal);


function showModal(){
    document.getElementById('newBoardModalWrapper').style.display = 'block';
}


let newBoardButton = document.getElementById('newBoardButton');
newBoardButton.addEventListener('click', showModal);





