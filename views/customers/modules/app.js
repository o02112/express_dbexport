import React from 'react';

var App = React.createClass({

    getInitialState: function(){
        return {
            result: {},
        };
    },

    componentDidMount: function(){
        this.loadData();
    },


    dataLoaded: function(data){
        this.setState({result: data});
    },

    loadData: function(){
        $.post(
            'get',
            {},
            this.dataLoaded
        );
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