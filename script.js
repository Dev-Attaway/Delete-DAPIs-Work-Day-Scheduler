
let today = dayjs();
let timeSlot = $('.time-block');
let userText = $('textarea');

let currentHr = today.format('H');
let quickTimerCtr = 12;

// sets the current time and day in currentDay <p>
$('#currentDay').text(today.format('MMM D, YYYY'));
$('#currentTime').text(today.format('hA'));

let answerResult = document.getElementById("result");

function init() {
  hideResult();
  numOfTimeSlots = timeSlot.length;
  printEventText();
  readEventTextFromStorage();
}

function fastTimer() {
  quickTimer = setInterval(function () {
    quickTimerCtr--;

    // if quickTimerCtr is greater than 0 then show result
    showResult();
    console.log(quickTimer);

    //  if quickTimer is less than or equal to 0 then hide the result 
    if (quickTimerCtr <= 0) {
      // Clears interval
      hideResult();
      clearInterval(quickTimer);
    }
    // set in Nanoseconds
  }, 100);
}


function showResult() {
  answerResult.style.display = "inherit";
}

function hideResult() {
  answerResult.style.display = "none";
}


function saveTextToStorage(text) {
  localStorage.setItem('eventDiscription', JSON.stringify(text));
}

function readEventTextFromStorage() {
  let text = localStorage.getItem('eventDiscription');

  // if somebtnNumber was succefully loaded in description then 
  // JSON.parse(discription) transfroms the strings loaded from
  //  local storage into objects
  if (text) {
    text = JSON.parse(text);
  }

  // returns an empty array if description = falsey
  // meaning that there was nobtnNumber in local storage to load 
  else {
    text = [null, null, null, null, null, null, null, null, null];
  }

  return text;
}

function handleDeleteProject() {
  let eventFromStorage = readEventTextFromStorage();
  eventFromStorage.splice()
}


function printEventText() {

  // We use numOfTimeSlots since it value is grabbed on init
  let eventFromStorage = readEventTextFromStorage();

  if (!eventFromStorage) {
    return;
  }

  for (let i = 0; i < numOfTimeSlots; i++) {
    let currentText = timeSlot.children('.description').eq(i);

    // if falsey, there is nothing there
    // leave blank 
    if (eventFromStorage[i]) {
      currentText.text(eventFromStorage[i].eventText);
      // eventFromStorage[i].eventText is the object who's value of eventText
      // is what we are inputing to currentText
    }
  }

}

timeSlot.on('click', '#btn0', handleTextSubmit);
timeSlot.on('click', '#btn1', handleTextSubmit);
timeSlot.on('click', '#btn2', handleTextSubmit);
timeSlot.on('click', '#btn3', handleTextSubmit);
timeSlot.on('click', '#btn4', handleTextSubmit);
timeSlot.on('click', '#btn5', handleTextSubmit);
timeSlot.on('click', '#btn6', handleTextSubmit);
timeSlot.on('click', '#btn7', handleTextSubmit);
timeSlot.on('click', '#btn8', handleTextSubmit);

function handleTextSubmit(event) {
  event.preventDefault();
  fastTimer();
  eventsFromStorage = readEventTextFromStorage();

  let btnNumber = $(this).attr('id');
  JSON.stringify(btnNumber);

  // grabs the number off of the button that has been pressed
  btnNumber = btnNumber[3];
  btnNumber *= 1;

  // The value of what was stored into the time slot box, 
  // when it particular save button is pressed
  let text = $(this).prev().val();
  let trimToText = text.trim();

  let newEventText = {
    eventText: trimToText,
    eventTime: btnNumber
  };

  eventsFromStorage[btnNumber] = newEventText;
  saveTextToStorage(eventsFromStorage);
  quickTimerCtr = 12;

}

function setStyle() {

  for (let i = 0; i < numOfTimeSlots; i++) {
    // timeSlot.children('div').eq(i).text()
    // We are targeting the time-block class, within this class there are 3
    // children, we only want the first one, and we only want the text value of that 
    // particular child 

    let time = timeSlot.children('div').eq(i).text();


    if (time[time.length - 2] == 'P') {
      // removes and the PM from the time
      time = time.slice(0, time.length - 2);

      // converts to a number
      time *= 1;

      // converts the number into a base 23-time system, think military time 
      time += 12;
    }
    else {
      // removes and the Am from the time
      time = time.slice(0, time.length - 2);
      time *= 1;
    }

    if (time > currentHr)
      timeSlot.eq(i).addClass('future');

    else if (time == currentHr)
      timeSlot.eq(i).addClass('present');

    // (time < currentHr)
    else
      timeSlot.eq(i).addClass('past');

  }
}

$(function () {

  init();
  setStyle();
});



