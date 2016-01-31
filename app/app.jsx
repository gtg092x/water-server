// main.js
var React = require('react');
import Nav from './components/nav'
import io from 'socket.io-client'

var App = React.createClass({
    componentWillMount(){
        if (typeof window !== 'undefined') {
            window.socket = io();
        }
    },
    render: function() {
        return (
            <div className="app">
                <Nav />
                <div className='main'>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default App;