# chrome.storage.local.getBytesInUse polyfill
Currently, Firefox has not implemented the `getBytesInUse` method for the local storage area.
This polyfill fixes that in both `chrome` and `browser` namespaces.

# Example Usage
    require("webext-getBytesInUse-polyfill");

    browser.storage.local.set({hello: "there!"})
        .then(browser.storage.local.getBytesInUse("hello"))
        .then((bytes) => console.log("Bytes consumed: " + bytes))
        .error(() => console.log("Storage limit exceeded!"));
