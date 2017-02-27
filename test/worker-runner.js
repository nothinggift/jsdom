function fire(event) {
  var data = Array.prototype.slice.call(arguments, 1);
  data = JSON.parse(JSON.stringify(data));

  postMessage({
    jsonrpc: '2.0',
    method: 'fire',
    params: {
      event: event,
      data: data
    }
  });
}

var runner = require('./browser-core');
self.onmessage = function (e) {
  var options = require('querystring').parse(e.data);
  var fileFilter, testFilter;

  var modules = {
    "level2/core": require("../test/level2/core"),
    "level2/events": require("../test/level2/events"),
    "level3/textContent.js": require("../test/level3/textContent.js"),
    "to-port-to-wpts/class-list.js": require("../test/to-port-to-wpts/class-list.js"),
    "to-port-to-wpts/dom-implementation.js": require("../test/to-port-to-wpts/dom-implementation.js"),
    "to-port-to-wpts/event-target.js": require("../test/to-port-to-wpts/event-target.js"),
    "to-port-to-wpts/node-clone-node.js": require("../test/to-port-to-wpts/node-clone-node.js"),
    "to-port-to-wpts/non-document-type-child-node.js": require("../test/to-port-to-wpts/non-document-type-child-node.js"),
    "to-port-to-wpts/htmlanchorelement.js": require("../test/to-port-to-wpts/htmlanchorelement.js"),
    "to-port-to-wpts/htmlcanvaselement.js": require("../test/to-port-to-wpts/htmlcanvaselement.js"),
    "to-port-to-wpts/htmlelement.js": require("../test/to-port-to-wpts/htmlelement.js"),
    "to-port-to-wpts/location.js": require("../test/to-port-to-wpts/location.js"),
    "to-port-to-wpts/inline-event-handlers.js": require("../test/to-port-to-wpts/inline-event-handlers.js"),
    "to-port-to-wpts/message-event.js": require("../test/to-port-to-wpts/message-event.js"),
    "to-port-to-wpts/post-message.js": require("../test/to-port-to-wpts/post-message.js"),
    "to-port-to-wpts/on-error.js": require("../test/to-port-to-wpts/on-error.js"),
    "to-port-to-wpts/history": require("../test/to-port-to-wpts/history")
  };

  var modulesToRun = {};

  if (options.suites) {
    fileFilter = options.suites.replace(/\s/g, '').split(',');
  }
  // default to only those test modules that pass
  fileFilter = fileFilter || Object.keys(modules);

  if (options.tests) {
    testFilter = options.tests.replace(/\s/g, '').split(',');
  }

  Object.keys(modules).
    // process file filters
    filter(function (module) {
      if (fileFilter) {
        return fileFilter.some(function (filter) {
          return module.indexOf(filter) >= 0;
        });
      }

      return true;
    }).
    forEach(function (name) {
      var required = modules[name];
      var module = required.tests || required;

      if (testFilter) {
        // process test filters
        module = Object.keys(module).
          filter(function (test) {
            return testFilter.some(function (filter) {
              return test.indexOf(filter) >= 0;
            });
          }).
          reduce(function (filteredModule, test) {
            filteredModule[test] = module[test];

            return filteredModule;
          }, {});
      }

      if (module && Object.keys(module).length > 0) {
        modulesToRun[name] = module;
      }
    });

  var runnerEmitter = runner(modulesToRun);
  [
    'moduleStart',
    'moduleDone',
    'testStart',
    'testReady',
    'testDone',
    'log',
    'done'
  ].forEach(function (event) {
    runnerEmitter.on(event, fire.bind(null, event));
  });
  require('./browser-display')(runnerEmitter, options, function () {
    console.log('display finished...');
  });
};
