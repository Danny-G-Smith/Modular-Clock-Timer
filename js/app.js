// timer object
// Start the timer
// Stop the timer
// Reset the timer
// Is the timer running?

const timerObject = ( function() {

   let timer = 0;
   let timerId = '';

   const startTimer = function() {

      if ( !isClockRunning() ) {

         timerId = setInterval( function() {
            timer++;
            viewObject.render( timer );
         }, 1000 );
      }
   };

   function stopTimer() {

      if ( isClockRunning() ) {
         clearInterval( timerId );
         timerId = '';
      }
   }
.

      if ( !isClockRunning() ) {
         timer = 0;
         viewObject.render( timer );
      }
   };

   function isClockRunning() {
      return ( timerId !== '' );
   }

   return {
      startTimer:     startTimer,
      stopTimer:      stopTimer,
      resetTimer:     resetTimer,
      isClockRunning: isClockRunning,
      timer: timer
   };

} )();


const viewObject = function() {
   let start_button, stop_button, reset_button, clock_check, timer_display;

   function init( startButton, stopButton, resetButton, clockCheck, timerDisplay ) {
      start_button  = startButton;
      stop_button   = stopButton;
      reset_button  = resetButton;
      clock_check   = clockCheck;
      timer_display = timerDisplay;

      start_button.addEventListener( 'click', timerObject.startTimer );
      stop_button.addEventListener(  'click', timerObject.stopTimer );
      reset_button.addEventListener( 'click', timerObject.resetTimer );

      clock_check.addEventListener(  'click', function() {
         const isRunningDisplay = document.getElementById( 'clock_running' );
         isRunningDisplay.innerHTML = ( timerObject.isClockRunning() ? 'Yes' : 'No' );
      } );
   }

   function render( timer ) {
      timer_display.innerHTML = timer;
   }

   return {
      init: init,
      render: render
   };

}();

viewObject.init( document.getElementById( 'start_button' ),
                 document.getElementById( 'stop_button' ),
                 document.getElementById( 'reset_button' ),
                 document.getElementById( 'clock_check' ),
                 document.getElementById( 'timer' ) );

// Reference variables of the page's button components:
// const start_button = document.getElementById('start_button');
// const stop_button = document.getElementById('stop_button');
// const reset_button = document.getElementById('reset_button');
// const clock_check = document.getElementById('clock_check');
