import React from 'react';
import ReactDOM from 'react-dom';
import FindMobile from './modules/findMobile';

let findMobileNode = document.getElementById('find-mobile');
if(findMobileNode) {
	ReactDOM.render(<FindMobile />, findMobileNode);
}