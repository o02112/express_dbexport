import React from 'react';

import { DateField, TransitionView, Calendar, Footer} from 'react-date-picker';
import 'react-date-picker/index.css'

// import Message from './message';
import { Table } from 'reactable';
import ExportBtn from './exportBtn';
import TimeLine from './timeline';

let d = new Date(),
year = d.getFullYear(),
month = preZero(d.getMonth() +1, 2),
date = preZero(d.getDate(), 2),

defaultFilterFromDate = year+'-'+month+'-'+date+' 00:00:00',
defaultFilterToDate = year+'-'+month+'-'+date+' 23:59:59';

function preZero(num, len){
    num = num + '';
    if( num.length < len){
        var l = len - num.length,
        str = '';
        for(var i=0;i<l; i++){
            str += '0';
        }
        return ''+str+num;
    } else {
        return num;
    }
}

var App = React.createClass({

    getInitialState: function(){
        return {
            dataRows: [],
            dataRowsState: {
                includePhone: 0,
                exportFilter: {
                    fromDate: defaultFilterFromDate,
                    toDate: defaultFilterToDate,
                    domain: '',
                }
            },
            domainDropdown: []
            // urlTimeLineData: [],
        };
    },

    componentDidMount: function(){

        // 默认请求数据
        if( window.location.href.indexOf('phone') > 0 ){
            this.state.dataRowsState.includePhone = 1;
        }

        $.post( 
            '/customers/get', 
            //this.state.dataRowsState,
            {
                includePhone: this.state.dataRowsState.includePhone,
                fromDate: defaultFilterFromDate,
                toDate: defaultFilterToDate,
                domain: '',
            },
            (data)=> {
                this.setState({dataRows: data});
            }, 'json'
        );

        let html = [];
        $.post(
            '/domains/list',
            (data) => {
                if (data.length > 0) {
                    for (let i=0; i<data.length; i++) {
                        html.push(
                            <option key={i}>{data[i].domain}</option>
                        ); ///
                    }
                    
                    this.setState({ domainDropdown: html });
                }
            }
        );

    },


    render: function(){
        let i = 0;
        let data = this.state.dataRows;
        let len = data.length;

        if(len > 0){
            for(; i<len; ++i){

                if( !data[i]['来源地址']) { continue; } // ? 没有时，错误：data[i].***  is null 

                if(data[i]['来源地址'].indexOf('baidu.com') > 0){
                    data[i]['来源地址'] = '百度';
                } else if(data[i]['来源地址'].indexOf('so.com') > 0) {
                    data[i]['来源地址'] = '360搜索';
                } else if(data[i]['来源地址'].indexOf('sogou.com') > 0) {
                    data[i]['来源地址'] = '搜狗';
                }
            }
        }

        return (<div>


            <ExportBtn value='导出新数据' dataCate="new" queryData={this.state.dataRowsState} />
            <ExportBtn value='导出全部数据' dataCate="all" queryData={this.state.dataRowsState} />

            <br /><br />
        
        <div className="t-right">


            <DateField
                forceValidDate
                defaultValue={defaultFilterFromDate}
                updateOnDateClick={true}
                dateFormat="YYYY-MM-DD HH:mm:ss"
            >
                  <Calendar locale="zh-cn" weekStartDay={0}
                    clearButton={false}
                    weekNumbers={false} style={{padding: 10}}
                    onChange={
                        (dateString) => {
                            this.state.dataRowsState.exportFilter.fromDate = dateString;
                        }
                    }
                    />
            </DateField>

            &nbsp;~ &nbsp;

            <DateField
                forceValidDate
                defaultValue={defaultFilterToDate}
                updateOnDateClick={true}
                dateFormat="YYYY-MM-DD HH:mm:ss"
            >
                  <Calendar locale="zh-cn" weekStartDay={0}
                   clearButton={false}
                   weekNumbers={false} style={{padding: 10}} 
                    onChange={
                        (dateString) => {
                            this.state.dataRowsState.exportFilter.toDate = dateString;
                        }
                    }
                    />
            </DateField>

            &nbsp;
            
            <input list="domains" placeholder="地址（example.com）" className="input-text"
                onChange={(e)=>this.state.dataRowsState.exportFilter.domain = e.target.value} />
            <datalist id="domains">
              {this.state.domainDropdown}
            </datalist>

             &nbsp;

            <button onClick={this.doFilter} >筛选</button>
            &nbsp;
            <ExportBtn value='规则导出' dataCate="filter" queryData={this.state.dataRowsState} />

        </div>


            <Table className="table" 
                data={data}
                itemsPerPage={10} pageButtonLimit={10} 
                noDataText='无记录' 
                previousPageLabel='上一页' 
                nextPageLabel='下一页' 
            />
            &nbsp;
            <span>{ this.state.dataRows.length ? '共 '+this.state.dataRows.length+' 条记录' : '' }</span>

            <br /><br />


            <TimeLine data={this.state.urlTimeLineData} />

        </div>);
    },

    doFilter: function(){
        $.post(
            '/customers/get',
            {
                includePhone: this.state.dataRowsState.includePhone,
                fromDate: this.state.dataRowsState.exportFilter.fromDate,
                toDate: this.state.dataRowsState.exportFilter.toDate,
                domain: this.state.dataRowsState.exportFilter.domain,
            },
            (data)=>{
                this.setState({dataRows: data});
            }
        );
    },

});

module.exports = App;