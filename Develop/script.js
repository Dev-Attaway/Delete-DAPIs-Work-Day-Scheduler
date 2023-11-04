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


// RelativeTime
// RelativeTime adds .from .to .fromNow .toNow
//  APIs to formats date to relative time strings (e.g. 3 hours ago).


let today = dayjs();
let timeSlot = $('.time-block');
let userText = $('textarea');

// this will be our flag for determining what color the calender block should be
let currentHr = today.format('H');



// sets the current time and day in currentDay <p>
$('#currentDay').text(today.format('MMM D, YYYY'));
$('#currentTime').text(today.format('hA'));


let flag = true;

function init() {
  printEventText();
}

function saveTextToStorage(text) {
  localStorage.setItem('eventDiscription', JSON.stringify(text));
}

function readEventTextFromStorage() {
  let discription = localStorage.getItem('eventDiscription');

  // if something was succefully loaded in description then 
  // JSON.parse(discription) transfroms the strings loaded from
  //  local storage into objects
  if (discription) {
    discription = JSON.parse(discription);
  }

  // returns an empty array if discription = falsey
  // meaning that there was nothing in local storage to load 
  else {
    discription = [];
  }

  return discription;
}

function printEventText() {

  let eventText = readEventTextFromStorage();

}

timeSlot.on('click', '#btn1', handleTextSubmit);
timeSlot.on('click', '#btn2', handleTextSubmit);
timeSlot.on('click', '#btn3', handleTextSubmit);
timeSlot.on('click', '#btn4', handleTextSubmit);
timeSlot.on('click', '#btn5', handleTextSubmit);
timeSlot.on('click', '#btn6', handleTextSubmit);
timeSlot.on('click', '#btn7', handleTextSubmit);
timeSlot.on('click', '#btn8', handleTextSubmit);
timeSlot.on('click', '#btn9', handleTextSubmit);


function handleTextSubmit(event) {
  event.preventDefault();

  let text = userText.val();

  let newEventText = {
    eventText: text
  };
  let eventText = readEventTextFromStorage();


  // let info = JSON.stringify(eventText[0])


  console.log("whoa");
  eventText.push(newEventText);
  saveTextToStorage(eventText);

  printEventText();
  userText.val('');


}


function setStyle() {
  for (let i = 0; i < numOfTimeSlots; i++) {
    // timeSlot.children('div').eq(i).text()
    // We are targeting the time-block class, within this class there are 3
    // children, we only want the first one, and we only want the text value of that 
    // particular child 

    let time = timeSlot.children('div').eq(i).text()

    if (time[time.length - 2] == 'P') {
      // removes and the PM from the time
      time = time.slice(0, time.length - 2);

      // converts to a number
      time *= 1;

      // converts the number into a base 23 time system, think military time 
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


// timeSlot.children('div').eq(i).text()
// We are targeting the time-block class, within this class there are 3
// children, we only want the first one, and we only want the text value of that 
// particular child 



$(function () {

  numOfTimeSlots = timeSlot.length
  setStyle();
  init();

});

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?


// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//



