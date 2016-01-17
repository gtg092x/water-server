// main.js
var React = require('react');


var App = React.createClass({
    render: function() {
        return (
            <div className="app">
                {/* this will be either <Users> or <Groups> */}
                {this.props.children}
            </div>
        );
    }
});

export default App;