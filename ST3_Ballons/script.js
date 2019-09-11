const API_URL = './assets/data.json';
// used to give unique id for each created balloon
let index = 0;

window.onload = () => {
  // getting data from json file
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

    //using offset to create balloon at the clicking point
    const offsetX = 30;
    const offsetY = 110;
    createBalloon(e.pageX - offsetX, e.pageY - offsetY, "I'm balloon");
  }
);


/**
 * Creating new speech balloon on position with content inside input
 * @param pageX
 * @param pageY
 * @param content
 */
function createBalloon(pageX, pageY, content) {

  const main = document.getElementById('container');
  const balloon = document.createElement('div');
  const label = document.createElement('p');


  balloon.addEventListener('mousedown', handleMouseDown);
  balloon.addEventListener('dblclick', editLabel);
  label.innerText = content;
  label.classList.add('label');


  balloon.id = `${index++}`;
  balloon.classList.add('balloon');
  balloon.style.left = pageX + 'px';
  balloon.style.top = pageY + 'px';

  balloon.append(label);
  main.append(balloon);
}


/**
 * Editing label at a balloon
 * @param e
 */
function editLabel(e) {
  const div = e.currentTarget;
  const input = div.firstChild;
  const text = input.innerText;

  input.classList.add('input');
  input.setAttribute('contentEditable', 'true');
  input.addEventListener('keydown', e =>  handleInputKeyDown(e, text));
  input.focus();
}

/**
 * Handling key pressing on input inside a balloon
 * @param e
 * @param content
 */
function handleInputKeyDown(e, content) {

  if (e.which !== 13 && e.which !== 27) {
    return;
  }

  e.preventDefault();
  const input = e.target;

  if (e.which === 27 /* escape */) {
    input.innerText = content;
  }

  if (e.which === 13 /* enter */) {
    const index = input.parentElement.id;

    if (input.innerText === '') {
      input.parentElement.className = 'hidden';
    }

    const newContent = {
                        [index]: {
                                    posX: input.parentElement.offsetLeft,
                                    posY: input.parentElement.offsetTop,
                                    content: input.innerText,
                        }
    };
    updateContent(newContent);
  }
  input.classList.remove('input');
  input.blur();
}

/**
 * Handling mouse pressing on balloon
 * @param e
 */
function handleMouseDown(e) {
  let balloon = e.target;
  let initX = this.offsetLeft;
  let initY =  this.offsetTop;
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

/**
 * Updating content inside balloon
 * @param newContent
 */
function updateContent(newContent) {

  $.ajax({

    url: 'router.php',
    type: 'POST',
    data: {
            route: 'updateContent',
            content: newContent,
    },

    success: () => {
      console.log('Successfully updated');
    },

    error: () => {
     console.log('Updating failed');
    }
  })
}

