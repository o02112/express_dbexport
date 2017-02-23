import React from 'react';
import ReactDOM from 'react-dom';

import { DateField, TransitionView, Calendar, Footer} from 'react-date-picker';
import 'react-date-picker/index.css'

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
class DropdownDate extends React.Component {

	render() {
		return (
			<div>

        <DateField
        	style={{width: "50%"}}
          forceValidDate
          defaultValue={defaultFilterFromDate}
          updateOnDateClick={true}
          dateFormat="YYYY-MM-DD HH:mm:ss"
        >
          <Calendar locale="zh-cn" weekStartDay={0}
            clearButton={false}
            weekNumbers={false} style={{padding: 10}}
            />
        </DateField>

        <DateField
        	style={{width: "50%"}}
          forceValidDate
          defaultValue={defaultFilterToDate}
          updateOnDateClick={true}
          dateFormat="YYYY-MM-DD HH:mm:ss"
        >
          <Calendar locale="zh-cn" weekStartDay={0}
            clearButton={false}
            weekNumbers={false} style={{padding: 10}}
            />
        </DateField>

			</div>
		);
	}
}

ReactDOM.render(
	<DropdownDate />,
	document.getElementById('dropdown-date')
);