// main.js
var React = require('react');
import $ from 'jquery';
import moment from 'moment';
import Chart from './chart';
var Index = React.createClass({
    render: function() {
        let data = this.props.readings.map((reading)=> {
            return {y:reading.temp,x:reading.createdAt};
        });
        return (
            <div className="index">
                <h1>App</h1>
                <Chart data={data} />
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