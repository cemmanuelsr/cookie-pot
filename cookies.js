async function showCookiesForTab(tabs) {
  let tab = tabs.pop();

  let gettingAllCookies = browser.cookies.getAll({});
  let cookiesScore;
  await gettingAllCookies.then((cookies) => {

    let activeTabUrl = document.getElementById('header-cookies-title');
    let text = document.createTextNode(`${cookies.length} cookies detected`);
    let secureNumberOfCookies = 0;
    activeTabUrl.appendChild(text);

    if (cookies.length > 0) {
      for (let cookie of cookies) {
        if (cookie.secure) {
          secureNumberOfCookies += 1;
        }
      }
    }

    cookiesScore = cookies.length > 0 ? secureNumberOfCookies / cookies.length : 0.5;
  });

  return cookiesScore;
}

async function showStorageForTab(storage) {
  let activeTabUrl = document.getElementById('header-local-storage-title');
  let totalSize = 0;
  if (storage.length > 0) {
    for (let i in storage) {
      let item = storage[i];
      totalSize += (item.length + i.length) * 2;
    }
  }

  let text = document.createTextNode(`Local Storage has ${storage.length} items (${(totalSize / 1024.0).toFixed(2)} KB)`);
  activeTabUrl.appendChild(text);

  return storage.length > 0 ? 1.0 - (totalSize / 1024.0) / 5120.0 : 0.5;
}

async function getThirdPartyConnections() {
  let requests = browser.extension.getBackgroundPage().getRequests();

  let activeTabUrl = document.getElementById('header-network-title');
  let thirdPartyRequests = 0;
  if (requests.length > 0) {
    for (let i in requests) {
      let request = requests[i];
      thirdPartyRequests += (request.thirdParty === true);
    }
  }

  let text = document.createTextNode(`${thirdPartyRequests} third party connections detected`);
  activeTabUrl.appendChild(text);

  return requests.length > 0 ? 1.0 - thirdPartyRequests / requests.length : 0.5;
}

function calculateScore(cookiesScore, storageScore, connectionScore) {
  console.log(cookiesScore, storageScore, connectionScore);
  let activeTabUrl = document.getElementById('average-score');
  let averageScore = Math.pow(cookiesScore * cookiesScore * storageScore * storageScore * connectionScore, 1 / 5);
  if (averageScore <= 0.3) {
    activeTabUrl.style.color = 'red';
  } else if (averageScore <= 0.7) {
    activeTabUrl.style.color = 'yellow';
  } else {
    activeTabUrl.style.color = 'green';
  }
  let text = document.createTextNode(`Security score: ${averageScore.toFixed(2)}`);
  activeTabUrl.appendChild(text);
}

function getActiveTab() {
  return browser.tabs.query({ currentWindow: true, active: true });
}

getActiveTab().then((tabs) => {
  showCookiesForTab(tabs).then((cookiesScore) => {
    browser.tabs.executeScript({ file: "js/getLocalStorage.js" }).then((values) => {
      showStorageForTab(values[0]).then((storageScore) => {
        getThirdPartyConnections().then((connectionScore) => { calculateScore(cookiesScore, storageScore, connectionScore) });
      });
    });
  });
});

