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
        $.post('/domains/list', function(data){
            if(data.length > 0){
                this.setState({domainList: data})
            }
        }.bind(this));
    }



    render() {
        return (<div>
            <h1> domains app</h1>
            <AddDomain handleCreate={this.createDomain.bind(this)} />

            <DomainList domains={this.state.domainList} />

        </div>);
    }

    createDomain(domain, category, seo_name){
        var component = this;
        // var domain = this.refs.createInput.value;
        $.post(
            '/domains/add',
            { domain: domain, category: category, seo_name: seo_name },
             function(data){
                if(data.affectedRows === 1){
                    component.state.domainList.push({domain:domain, category: category, seo_name: seo_name});
                    component.setState({domainList:component.state.domainList })
                }
        });
    }

    saveDomain(){
    }

    deleteDomain(){

    }

}

export default App;