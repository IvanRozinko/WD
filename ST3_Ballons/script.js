const balloon = document.getElementById('balloon');
const imageContainer = document.getElementById('container');

document.addEventListener('dragstart', (e) => {
    document.addEventListener('drop', () => {
        drop(e);
    }, {once: true});
});

document.addEventListener('drag', drag);

document.addEventListener("dragover", (event) => event.preventDefault());




function drag(e) {



}


function drop(event) {

    event.preventDefault();

    console.log(event.clientX +' '+ event.clientY + ' ');
    const elem = event.target;

    // const coords = getCoord();
    elem.style.position = 'absolute';
    elem.style.left = event.clientX + window.pageXOffset - elem.offsetLeft + 'px';
    elem.style.top = event.clientY + window.pageYOffset - elem.offsetTop + 'px';



    // imageContainer.appendChild(elem);





}