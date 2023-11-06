// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours of 9am to 5pm
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future
// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist



let today = dayjs();
let timeSlot = $('.time-block');
let userText = $('textarea');

let currentHr = today.format('H');


// sets the current time and day in currentDay <p>
$('#currentDay').text(today.format('MMM D, YYYY'));
$('#currentTime').text(today.format('hA'));

function init() {
  numOfTimeSlots = timeSlot.length;
  printEventText();
  readEventTextFromStorage();
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

  if (!eventFromStorage)
  {
    return;
  }

  for (let i = 0; i < numOfTimeSlots; i++) {
    let currentText = timeSlot.children('.description').eq(i);

    // if falsey, there is nothing there
    // leave blank 
    if(eventFromStorage[i])
    {
      console.log(eventFromStorage[i].eventText);
      console.log(currentText);
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
  console.log("text, " + text);
  console.log('trimToText, ' + trimToText);

    let newEventText = {
      eventText: trimToText,
      eventTime: btnNumber
    };

    console.log(eventsFromStorage);
    eventsFromStorage[btnNumber] = newEventText;
    saveTextToStorage(eventsFromStorage);

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



