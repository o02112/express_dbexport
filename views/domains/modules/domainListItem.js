import React from 'react';

export default class DomainListItem extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            domain: this.props.domain,
            isEditing: false
        };
    }

    // componentWillReceiveProps() {
    //     this.setState({ domain: this.props.domain })
    // }

    handleEdit(){
        this.setState({isEditing: true});
    }
    cancleEdit(){
        this.setState({isEditing: false});
    }

    updateDomain(e){
        e.preventDefault();

        var sendData = {
            id: this.props.itemId,
            domain: this.refs.domain.value,
            category: this.refs.category.value,
            seo_name: this.refs.seo_name.value
        };

        this.props.updateDomain(sendData);

        this.setState({ isEditing: false });

    }

    renderItem(){

        if(this.state.isEditing) {
            return (<tr>
                <td colSpan="4">
                    <form onSubmit={this.updateDomain.bind(this)}>
                        <input type="text" ref="domain" defaultValue={this.props.domain.domain} />
                        <input type="text" ref="category" defaultValue={this.props.domain.category} />
                        <input type="text" ref="seo_name" defaultValue={this.props.domain.seo_name} />
                        <button type="submit" className="btn btn-primary btn-flat">保存</button>
                        <button onClick={this.cancleEdit.bind(this)} className="btn btn-default btn-flat">取消</button>
                    </form>
                </td>
            </tr>)
        }

        return (
            <tr>
                <td>{this.props.domain.domain}</td>
                <td>{this.props.domain.category}</td>
                <td>{this.props.domain.seo_name}</td>
                <td>
                    <button 
                        onClick={this.handleEdit.bind(this)}
                        className="btn btn-warning btn-flat"
                    >编辑</button>
                    <button 
                        onClick={() => this.props.deleteDomain(this.props.itemId)}
                        className="btn btn-danger btn-flat"
                    >删除</button>
                </td>
            </tr>
        )
    }



    render (){
        return this.renderItem();
    }
}