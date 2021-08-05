// zero out the coundown clock
let countdown = document.getElementById('countdown');
countdown.innerText = '0m0s';

let workMins;
let breakMins;
chrome.storage.sync.get(['workMins', 'breakMins'], function (result) {
  workMins = result.workMins;
  breakMins = result.breakMins;

})

// listen for button click, start timer
startPomodoro.addEventListener("click", async () => {

  let currDate = new Date();
  let currDateInMs = currDate.getTime();
  let addMlSeconds = workMins * 60000; // TODO get mins from storage
  let workMinsFromNow = new Date(currDateInMs + addMlSeconds);

  // window.alert('foo');

  // let node = document.createElement('p')
  // node.innerText = 'START THE TIMER!';
  // document.body.appendChild(node);

  let workInterval = setInterval(() => {
    document.getElementById('status').innerHTML = "WORKING";


    let now = new Date().getTime();
    let distance = workMinsFromNow - now;
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerText = minutes + "m" + seconds + "s";  //this is the output on screen. ID = "demo"

    if (distance < 0) {  //when countdown is up, tells you to take a break
      clearInterval(workInterval)
      document.getElementById("countdown").innerHTML = "GREAT JOB! TAKE A BREAK!"

      let currDate = new Date();
      let currDateInMs = currDate.getTime();
      let addMlSeconds = breakMins * 60000; // TODO get mins from storage
      let breakMinsFromNow = new Date(currDateInMs + addMlSeconds);

      let breakInterval = setInterval(() => {
        document.getElementById('status').innerHTML = "BREAK TIME";

        let now = new Date().getTime();
        let distance = breakMinsFromNow - now;
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("countdown").innerText = minutes + "m" + seconds + "s";  //this is the output on screen. ID = "demo"

        if (distance < 0) {  //when countdown is up, tells you to take a break
          clearInterval(breakInterval)
          document.getElementById("countdown").innerHTML = "BREAKS OVER!"
        }
      }, 100);
    }
  }, 100);
});



