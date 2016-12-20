import React from 'react';

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

// let MONTHS = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];


let timeLine = React.createClass({

    getInitialState: function(){
        return {
            data: []
        }
    },

    componentDidMount: function(){
        
    },

    componentWillReceiveProps: function(nextProps){
        let data = nextProps.data || [];
        let i=0,len=data.length;
        let url, label, total;

        this.setState({data: data});

        for(; i<len; ++i){
            url = data[i]['地址'];
            label = data[i]['日期'];
            total = data[i]['总计'];

        }

    },

    render: function(){
        return (
            <LineChart width={600} height={300} data={this.state.data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
               <XAxis dataKey="日期"/>
               <YAxis dataKey="总计" />
               <CartesianGrid strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend />
               <Line type="monotone" dataKey="地址" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        );
    }
});

module.exports = timeLine;