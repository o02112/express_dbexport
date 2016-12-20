import React from 'react';

class DomainList extends React.Component {

    componentWillReceiveProps(){
        this.render();
    }

    render() {
        var html = [];
        var domainList = this.props.data;

        for(var i=0;i<domainList.length; i++){
            html.push(<li>{domainList[i].url}</li>);
        }
        return (<ul>{html}</ul>)
    }
}

export default DomainList;