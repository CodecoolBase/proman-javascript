function hideModal(){
    this.style.display = 'none';
}
let modalBody = document.getElementById('modalWrapper');
modalBody.addEventListener('click', hideModal);

function showModal(){
    document.getElementById('modalWrapper').style.display = 'block';
}


let newBoardButton = document.getElementById('newBoardButton');
newBoardButton.addEventListener('click', showModal);





