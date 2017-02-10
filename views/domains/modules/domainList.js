import React from 'react';
import DomainListItem from './domainListItem';

class DomainList extends React.Component {


    renderItems(){
        let html = [];
        let domains = this.props.domains;
        let itemId = '';

        for(let i=0;i<domains.length; i++){
            itemId =  domains[i].id;

            html.push(<DomainListItem 
                key={i} 
                deleteDomain={this.props.deleteDomain} 
                updateDomain={this.props.updateDomain} 
                domain={domains[i]}
                itemId={itemId} 
            />); ///
        }
        return html;
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>域名</th>
                        <th>分类</th>
                        <th>搜索引擎</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderItems()}
                </tbody>
            </table>
        )
    }
}

export default DomainList;