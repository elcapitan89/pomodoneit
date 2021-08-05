let workMins = 25;
let breakMins = 5;
let deadline = null;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ breakMins });
  chrome.storage.sync.set({ workMins });
  // chrome.storage.sync.set({ deadline });

  console.log(`Default work time set to ${workMins} mins and break time set to ${breakMins} mins`);
  chrome.storage.sync.get(['workMins', 'breakMins'], function (result) {
    console.log(result.workMins);
    console.log(result.breakMins);
  })
});