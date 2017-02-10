import React from 'react';

class AddDomain extends React.Component {

    handleCreate(e){
        e.preventDefault();

        var domain = this.refs.domainInput;
        var category = this.refs.categoryInput;
        var seoName = this.refs.seoInput;
        this.props.handleCreate(domain.value, category.value, seoName.value);

        domain.value = category.value = seoName.value = '';
    }

    render() {
        return (<div>

<form onSubmit={this.handleCreate.bind(this)} id="addDomainForm">
    <div className="row">
        <div className="col-xs-3">
            <input type="text" placeholder="gjs.zctltz.com" ref="domainInput" className="form-control" />
        </div>
        <div className="col-xs-2">
            <input type="text" placeholder="分类：贵金属" ref="categoryInput" className="form-control" />
        </div>
        <div className="col-xs-2">
            <input type="text" placeholder="搜索引擎名称" ref="seoInput" className="form-control" />
        </div>
        <input type="submit" value="添加" className="btn btn-default btn-flat" />
    </div>
</form>

        </div>)
    }
}

export default AddDomain;