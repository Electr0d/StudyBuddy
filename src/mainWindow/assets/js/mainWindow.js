const elements = {
  app: document.querySelector('.app')
}

function welcomeScreen() {
  let welcomewindow = addPopup('welcome', 'Welcome!', {src: '../../src/global_assets/img/window_icons/close.png', rotate: false});
  let welcome = addSection('welcome', welcomewindow.body, 'Hello There!', false);
  addParameter('paragraph', welcome, {text: 'Welcome to Study Buddy. Set the study time and break time, and you will be notified when each interval is over.'}, 'paragraph');
  addParameter('study-interval', welcome, {text: 'Study', slider: {min: config.intervals.study.min, max: config.intervals.study.max, value: config.intervals.study.value}, }, 'slider', updateIntervals);
  
  addParameter('break-interval', welcome, {text: 'Break', slider: {min: config.intervals.break.min, max: config.intervals.break.max, value: config.intervals.break.value}, }, 'slider', updateIntervals);  


  // create error
  addElement('span', 'error no-error', 'intervals-error', undefined, 'ERROR', welcome);
  
  // create button
  addElement('button', 'interval-button', 'interval-button', 'initiate("welcome")', 'Start Studying!', welcome);
}
welcomeScreen();

function updateIntervals(e) {
  let targetId = e.target.id;
  let targetClass = e.target.classList[0];

  // get id of other element
  let id = targetId.includes('slider') ? targetId.replace('slider', 'input') : targetId.replace('input', 'slider');
  let Class = targetClass.includes('-input') ? targetClass.replace('-input', '') : targetClass + '-input';

  // get input type
  let type = e.target.type == 'range' ? 'slider' : 'input';
  let intervalType = targetId.replace(type + '-', '').replace('-interval', '');
  let interval = config.intervals[intervalType];
  let error = document.querySelector('#intervals-error');
  let button = document.querySelector('#interval-button');



  if(type == 'slider') {
    document.querySelector('.' + Class + '#' + id).value = e.target.value;
    interval.value = Number(e.target.value);
  } else {
    if(isInt(e.target.value)) {

      // if between min and max values
      if(e.target.value >= interval.min && e.target.value <= interval.max) {

        // reset error, update value of other input and update config object
        error.classList.add('no-error');
        button.classList.remove('error');
        document.querySelector('.' + Class + '#' + id).value = e.target.value;
        interval.value = Number(e.target.value);
      } else {
        error.classList.remove('no-error');
        button.classList.add('error');
        error.textContent = capitalize(intervalType)  + ' interval has to be between ' + interval.min + ' and ' + interval.max + '.';
      }
    } else {
      error.classList.remove('no-error');
      button.classList.add('error');
      error.textContent = capitalize(intervalType) + ' interval has to be a number.';
    }
  }
  

}

function isInt(text) {
  if(isNaN(Number(text))) {
    return false
  } else {
    return true;
  }
}



function capitalize(text) {
  // replace the first character with the capitalized character
  return text.replace(text.substring(0, 1), text.substring(0, 1).toUpperCase());
}

let timer;
function initiate(windowID) {
  destroyPopup(windowID);
  // create status screen
  addElement('div', 'status text-status', 'status', undefined, 'undefined', elements.app);
  addElement('div', 'tip text-tip', 'tip', undefined, 'undefined', elements.app);
  
  
  let cardsSection = addElement('div', 'cards-section section', 'cards-section', undefined, undefined, elements.app);
  addCard('controller', 'controller', 'Controller', cardsSection);
  addParameter('rain-volume', welcome, {text: 'Rain Volume', slider: {min: 0, max: 100, value: config.rain.volume}, }, 'slider', updateIntervals);  


  // start the timer
  timer = startTimer();
}


let state;
function startTimer(studyInterval, breakInterval) {
  let studyInt = 8;
  let breakInt = 5;
  state = 'study';
  updateStatus(state);
  setTimeout(() => {
    state = 'break';
    updateStatus(state);
  }, studyInt * 1000);



  let timer = setInterval(()=> {
    state = 'study';
    updateStatus(state);

    setTimeout(() => {
      state = 'break'
      updateStatus(state);
    }, studyInt * 1000);
  }, (studyInt + breakInt) * 1000);
  
  return {timer, state};
}

function killTimer(timer) {

}

function updateStatus(text) {
  let prevText = text == 'study' ? 'break' : 'study';
  let status = document.querySelector('.text-status');
  let tip = document.querySelector('.text-tip');


  status.textContent = capitalize(text);
  status.classList.add('status-' + text);
  status.classList.remove('status-' + prevText);


  // get a random tip
  tip.textContent = 'Tip: ' + adviceList[text][Math.round(Math.random(0, 1) * (adviceList[text].length - 1))];




}

initiate("welcome");