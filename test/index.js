"use strict";

require("./newapi1/basics.js");
require("./newapi1/encoding.js");
require("./newapi1/fragment.js");
require("./newapi1/from-file.js");
require("./newapi1/from-url.js");
require("./newapi1/methods.js");
require("./newapi1/options.js");
require("./newapi1/virtual-console.js");

require("./jsdom/cancel-requests.js");
require("./jsdom/cookie.js");
require("./jsdom/env.js");
require("./jsdom/inside-worker-smoke-tests.js");
require("./jsdom/keep-alive-connections.js");
require("./jsdom/named-properties-tracker.js");
require("./jsdom/resource-loading.js");
require("./jsdom/utils.js");

require("./to-port-to-wpts/css.js");
require("./to-port-to-wpts/jsonp.js");
require("./to-port-to-wpts/misc.js");
require("./to-port-to-wpts/misc2.js");
require("./to-port-to-wpts/namespaces.js");
require("./to-port-to-wpts/parsing.js");
require("./to-port-to-wpts/selectors.js");
require("./to-port-to-wpts/serialization.js");
require("./to-port-to-wpts/xml.js");

require("./to-port-to-wpts/level1/core.js");
require("./to-port-to-wpts/level1/html.js");

require("./web-platform-tests/to-upstream.js");
// keep this one last so that you can cancel the test run early
require("./web-platform-tests/index.js");
