window.onload = document.addEventListener('mousedown', onMouseDown);

document.addEventListener('dblclick', createBalloon);


function createBalloon(e) {
  const main = document.getElementById('container');  //TODO: can refactor all code. Create object balloon with X,Y, text and so on...
  const balloon = document.createElement('div');
  const label = document.createElement('p');
  const offsetX = 30;
  const offsetY = 110;


  if (e.target.id !== 'container'){
    return;
  }

  balloon.addEventListener('dblclick', addInput);
  label.innerText = "I'm balloon";
  label.classList.add('label');

  balloon.classList.add('balloon');
  balloon.style.left = e.pageX - offsetX + 'px';
  balloon.style.top = e.pageY - offsetY + 'px';

  balloon.append(label);
  main.append(balloon);
}

function addInput(e) {
  const div = e.currentTarget;
  const p = div.firstChild;
  const text = p.innerText;

  p.classList.add('input');
  p.setAttribute('contentEditable', 'true');
  p.addEventListener('keydown', (e) => {handleInputKeyDown(e, text)});
  p.focus();
}

function handleInputKeyDown(e, content) {
  const input = e.target;

  if (e.which !== 13 && e.which !== 27) {
    return;
  }

  if (e.which === 27 /* escape */) {
    input.innerText = content;
  }

    e.preventDefault();
    input.classList.remove('input');
    input.blur();
}


function onMouseDown(e) {
    if (e.target.id === 'container') {
        return;
    }

    let element = e.target;
    let initX, initY, firstX, firstY;

    element.addEventListener('mousedown', function(e) {
        e.preventDefault();
        initX = this.offsetLeft;
        initY = this.offsetTop;
        firstX = e.pageX;
        firstY = e.pageY;

        this.addEventListener('mousemove', drag);

        window.addEventListener('mouseup', function () {
            element.removeEventListener('mousemove', drag);
        }, false);
    }, false);

    function drag(e) {
        this.style.left = initX + e.pageX - firstX + 'px';
        this.style.top = initY + e.pageY - firstY + 'px';
    }
}





