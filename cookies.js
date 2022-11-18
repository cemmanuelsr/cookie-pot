function showCookiesForTab(tabs) {
  let tab = tabs.pop();

  let gettingAllCookies = browser.cookies.getAll({});
  gettingAllCookies.then((cookies) => {

    let activeTabUrl = document.getElementById('header-cookies-title');
    let text = document.createTextNode(`${cookies.length} cookies detected at: ${tab.url}`);
    let firstPartyCookieList = document.getElementById('first-party-cookie-list');
    let thirdPartyCookieList = document.getElementById('third-party-cookie-list');
    let sessionCookieList = document.getElementById('session-cookie-list');
    let navigationCookieList = document.getElementById('navigation-cookie-list');
    let secureNumberOfCookies = 0;
    activeTabUrl.appendChild(text);

    if (cookies.length > 0) {
      for (let cookie of cookies) {
        let li = document.createElement("li");
        li.style.color = cookie.secure ? 'green' : 'red';
        let content = document.createTextNode(`${cookie.name} - ${cookie.domain}`);
        li.appendChild(content);

        if (cookie.secure) {
          secureNumberOfCookies += 1;
        }

        if (tab.url.includes(cookie.domain)) {
          firstPartyCookieList.appendChild(li);
        } else {
          thirdPartyCookieList.appendChild(li);
        }

        let clone_li = document.createElement("li");
        clone_li.style.color = cookie.secure ? 'green' : 'red';
        let clone_content = document.createTextNode(`${cookie.name} - ${cookie.domain}`);
        clone_li.appendChild(clone_content);

        if (cookie.session) {
          sessionCookieList.appendChild(clone_li);
        } else {
          navigationCookieList.appendChild(clone_li);
        }
      }

      activeTabUrl.appendChild(document.createElement("br"));
      let scoreText = document.createTextNode(`Security score: ${((cookies.length - secureNumberOfCookies) / cookies.length).toFixed(2)}`)
      activeTabUrl.appendChild(scoreText);

      if (firstPartyCookieList.children.length > 0) {
        document.getElementById('first-party-cookies-header').style.display = 'block';
      }
      if (thirdPartyCookieList.children.length > 0) {
        document.getElementById('third-party-cookies-header').style.display = 'block';
      }
      if (sessionCookieList.children.length > 0) {
        document.getElementById('session-cookies-header').style.display = 'block';
      }
      if (navigationCookieList.children.length > 0) {
        document.getElementById('navigation-cookies-header').style.display = 'block';
      }
    }
  });
}

function showStorageForTab(storage) {
  console.log(storage);
  if (storage.length > 0) {
    let activeTabUrl = document.getElementById('header-storage-title');
    let text = document.createTextNode(`Local Storage has ${storage.length} items`);
    activeTabUrl.appendChild(text);

    let localStorageList = document.getElementById('local-storage-list');
    for (let i in storage) {
      let item = storage[i];
      console.log(item);
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

browser.contextMenus.create({
  id: "get-local-storage",
  title: "Get Local Storage"
});

browser.contextMenus.onClicked.addListener((info, _) => {
  if (info.menuItemId === "get-local-storage") {
    browser.tabs.executeScript({
      file: "js/getLocalStorage.js"
    }).then((values) => {
      showStorageForTab(values[0]);
    });
  }
});

