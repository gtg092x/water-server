// main.js
var React = require('react');
import $ from 'jquery';
import moment from 'moment';
var Index = React.createClass({
    render: function() {

        return (
            <div className="index">
                <h1>App</h1>
                <ul>
                    {this.props.readings.map((reading)=>{

                        var date = moment(reading.createdAt).fromNow();
                        return (<li key={reading.id}>{date}: {reading.temp} degrees</li>);
                    })}
                </ul>
            </div>
        );
    }
});



var IndexWrapped = React.createClass({
    getInitialState(){
        return {readings:false};
    },
    componentDidMount(){
        $.get('/list-readings', (data)=>{
            this.setState({
                readings:data.readings
            })
        });
    },
    render(){
        if(this.state.readings) {
            return <Index readings={this.state.readings} {...this.props} />
        } else {
            return (<span>Loading...</span>);
        }

    }
});

export default IndexWrapped;