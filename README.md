# Modular Clock Timer
## [A PEN BY Carlos Fins](https://github.com/clockwerkz?tab=repositories)
## Countdown and Minutes / Seconds added by Danny G Smith

Can be used as countdown or count up, minutes / seconds or integers.

## For FEND Group, start with repo lession1 

- In all likelihood you are going to work on two games that needs a timer, so it is worth making something portable. We will be using two javascript functions, setInterval() and clearInterval().  Unfortunately we have not covered all of the technology for this yet.  When we are done, you will understand both window and local scope.  You will also learn about callback functions. And last but not least, you will learn about a design pattern called IIFE.

- Start by reading web doc WindowOrWorkerGlobalScope.setInterval() at https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval.

- It will not be uncommon to be confused at this point especially with the window and this. One way of fixing it is closures. How to keep the scope when calling setTimeout/setInterval in JavaScript https://snippets.aktagon.com/snippets/396-how-to-keep-the-scope-when-calling-settimeout-setinterval-in-javascript

- We are going to use a pattern called IIFE which stands for (Immediately Invoked Function Expression.). See https://developer.mozilla.org/en-US/docs/Glossary/IIFE

- ### Lession 1 is going to be concerned with a minimum viable product, functions to start, increment and stop.œ
       
       const timerObject = (function() {
          let timer = 0;
    
       // ******************************************************************
       // IMPORTANT: Set these six variables
       // ******************************************************************
       let timerStartingValue = timer = 0;    // set starting point in seconds (count down)
       let isCountDown    = false;            // either boolean true or false
       let isMinuteSecond = true ;            // if count up
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



## How to Configure Master Repo

Here is what you do:

     // ******************************************************************
     // IMPORTANT: Set these six variables
     // ******************************************************************
     let timerStartingValue = timer = 150; // set starting point in seconds (count down)
     let isCountDown    = true;            // either boolean true or false
     let isMinuteSecond = false;           // if count up
     let timerId = '';
     display_timer = document.getElementById('display_timer');
     display_timer.innerHTML = timer;
     // ******************************************************************
     // IMPORTANT: Set these six variables
     // ******************************************************************

## Credits
- [A PEN BY Carlos Fins](https://github.com/clockwerkz?tab=repositories)
- Countdown and Minutes / Seconds added by Danny G Smith

## License 

GNU General Public License 2.0+
