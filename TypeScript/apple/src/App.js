"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
require("./App.css");
var a = <div></div>;
function App() {
    var _a = (0, react_1.useState)('kim'), user = _a[0], setUser = _a[1];
    return (<div>
      <h4>hello</h4>
      <Profile name="철수"></Profile>
    </div>);
}
function Profile(props) {
    return (<div>{props.name}</div>);
}
exports.default = App;
