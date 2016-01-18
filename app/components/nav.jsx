import React from 'react'
import {Link} from 'react-router'

let Nav = React.createClass({
    render(){
        return (
            <nav>
                <Link to={`/`}>Home</Link>
                <Link to={`/about`}>About</Link>
            </nav>
        );
    }
});

export default Nav;