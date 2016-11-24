import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/app';
import ExportBtn from './modules/exportBtn';

ReactDOM.render(<div>
    <ExportBtn value="导出新数据" dataCate='new' />
    <ExportBtn value="导出全部数据" dataCate='all' />
    <br /><br />
	<App />
</div>, document.querySelector('#app'));

