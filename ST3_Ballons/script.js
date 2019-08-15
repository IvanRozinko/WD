window.onload = addListeners;
let counter = 0;

function addListeners(){
    document.getElementById('balloon').addEventListener('mousedown', mouseDown, false);
    document.getElementById('container').addEventListener('dblclick', dblClick, false);
    window.addEventListener('mouseup', mouseUp, false);

}

function dblClick(e) {
    e.preventDefault();
    let container = document.getElementById('container');
    let div = document.createElement('div');

    div.style.left = e.clientX + 'px';
    div.style.top = e.clientY + 'px';
    div.classList.add('balloon' + counter++);
    div.addEventListener('mousedown', mouseDown, false);
    container.appendChild(div);
}

function mouseUp()
{
    console.log('up ' + this);
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(){
    console.log(this);
    this.addEventListener('mousemove', divMove, true);
}

function divMove(e) {
// e.stopPropagation();



    console.log(this);



    let coords = this.getBoundingClientRect();
    let shiftX = e.pageX - coords.left;
    let shiftY = e.pageY - coords.top;
console.log(coords);
    this.style.position = 'absolute';
    this.style.top = e.pageY - shiftY + 'px';
    this.style.left = e.pageX - shiftX + 'px';

}
