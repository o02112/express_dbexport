import React from 'react';
import Message from './message';

var App = React.createClass({

    getInitialState: function(){
        return {
            result: {},
            looping: {},

        };
    },

    componentDidMount: function(){
        this.loadData();
    },

    loopingFn: function(){
        let thisComponent = this;
        $.post(
            'looping',
            {},
            function(data){
                if(data.code==1){
                    console.log('looping stoped');
                    Message.show('top', '有新资源。', 'info', '/', -1);
                } else {
                    console.info('looping');
                    setTimeout(thisComponent.loopingFn, 5000);
                }
            }
        );
    },

    loadData: function(){
        $.post(
            'get',
            {},
            this.dataLoaded
        );
    },

    dataLoaded: function(data){
        this.setState({result: data});
        this.loopingFn();
        // Message.show('top', '如有新资源，这里将会自动产生新消息提示您。', 'info', '', 3000)
    },


    render: function(){

        var html = [],
        result = this.state.result,
        headInner = [],
        tbody = [],
        thead = [];

        for(var i=0, j=0; i<result.length; i++){
            var tmp=[];
            for ( var v in result[i]){
                if(v == 'is_new') continue;
                j++;
                if(i==0){
                    headInner.push(<th>{v}</th>);
                }
                tmp.push(<td title={result[i][v]}>{result[i][v]}</td>);
            }
            
            if(i==0){
                thead.push(<thead><tr>{headInner}</tr></thead>);
            }

            if(result[i].is_new.data[0] == 1){
                tbody.push(<tr className="isnew">{tmp}</tr>);
            } else {
                tbody.push(<tr>{tmp}</tr>);
            }
        }
        tbody = <tbody>{tbody}</tbody>;
        return (<table>{thead}{tbody}</table>);
    },

});

module.exports = App;