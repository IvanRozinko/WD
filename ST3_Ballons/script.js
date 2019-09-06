window.onload = () => {

    document.addEventListener('mousedown', onMouseDown);

    const URL = './assets/data.json';

     fetch(URL)
       .then(response => response.json())
       .then(result => {
           Object.values(result).map(balloon => {

                 const { posX, posY, content } = balloon;
                 createBalloon(posX, posY, content);

             })
       })
};

document.addEventListener('dblclick', e => {

   if (e.target.id !== 'container'){
      return;
  }
  createBalloon(e.pageX, e.pageY,"I'm balloon");
}
);



function createBalloon(pageX, pageY, content ) {


  const main = document.getElementById('container');  //TODO: can refactor all code. Create object balloon with X,Y, text and so on...
  const balloon = document.createElement('div');
  const label = document.createElement('p');
  const offsetX = 30;
  const offsetY = 110;

  balloon.addEventListener('dblclick', addInput);
  label.innerText = content;
  label.classList.add('label');

  balloon.classList.add('balloon');
  balloon.style.left = pageX - offsetX + 'px';
  balloon.style.top = pageY - offsetY + 'px';

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
    console.log('mousedown');
    if (e.target.id === 'container') {
        return;
    }

    let element = e.target;
    console.log(element);
    let initX, initY, firstX, firstY;

    element.addEventListener('mousedown', function(e) {
        console.log('fire');
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






