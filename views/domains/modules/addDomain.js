import React from 'react';

class AddDomain extends React.Component {

    constructor (){
        super();
        
    }

    handleCreate(e){
        e.preventDefault();
        var domain = this.refs.domainInput;
        var category = this.refs.categoryInput;
        var seoName = this.refs.seoInput;
        this.props.handleCreate(domain.value, category.value, seoName.value);

        domain.value = 
        category.value = 
        seoName.value = '';

        // console.log(this.refs.createInput.value);
    }

    render() {
        return (<div>

<form onSubmit={this.handleCreate.bind(this)} id="addDomainForm">
    <input type="text" placeholder="http://www.example.com/" ref="domainInput" />
    <input type="text" placeholder="分类：贵金属" ref="categoryInput" />
    <input type="text" placeholder="搜索引擎名称" ref="seoInput" />
    <input type="submit" value="添加" />
</form>

        </div>)
    }
}

export default AddDomain;