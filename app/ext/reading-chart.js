// d3Chart.js
import d3 from 'd3';

let d3Chart = {};

d3Chart.create = function(el, data){
    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;


    // Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

// Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(new Date(d.x).getTime()); })
        .y(function(d) { return y(d.y); });

    // Adds the svg canvas
    var svg = d3.select(el)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Get the data
    svg.data(data).enter();

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return new Date(d.x).getTime(); }));
        y.domain([0, d3.max(data, function(d) { return d.y; })]);

        // Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data));

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);


};

d3Chart.update = function (el, data) {

    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;


    // Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);


    // Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(new Date(d.x).getTime()); })
        .y(function(d) { return y(d.y); });

    var svg = d3.select(el).select('svg');
    svg.data(data).enter();

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return new Date(d.x).getTime(); }));
    y.domain([0, d3.max(data, function(d) { return d.y; })]);

    // Add the valueline path.
    svg.select("path")
        .attr("d", valueline(data));



}


export default d3Chart;