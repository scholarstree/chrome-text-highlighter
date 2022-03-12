chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        "title": "Highlight",
        "id": "highlighterID"
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ["./contentScript.js"]
    })
        .then(() => {
            console.log("INJECTED CONTENT SCRIPT.")
        })
        .catch(err => console.log(err));
})