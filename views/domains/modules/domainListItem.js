import React from 'react';

export default class DomainListItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: props.domain,
            isEditing: false
        };
    }

    handleEdit(){
        this.state.isEditing = true;
        this.setState(this.state);
    }

    handleDelete(){
        var _this = this;
        $.post(
            './delete',
            {id: this.state.data.id },
            function(data){
                if(data === 'deleted'){
                    _this.props.rerender(this.state.data.id);
                }

            }
        );
    }

    saveDomain(e){
        e.preventDefault();

        var sendData = {
            id: this.refs.id.value,
            domain: this.refs.domain.value,
            category: this.refs.category.value,
            seo_name: this.refs.seo_name.value
        };
        var _this = this;

        $.post(
            './update',
            sendData,
            function(data){
                if(data === 'updated'){
                    this.state.data = sendData;
                    this.state.isEditing = false;
                    this.setState(this.state);
                }
            }.bind(this)
        );
    }

    renderItem(){

        if(this.state.isEditing) {
            return (<tr>
                <td colSpan="4">
                    <form onSubmit={this.saveDomain.bind(this)}>
                        <input type="hidden" ref="id" defaultValue={this.state.data.id} />
                        <input type="text" ref="domain" defaultValue={this.state.data.domain} />
                        <input type="text" ref="category" defaultValue={this.state.data.category} />
                        <input type="text" ref="seo_name" defaultValue={this.state.data.seo_name} />
                        <button type="submit">保存</button>
                        <button>取消</button>
                    </form>
                </td>
            </tr>)
        }

        return (
            <tr>
                <td>{this.state.data.domain}</td>
                <td>{this.state.data.category}</td>
                <td>{this.state.data.seo_name}</td>
                <td>
                    <button onClick={this.handleEdit.bind(this)}>编辑</button>
                    <button onClick={this.handleDelete.bind(this)}>删除</button>
                </td>
            </tr>
        )
    }



    render (){
        return this.renderItem();
    }
}