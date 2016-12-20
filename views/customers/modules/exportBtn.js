import React from 'react';

var ExportBtn = React.createClass({

    render: function(){
        return (<button onClick={()=>this.exportResource(this.props.dataCate)}>{this.props.value}</button>);
    },

    exportResource: function(dataCate){
        var dataCate = this.props.dataCate;
        var thisComponent = this;
        var m = 1;
        if(window.location.href.indexOf('view') > 0){
            m = 0;
        }
        $.post(
            'exportResource',
            { dataCate: dataCate , m: m},
            function(data){
                if(data.code == 0){
                    alert('没有新记录。');
                } else {
                    var data = encodeURIComponent(data),
                    dateStr = '',
                    date = new Date(),
                    hours =  date.getHours() + 8;
                    date.setHours(hours);
                    dateStr = date.toJSON();

                    var a = document.createElement('a');
                    a.download = dataCate+'Resource-'+dateStr+'.csv';
                    a.href = "data:text/csv;charset=utf-8,"+data;
                    document.body.append(a);
                    a.click();
                    a.remove();

                    // 导出新数据后标记为旧数据
                    if(dataCate == 'new') thisComponent.markOld();
                }
            }
        );
    },

    markOld: function(){
        $.post('markOld', function(data){
            if(data.code == 1){
                // 标记为旧成功。
                location.reload();
            } else {
                // 标记记录数为0。
            }
        })
    }
});

module.exports = ExportBtn;