var currentTab;
var SitesList = [
  "film2movie.li",
  "hexdownload.info",
  "movie30t.pw",
  "dibamovie.pro",
  "salamdl.co",
  "doostihaa.com",
  "dlroozane.net",
  "uptvs.com",
  "karanmovie.org"
];

function updateActiveTab(tabs) {

  function isSupportedProtocol(urlString) {
    var supportedProtocols = ["https:", "http:", "ftp:", "file:"];
    var url = document.createElement('a');
    url.href = urlString;
    return supportedProtocols.indexOf(url.protocol) !== -1;
  }

  function updateTab(tabs) {
    if (tabs[0]) {
      currentTab = tabs[0];
      if (isSupportedProtocol(currentTab.url)) {
        var redFlaged = false;

        SitesList.forEach((element) => {
          if (currentTab.url.includes(element)) {
            redFlaged = true;
          }
        });

        if (redFlaged) {
          browser.browserAction.setIcon({path: "icons/red.png", tabId: currentTab.id});
        } else {
          browser.browserAction.setIcon({path: "icons/green.png", tabId: currentTab.id});
        }
      } else {
        browser.browserAction.setIcon({path: "icons/green.png", tabId: currentTab.id});
      }
    }
  }

  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then(updateTab);
}

// listen to tab URL changes
browser.tabs.onUpdated.addListener(updateActiveTab);

// listen to tab switching
browser.tabs.onActivated.addListener(updateActiveTab);

// listen for window switching
browser.windows.onFocusChanged.addListener(updateActiveTab);

updateActiveTab();
