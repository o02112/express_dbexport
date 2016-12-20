import React from 'react';

class AddDomain extends React.Component {

    constructor (){
        super();
        
    }

    handleCreate(e){
        e.preventDefault();
        var domain = this.refs.createInput.value;
        this.props.handleCreate(domain);
        // console.log(this.refs.createInput.value);
    }

    render() {
        return (<div>

<form onSubmit={this.handleCreate.bind(this)} id="addDomainForm">
    <input type="text" placeholder="http://www.baidu.com/" ref="createInput" />
    <input type="submit" value="添加" />
</form>

        </div>)
    }
}

export default AddDomain;