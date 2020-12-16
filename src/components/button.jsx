import React from 'react';

class Button extends React.Component {
    render() {
    return <button onClick={()=>{if(this.props.next){this.props.function().then(()=>this.props.next())}else{this.props.function()}}}>{ this.props.name }</button>
    }
}

export default Button