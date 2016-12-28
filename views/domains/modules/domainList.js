import React from 'react';
import DomainListHead from './domainListHead';
import DomainListItem from './domainListItem';

class DomainList extends React.Component {

    componentWillReceiveProps(){
        this.render();
    }

    rerender(id){
        var domains = this.props.domains;
        for(var i=0;i<domains.length; i++){
            
        }
    }

    renderItems(){
        var html = [];
        var domains = this.props.domains;
        for(var i=0;i<domains.length; i++){
            html.push(<DomainListItem key={i} domain={domains[i]} rerender={this.rerender} />);
        }
        return html;
    }

    render() {
        return (
            <table>
                <DomainListHead />
                <tbody>
                    {this.renderItems()}
                </tbody>
            </table>
        )
    }
}

export default DomainList;