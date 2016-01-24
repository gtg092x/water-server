import React from 'react';
import Routes from './routes'

var Layout = React.createClass({
    render: function() {
        let scriptPath = (this.props.bundleServer || '/') + 'bundle.js';
        let style = '<style>body { font: 12px Arial;}path {stroke: steelblue;stroke-width: 2;fill: none;}.axis path,.axis line {fill: none;stroke: grey;stroke-width: 1;shape-rendering: crispEdges;}</style>';
        return (
            <html>
                <head>
                    <title>App</title>
                    <style dangerouslySetInnerHTML={{__html:style}}></style>
                </head>
                <body style={{padding:0,margin:0}}>
                <div id='layout' dangerouslySetInnerHTML={{__html:this.props.app}}>
                </div>
                <script src={scriptPath}></script>
                </body>
            </html>
        );
    }
});

export default Layout;