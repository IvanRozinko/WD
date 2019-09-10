const API_URL = './assets/data.json';


window.onload = () => {
  fetch(API_URL)
    .then(response => response.json())
    .then(result => {
      Object.values(result)
        .map(balloon => {

          const { posX, posY, content } = balloon;
          createBalloon(posX, posY, content);

        });
    });
};

document.addEventListener('dblclick', e => {

    if (e.target.id !== 'container') {
      return;
    }
    createBalloon(e.pageX, e.pageY, "I'm balloon");
  }
);


function createBalloon(pageX, pageY, content) {

  const main = document.getElementById('container');
  const balloon = document.createElement('div');
  const label = document.createElement('p');
  const offsetX = 30;
  const offsetY = 110;

  balloon.addEventListener('mousedown', handleMouseDown);
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
  p.addEventListener('keydown', (e) => {
    handleInputKeyDown(e, text);
  });
  p.focus();
}

function handleInputKeyDown(e, content) {

  if (e.which !== 13 && e.which !== 27) {
    return;
  }

  const input = e.target;

  if (e.which === 27 /* escape */) {
    input.innerText = content;
  }

  if (e.which === 13 /* enter */) {
    updateContent(input.innerText);
  }

  e.preventDefault();
  input.classList.remove('input');
  input.blur();
}

function handleMouseDown(e) {
  let balloon = e.target;
  let initX = this.offsetLeft;
  let initY = this.offsetTop;
  let firstX = e.pageX;
  let firstY = e.pageY;

  balloon.addEventListener('mousemove', drag);
  window.addEventListener('mouseup', () => {
    balloon.removeEventListener('mousemove', drag);
  });

  function drag(e) {
    balloon.style.left = initX + e.pageX - firstX + 'px';
    balloon.style.top = initY + e.pageY - firstY + 'px';
  }
}

function updateContent(newContent) {

  $.ajax({
    url: 'router.php',
    type: 'POST',
    data: {
      route: 'updateContent',
      content: newContent
    },

    error: () => {
     console.log('Updating failed');
    }


  })
}

