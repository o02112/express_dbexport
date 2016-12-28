import React from 'react';
import ReactDOM from 'react-dom';
import { DateField, TransitionView, Calendar, Footer} from 'react-date-picker';
import 'react-date-picker/index.css'

let d = new Date(),
year = d.getFullYear(),
month = d.getMonth() + 1,
date = d.getDate();


// 汉化修改 @author ztramp@163.com
ReactDOM.render(
    <div>
        <DateField
            forceValidDate
            defaultValue={year+'-'+month+'-'+date+' 00:00:00'}
            dateFormat="YYYY-MM-DD HH:mm:ss"
        >
            <TransitionView>
              <Calendar
                locale="zh-cn" weekStartDay={0}
                weekNumbers={false} style={{padding: 10}} />
            </TransitionView>
        </DateField>
         ~ 
        <DateField
            forceValidDate
            defaultValue={year+'-'+month+'-'+date+' 23:59:59'}
            dateFormat="YYYY-MM-DD HH:mm:ss"
        >
            <TransitionView>
              <Calendar
                locale="zh-cn" weekStartDay={0}
                weekNumbers={false} style={{padding: 10}} />
            </TransitionView>
        </DateField>
    </div>
    , 
    document.getElementById('app')
);

