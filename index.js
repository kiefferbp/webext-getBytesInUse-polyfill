/*!
 *  (chrome|browser).storage.localgetBytesInUse Firefox polyfill by Brian Kieffer (kiefferbp)
 *  License - MIT
 */

(function () {
    "use strict";

    if (!Object.hasOwnProperty.call(window, "browser") || !Object.hasOwnProperty.call(window, "chrome")) {
        throw new TypeError("Bad environment");
    }

    if (!chrome.storage || !chrome.storage.local || !chrome.storage.local.get) {
        throw new TypeError("Bad environment");
    }

    function getSize(keys) {
        var size = 0;

        if (typeof keys === "string") {
            keys = [keys]; // convert it into an array
        }

        return new Promise(function (resolve) {
            browser.storage.local.get(keys).then(function (results) {
                keys.forEach(function (key) {
                    size += (key + JSON.stringify(results[key])).length;
                });

                resolve(size);
            });
        });
    }

    browser.storage.local.getBytesInUse = browser.storage.local.getBytesInUse || function (keys, callback)  {
        if (callback === undefined) {
            return getSize(keys);
        }

        getSize(keys).then(callback).error(function (lastError) {
            if (Object.prototype.hasOwnProperty(chrome.runtime, "lastError")) { // does this browser support the lastError property?
                chrome.runtime.lastError = lastError;
            } else {
                throw new Error(lastError);
            }
        });
    };

    chrome.storage.local.getBytesInUse = chrome.storage.local.getBytesInUse || function (keys, callback) {
        if (typeof callback !== "function") {
            throw new TypeError("Malformed callback.");
        }

        browser.storage.local.getBytesInUse(keys, callback);
    };
}());