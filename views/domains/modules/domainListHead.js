import React from 'react';

export default class DomainListHead extends React.Component {

    render() {
        return (
            <thead>
                <tr>
                    <th>域名</th>
                    <th>分类</th>
                    <th>搜索引擎</th>
                    <th>操作</th>
                </tr>
            </thead>
        )
    }
}
