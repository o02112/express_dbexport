import React from 'react';

require('../../../public/stylesheets/message.css');

var message = {};

message.show = function (position, text, type, link, time){
    let messageEm = document.querySelector('#message-em');
    if(!messageEm){
        messageEm = document.createElement('div');
        messageEm.id = 'message-em';

        document.body.appendChild(messageEm);
    }


    let em = document.createElement('div');
    let p = document.createElement('p');
    let icon = document.createElement('div');

    icon.className = 'alert-circle icon';
    em.appendChild(icon);

    em.className='message-box message-'+position+' message-'+type;

    em.appendChild(p);
    p.innerText = text;

    if(time != -1){
        setTimeout(function(){
            em.remove();
        }, time);
    }

    em.addEventListener('click', function(){
        this.remove();
    })

    messageEm.appendChild(em);
}

module.exports = message;