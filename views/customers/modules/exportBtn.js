import React from 'react';

class ExportBtn extends React.Component {

    render(){
        return (<button onClick={this.exportResource.bind(this)}>{this.props.value}</button>); // /
    }

    exportResource(){
        
        let queryData = this.props.queryData,
            dataCate = this.props.dataCate,
            includePhone = queryData.includePhone;

        $.post(
            'exportResource',
            { 
                dataCate: dataCate , 
                includePhone: includePhone,
                fromDate: queryData.exportFilter.fromDate,
                toDate: queryData.exportFilter.toDate
            },
            (data) => {
                if(data.code == 0){
                    alert('没有新记录。');
                } else {
                    this.exportData(data);

                    // 导出新数据后标记为旧数据
                    if(this.props.dataCate === 'new') this.markOld();
                }
            }
        );
    }

    exportData(data){
        var data = encodeURIComponent(data),
        dateStr = '',
        date = new Date(),
        hours =  date.getHours() + 8;
        date.setHours(hours);
        dateStr = date.toJSON();

        var a = document.createElement('a');
        a.download = this.props.dataCate+'Resource-'+dateStr+'.csv';
        a.href = "data:text/csv;charset=utf-8,"+data;
        document.body.append(a);
        a.click();
        a.remove();
    }

    markOld(){
        $.post('markOld', function(data){
            if(data.code == 1){
                // 标记为旧成功。
                location.reload();
            } else {
                // 标记旧记录数为0。
            }
        })
    }
};

module.exports = ExportBtn;