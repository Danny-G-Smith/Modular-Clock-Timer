/**
 * Modular Clock Timer Live-Feed
 * A PEN BY Carlos Fins
 * https://codepen.io/qbancowboy/pen/mjvQgr?editors=1010
 *
 * Countdown and Minutes / Seconds added by Danny G Smith
 */

// 10,000 foot explanation
// WindowOrWorkerGlobalScope.setInterval()
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
//

// https://developer.mozilla.org/en-US/docs/Glossary/IIFE

// What (function (window, document, undefined) {})(window, document); really means
// https://toddmotto.com/what-function-window-document-undefined-iife-really-means/


/**
 * Modular Timer IIFE with the following public functions
 *
 * Note: Set timerStartingValue, isCountDown, and isMinuteSecond
 *
 * @type {{ll}}
 */
const timerObject = (function() {
   let timer = 0;

   // ******************************************************************
   // IMPORTANT: Set these six variables
   // ******************************************************************
   let timerStartingValue = timer = 0; // set starting point in seconds (count down)
   let isCountDown        = false;     // either boolean true or false
   let isMinuteSecond     = true;      // if count up
   let timerId = '';
   display_timer = document.getElementById('display_timer');
   display_timer.innerHTML = timer;
   // ******************************************************************
   // IMPORTANT: Set these six variables
   // ******************************************************************

   /**
    * Public function to setup a countdown or count up timer
    * Note:  use function isClockRunning() to toggle timer on and off
    */
   const startTimer = function() {
      if (!isClockRunning()) {
         timerId = setInterval(function() {
            if (isCountDown) {
               timer--;
            } else {
               timer++;
            }

            if (isMinuteSecond) {
               viewTimerObject.renderMinutesSeconds(timer);
            } else {
               viewTimerObject.render(timer);
            }
            //console.log(timer)
         }, 1000);
      }
   };

   /**
    * Public function to stop timer, used with toggle isClockRunning()
    */
   function stopTimer() {
      if (isClockRunning()) {
         clearInterval(timerId);
         timerId = '';
      }
   }

   /**
    * public function to reset the timer
    */
   const resetTimer = () => {
      if (!isClockRunning()) {
         timer = timerStartingValue;
         if (isMinuteSecond) {
            viewTimerObject.renderMinutesSeconds(timer);
         } else {
            viewTimerObject.render(timer);
         }
      }
   };

   /**
    * public function that acts as a toggle for starting / stopping timer
    * @returns {boolean}
    */
   function isClockRunning() {
      return (timerId !== '');
   }

   /**
    * Local variables to be passed by reference.
    */
   return {
      startTimer: startTimer,
      stopTimer:  stopTimer,
      resetTimer: resetTimer,
      isClockRunning: isClockRunning,
   };

})(); // end of IIFE modular object timerObject

/**
 * Modular IIFE object used to pass variables by reference and to initialize timerObject,
 * and render the timer on the page.
 *
 * @type {{init, render, renderMinutesSeconds}}
 */
const viewTimerObject = function() {
   let start_button, stop_button, reset_button, clock_check, display_timer;

   /**
    * Initializer for timerObject
    * @param startButton
    * @param stopButton
    * @param resetButton
    * @param clockCheck
    * @param timerDisplay
    */
   function init(startButton, stopButton, resetButton, clockCheck, timerDisplay) {
      start_button  = startButton;
      stop_button   = stopButton;
      reset_button  = resetButton;
      clock_check   = clockCheck;
      display_timer = timerDisplay;

      start_button.addEventListener('click', timerObject.startTimer);
      stop_button.addEventListener('click',  timerObject.stopTimer);
      reset_button.addEventListener('click', timerObject.resetTimer);

      clock_check.addEventListener('click',  function() {
         const isRunningDisplay     = document.getElementById('clock_running');
         isRunningDisplay.innerHTML = (timerObject.isClockRunning()    ? 'Yes' : 'No');
      });
   }

   /**
    * Public function to render timer value
    * @param timer
    */
   function render(timer) {
      display_timer.innerHTML = timer;
   }

   /**
    *
    * @param timer
    */
   function renderMinutesSeconds(timer) {

      let minutes = Math.trunc(timer / 60);
      let seconds = timer % 60;

      if (seconds < 10) {
         seconds = `0${seconds}`;
      }

      display_timer.innerHTML = minutes + ':' + seconds;
   }

   /**
    * Technique to make the functions public
    */
   return {
      init: init,
      renderMinutesSeconds: renderMinutesSeconds,
      render: render,
   };
}(); // end of IIFE modular object initializer

viewTimerObject.init(document.getElementById('start_button'),
   document.getElementById('stop_button'),
   document.getElementById('reset_button'),
   document.getElementById('clock_check'),
   document.getElementById('display_timer'));

//Reference variables of the page's button components:
// const start_button = document.getElementById('start_button');
// const stop_button  = document.getElementById('stop_button');
// const reset_button = document.getElementById('reset_button');
// const clock_check  = document.getElementById('clock_check');

