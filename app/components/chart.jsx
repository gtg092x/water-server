// main.js
var d3Chart = require('../ext/reading-chart');
import React from 'react';
import $ from 'jquery';

var Chart = React.createClass({
    propTypes: {
        data: React.PropTypes.array,
        domain: React.PropTypes.object
    },
    componentDidMount: function() {
        var el = this.getDOMNode();
        d3Chart.create(el, this.getChartState().data);
    },
    componentDidUpdate: function() {
        var el = this.getDOMNode();

        $(el).empty();
        d3Chart.create(el, this.getChartState().data);

    },

    getChartState: function() {
        return {
            data: this.props.data,
            domain: this.props.domain
        };
    },

    componentWillUnmount: function() {
        var el = this.getDOMNode();
        //d3Chart.destroy(el);
    },

    render: function() {
        return (
            <div className="Chart"></div>
        );
    }
});

export default Chart;