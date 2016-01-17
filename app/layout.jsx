import React from 'react';
import Routes from './routes'

var Layout = React.createClass({
    render: function() {
        return (
            <html>
                <head>
                    <title>App</title>
                </head>
                <body>
                {this.props.app}
                </body>
            </html>
        );
    }
});

export default Layout;