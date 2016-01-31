// main.js
var React = require('react');
import $ from 'jquery';
import moment from 'moment';
import Chart from './chart';


const TEMP_BOUNDS_TOP = 400;
const TEMP_BOUNDS_BOTTOM = -100;

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
    handleUpdate(data){
        let readings = this.state.readings || [];
        readings.unshift(data);

        this.setState({
            readings:readings.filter((read)=>{
                return Number(read.temp) < TEMP_BOUNDS_TOP && Number(read.temp) > TEMP_BOUNDS_BOTTOM
            })
        })
    },
    componentDidMount(){

        $.get('/list-readings', (data)=>{
            this.setState({
                readings:data.readings.filter((read)=>{
                    return Number(read.temp) < TEMP_BOUNDS_TOP && Number(read.temp) > TEMP_BOUNDS_BOTTOM
                })
            });
        });

        window.socket.on('reading', this.handleUpdate);
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