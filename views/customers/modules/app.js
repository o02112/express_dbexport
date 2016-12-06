import React from 'react';
// import Message from './message';
import { Table } from 'reactable';

var App = React.createClass({

    getInitialState: function(){
        return {
            result: [],
        };
    },

    componentDidMount: function(){
        $.post(
            'get',
            {},
            this.dataLoaded
        );
    },

    dataLoaded: function(data){
        this.setState({result: data});
    },

    render: function(){
        let i = 0;
        let data = this.state.result;
        let len = data.length;
        // console.log(data);

        for(; i<len; ++i){
            if(data[i]['来源地址'].indexOf('baidu.com') > 0){
                data[i]['来源地址'] = '百度';
            } else if(data[i]['来源地址'].indexOf('so.com') > 0) {
                data[i]['来源地址'] = '360搜索';
            } else if(data[i]['来源地址'].indexOf('sogou.com') > 0) {
                data[i]['来源地址'] = '搜狗';
            }
        }

        return (<Table className="table" 
            data={data}
            itemsPerPage={10} pageButtonLimit={8} 
            filterable={['名称', '电话', '时间', '分类', '动作', '地址', '来源地址']}
            sortable={['序号', '时间', '地址']}
            noDataText="无记录"
            previousPageLabel="上一页"
            nextPageLabel="下一页"
        />);
    },

});

module.exports = App;