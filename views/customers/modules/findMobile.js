import React from 'react';
import { Table } from 'reactable';

export default class FindMobile extends React.Component {

	constructor() {
		super();

		this.state = {
			data: []
		}
	}

	// handlerInput() {
	// 	
	// 	this.setState({mobile: mobile});
	// }

	handlerQuery() {
		let mobile = $.trim(this.refs.mobileInput.value);
		if(mobile.length > 0) {
			$.post(
				'/customers/findMobile',
				{ mobile: mobile },
				(data) => {
					this.setState({ data: data });
				}
			);
		} else {
			alert('请输入要查找的号码（允许不完整的手机号码）。')
		}
	}

	clearData() {
		this.refs.mobileInput.value = '';
		this.setState({data: []});
	}

	render() {
		return (
			<div>
        <div className="form-inline">
            <div className="form-group">
                <label htmlFor="mobile">输入查找号码</label>
                <input 
	                type="text" ref="mobileInput" maxLength="13"
                 	id="mobile" placeholder="手机号码" className="form-control" 
               	/>
            </div>
            
            &nbsp;<button onClick={this.handlerQuery.bind(this)} className="btn btn-primary">查找</button>
            &nbsp;<button onClick={this.clearData.bind(this)} className="btn btn-default">清空</button>
        </div>

        <Table className="table" 
            data={this.state.data}
            itemsPerPage={10} pageButtonLimit={10} 
            noDataText='<空>' 
            previousPageLabel='上一页' 
            nextPageLabel='下一页' 
        />
        &nbsp;
        <span>{ this.state.data.length ? '共 '+this.state.data.length+' 条记录' : '' }</span>

			</div>
		);
	}
}