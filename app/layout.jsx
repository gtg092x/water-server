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
                <div id='layout' dangerouslySetInnerHTML={{__html:this.props.app}}>
                </div>
                <script src='/bundle.js'></script>
                </body>
            </html>
        );
    }
});

export default Layout;