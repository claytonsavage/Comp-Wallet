import React from 'react';


class Background extends React.Component {
    render() {
        return (<div><div className="background">
            <div className="left"></div>
            <div className="right">
                <div className="strip-bottom bg"></div>
                <div className="strip-top bg"></div>
            </div>
        </div></div>)
    }
}

export default Background
