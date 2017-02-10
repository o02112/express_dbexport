import React from 'react';
import AddDomain from './addDomain';
import DomainList from './domainList';

class App extends React.Component{

    constructor(){
        super();

        this.state = {
            domainList: []
        };
    }

    componentDidMount(){
        this.refresh();
    }

    refresh() {
        $.post('/domains/list', (data)=>{

            if(data.length > 0){
                this.setState({domainList: data});
            }
        });
    }

    createDomain(domain, category, seo_name){
        let newDomainObj = { domain, category, seo_name };
        $.post(
            '/domains/add',
            newDomainObj,
             (data)=>{
                if(data.affectedRows === 1){

                     // 必须将最后插入的ID返回，传递给新组件，用于组件的后续操作（更新、删除等）
                    newDomainObj.id = data.insertId;
                    let dl = this.state.domainList;
                    dl.push(newDomainObj);

                    this.setState({ domainList: dl });
                }
        });
    }

    deleteDomain(itemId) {
        $.post(
            '/domains/delete',
            {id: itemId },
            (data) => {
                if(data === 'deleted'){
                    let domains = this.state.domainList;

                    for (let i=0; i<domains.length; i++) {
                        if ( domains[i].id === itemId ) {
                            domains.splice(i, 1);

                            this.setState({ domainList: domains });
                            return;
                        }
                    }
                }
            }
        );
    }

    updateDomain(sendData) {

        $.post(
            '/domains/update',
            sendData,
            (data) => {
                if(data === 'updated'){
                    this.refresh();
                }
            }
        );

    }

    render() {
        return (<div>
            <AddDomain handleCreate={this.createDomain.bind(this)} />
            <DomainList 
                domains={this.state.domainList}
                deleteDomain={this.deleteDomain.bind(this)} 
                updateDomain={this.updateDomain.bind(this)} 
            />
        </div>); ///
    }

}

export default App;