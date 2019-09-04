window.onload = document.addEventListener('mousedown', onMouseDown);

document.addEventListener('dblclick', createBalloon);


function createBalloon(e) {
  const main = document.getElementById('container');
  const balloon = document.createElement('div');
  const label = document.createElement('p');


  if (e.target.className === 'balloon' || e.target.className === 'label') {
     return;
  }

  balloon.addEventListener('dblclick', addInput);
  label.innerText = "I'm balloon";
  label.classList.add('label');

  balloon.classList.add('balloon');
  balloon.style.left = e.pageX + 'px';
  balloon.style.top = e.pageY + 'px';

  balloon.append(label);
  main.append(balloon);
}

function addInput(e) {
  const div = e.currentTarget;
  const p = div.firstChild;
  const input = document.createElement('input');
  input.classList.add('input');
  input.setAttribute('value', `${p.innerText}`);
  input.setAttribute('type', 'text');
  div.replaceChild(input, p);
  input.focus();

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





