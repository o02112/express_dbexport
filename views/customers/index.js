import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/app';


if(getParameter('q') == '/customers/datatable') {
	var eleId = 'customers-table';
} else {
	var eleId = 'customers-table-phone';
}

ReactDOM.render(<App />, document.getElementById(eleId));


// https://github.com/ryanburgess/get-parameter/blob/master/index.js
function getParameter(name){
  'use strict';
  var queryDict = {};
  var queries = location.hash.substr(1).split('&'); // search -> hash
  for (var i=0; i<queries.length; i++) {
    queryDict[queries[i].split('=')[0]] = decodeURIComponent(queries[i].split('=')[1]);
  } 

  // if name specified, return that specific get parameter
  if (name) {
    return queryDict.hasOwnProperty(name) ? decodeURIComponent(queryDict[name].replace(/\+/g, ' ')) : '';
  }

  return queryDict;
};
