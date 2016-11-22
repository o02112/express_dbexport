import React from 'react';
import ReactDOM from 'react-dom';

var App = React.createClass({

	getInitialState: function(){
		return {
			result: {},
		};
	},

	componentDidMount: function(){
		$.post(
			'http://localhost:3000/get',
			{},
			this.dataLoaded
		);
	},


	dataLoaded: function(data){
		// console.log(data);return;
		this.setState({result: data});
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
				j++;
				if(i==0){
					headInner.push(<th>{v}</th>);
				}
				tmp.push(<td title={result[i][v]}>{result[i][v]}</td>);
			}
			
			if(i==0){
				thead.push(<thead><tr>{headInner}</tr></thead>);
			}
			tbody.push(<tr>{tmp}</tr>);
		}
		tbody = <tbody>{tbody}</tbody>;
		return (<table>{thead}{tbody}</table>);
	},

})

ReactDOM.render(<div>
	Hello, React!!!!<br />
	<App />
</div>, document.querySelector('#app'));

