const element = document.getElementById()
element.onmousedown = function(event) {

    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;
    document.body.append(element);

    moveAt(event.pageX, event.pageY);

    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the element on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the element, remove unneeded handlers
    element.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };

};

element.ondragstart = function() {
    return false;
};
// function dblClick(e) {
//     e.preventDefault();
//     let container = document.getElementById('container');
//     let div = document.createElement('div');
//
//     div.style.left = e.clientX + 'px';
//     div.style.top = e.clientY + 'px';
//     div.classList.add('balloon' + counter++);
//     div.addEventListener('mousedown', mouseDown);
//     container.appendChild(div);
//     divMove(e, div);
// }
