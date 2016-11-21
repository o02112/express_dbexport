import React from 'react';
import ReactDOM from 'react-dom';

var App = React.createClass({

	getInitialState: function(){
		return {
			list: {},
		};
	},

	componentDidMount: function(){
		// console.log('mount did......!');

		$.post(
			'http://localhost:3000/customers/get',
			{},
			this.dataLoaded
		);
	},


	dataLoaded: function(data){
		this.setState({list: data});
	},

	render: function(){

		var html = [];

		for(var i=0; i<this.state.list.length; i++){
			var title = this.state.list[i].title;
			var slug = this.state.list[i].slug;
			var text = this.state.list[i].text;
			var id = this.state.list[i].id;
			html.push(<li key={id}>
				<h3>{title}</h3>
				<p>{slug}</p>
				<p>{text}</p>
				</li>);
		}
		return (<p>
			{html}
		</p>);
	},


})

ReactDOM.render(<h1>

Hello, React!!!!<br />
<App />


</h1>, document.querySelector('#app'));

