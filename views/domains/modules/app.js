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

    handleAddDomain(domain){
        var component = this;
        // var domain = this.refs.createInput.value;
        $.post(
            './add',
            { domain },
             function(data){
                if(data === 'ok'){
                    component.state.domainList.push({url:domain});
                    component.setState({domainList:component.state.domainList })
                }
        });
    }

    render() {
        return (<div>
            <h1> domains app</h1>
            <AddDomain handleCreate={this.handleAddDomain.bind(this)} />

            <DomainList data={this.state.domainList} />

        </div>);
    }
}

export default App;