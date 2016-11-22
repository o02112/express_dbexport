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

		var html = [];
		var result = this.state.result;
		var headInner = [];

		for(var i=0; i<result.length; i++){
			// var name = result[i].name;
			// var mobile = result[i].mobile;
			// var referrer = result[i].referrer;
			// var category = result[i].category;
			// var url = result[i].url;
			// var id = result[i].id;
			var tmp=[];
			for ( var v in result[i]){
				if(i==0){
					headInner.push(<th>{v}</th>);
				}
				tmp.push(<td>{result[i][v]}</td>);
			}
			
			if(i==0){
				html.push(<tr>{headInner}</tr>);
			}
			html.push(<tr>{tmp}</tr>);
		}
		return (<table>
			{html}
		</table>);
	},


})

ReactDOM.render(<div>

Hello, React!!!!<br />
<App />


</div>, document.querySelector('#app'));

