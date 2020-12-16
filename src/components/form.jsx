import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
    return(<div>
        <form>
            <input type="text" placeholder={this.props.inputs} value={this.state.value} onChange={this.handleChange}/>
            <button onClick={()=>{this.props.callback(this.state.value)}} className="save">Save</button>
        </form>
    </div>)
    }
}

export default Form