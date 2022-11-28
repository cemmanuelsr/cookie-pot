function showCookiesForTab(tabs) {
  let tab = tabs.pop();

  let gettingAllCookies = browser.cookies.getAll({});
  gettingAllCookies.then((cookies) => {

    let activeTabUrl = document.getElementById('header-cookies-title');
    let text = document.createTextNode(`${cookies.length} cookies detected at: ${tab.url}`);
    let cookieList = document.getElementById('cookie-list');
    let secureNumberOfCookies = 0;
    activeTabUrl.appendChild(text);

    if (cookies.length > 0) {
      for (let cookie of cookies) {
        let li = document.createElement("li");
        li.style.color = cookie.secure ? 'green' : 'red';
        let firstOrThirdParty = tab.url.includes(cookie.domain) ? 'First party' : 'Third party';
        let sessionOrNavigation = cookie.session ? 'Session' : 'Navigation';
        let content = document.createTextNode(`${cookie.name} - ${cookie.domain} (${firstOrThirdParty}, ${sessionOrNavigation})`);
        li.appendChild(content);

        if (cookie.secure) {
          secureNumberOfCookies += 1;
        }

        cookieList.appendChild(li);
      }

      activeTabUrl.appendChild(document.createElement("br"));
      let scoreText = document.createTextNode(`Security score: ${((cookies.length - secureNumberOfCookies) / cookies.length).toFixed(2)}`)
      activeTabUrl.appendChild(scoreText);

      if (cookieList.children.length > 0) {
        document.getElementById('cookies-header').style.display = 'block';
      }
    }
  });
}

function showStorageForTab(storage) {
  if (storage.length > 0) {
    let activeTabUrl = document.getElementById('header-storage-title');
    let text = document.createTextNode(`Local Storage has ${storage.length} items`);
    activeTabUrl.appendChild(text);

    let localStorageList = document.getElementById('local-storage-list');
    for (let i in storage) {
      let item = storage[i];
      let li = document.createElement("li");
      let content = document.createTextNode(item);
      li.appendChild(content);
      localStorageList.appendChild(li);
    }

    if (localStorageList.children.length > 0) {
      document.getElementById('local-storage-container').style.display = 'block';
    }
  }
}

function getActiveTab() {
  return browser.tabs.query({ currentWindow: true, active: true });
}
getActiveTab().then(showCookiesForTab);

browser.tabs.executeScript({
  file: "js/getLocalStorage.js"
}).then((values) => {
  showStorageForTab(values[0]);
});

