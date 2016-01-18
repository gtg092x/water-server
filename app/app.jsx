// main.js
var React = require('react');
import Nav from './components/nav'

var App = React.createClass({
    render: function() {
        return (
            <div className="app">
                <Nav />
                <div className='main'>
                    {/* this will be either <Users> or <Groups> */}
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default App;