const SELECTOR =
  "input[type='tel'], input[type='text'], input[type='email'], input[name='name']";
const fillEverything = () => {
  const randomRecord = globalThis.record;

  let allInputs = document.querySelectorAll(SELECTOR);

  allInputs.forEach((input) => {
    if (input.value) return;
    let mockValue = btoa(Math.random().toString()).substr(10, 5).toLowerCase();

    if (input.type === "tel") {
      mockValue = randomRecord.phone;
    }

    if (input.type === "name" || input.name === "name") {
      mockValue = randomRecord.name;
    }

    if (input.type === "email" || input.name === "email") {
      mockValue = randomRecord.email;
    }

    input.value = mockValue;
  });
};

console.log("Mock script loaded%c", "color: green; font-weight: bold;");

var observeDOM = (function () {
  var MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver;

  return function (obj, callback) {
    if (!obj || obj.nodeType !== 1) return;

    if (MutationObserver) {
      // define a new observer
      var mutationObserver = new MutationObserver(callback);

      // have the observer observe foo for changes in children
      mutationObserver.observe(obj, { childList: true, subtree: true });
      return mutationObserver;
    }

    // browser support fallback
    else if (window.addEventListener) {
      obj.addEventListener("DOMNodeInserted", callback, false);
      obj.addEventListener("DOMNodeRemoved", callback, false);
    }
  };
})();

// Observe a specific DOM element:
observeDOM(document.body, function (m) {
  var addedNodes = [];
  m.forEach(
    (record) => record.addedNodes.length & addedNodes.push(...record.addedNodes)
  );

  if (
    !addedNodes.find(
      (node) => node instanceof HTMLElement && node.querySelector(SELECTOR)
    )
  )
    return;

  fillEverything();
  console.log("change in DOM, updating...");
});
