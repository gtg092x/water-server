// main.js
var React = require('react');
import $ from 'jquery';
import moment from 'moment';
import Chart from './chart';


const TEMP_BOUNDS_TOP = 400;
const TEMP_BOUNDS_BOTTOM = -100;

var Index = React.createClass({
    checkPhone(event){
        const {value} = event.target;

        const valid = /[0-9]{10}/.test(value.replace(/[^0-9]+/g,''));
        this.setState({
            phone: value.replace(/^[0-9]]/g,''),
            valid
        });
        if (valid) {
            const {onPhone} = this.props;
            onPhone(value);
        }
    },
    getInitialState(){
      return {
        maxTemp:110
      };
    },
    checkTemp(event){
        const {value} = event.target;

        this.setState({
            maxTemp: value
        });

        const {onMax} = this.props;
        onMax(Number(value));

    },
    render: function() {
        let data = this.props.readings.map((reading)=> {
            return {y:reading.temp,x:reading.createdAt};
        });
        const {valid, maxTemp, phone} = this.state;
        const stateCheck = valid ? <strong>{'\u2713'}</strong> : null;
        return (
            <div className="index">
                <h1>App</h1>
                <Chart data={data} />
                <form action="#" style={{padding:'10px'}}>
                    <label>
                        <i style={{display:'block'}}>Enter your phone to monitor water readings</i>
                    <input name="phone"  value={phone} onChange={this.checkPhone} type="number" />
                        {stateCheck}
                    </label>
                    <label>
                        <i style={{display:'block'}}>Max Temp to monitor</i>
                        <input name="phone" value={maxTemp} onChange={this.checkTemp} type="number" />
                    </label>
                </form>
            </div>
        );
    }
});



var IndexWrapped = React.createClass({
    getInitialState(){
        return {readings:false, max:110, phone:null};
    },
    fireAlarm({phone,max}){
        const {cooldown} = this.state;
        if(!cooldown) {
            $.post('/alarm', {phone,max});
            this.setState({
                cooldown: true
            });
            setTimeout(()=>{
                this.setState({
                    cooldown:false
                });
            },15 * 1000);
        }

    },
    handleUpdate(data){
        let readings = this.state.readings || [];
        readings.unshift(data);

        const {phone,max} = this.state;

        if (phone && max && readings.filter(read=> read.temp > max).length) {
            this.fireAlarm({phone, max});
        }

        this.setState({
            readings:readings.filter((read)=>{
                return Number(read.temp) < TEMP_BOUNDS_TOP && Number(read.temp) > TEMP_BOUNDS_BOTTOM
            })
        })
    },
    maxUpdate(max){
        this.setState({
            max:max
        });
    },
    phoneUpdate(phone){
        this.setState({
            phone
        });
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
            return <Index readings={this.state.readings} onMax={this.maxUpdate} onPhone={this.phoneUpdate} {...this.props} />
        } else {
            return (<span>Loading...</span>);
        }

    }
});

export default IndexWrapped;