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


$(function(){

    $(window).on('hashchange', hashHandle);

    hashHandle();

    function hashHandle(){

        // var href = $this.attr('data-href');
        var href = getParameter('q') || '/dashboard';
        var title;

        $('.sidebar-menu li a').each(function(){

            if( $(this).attr('href') === '#q=' + href ){
                $(this).parent().addClass('active');
                title = $(this).text();
            } else {
                $(this).parent().removeClass('active');
            }
        });


        // 登录过时处理
        $.post('/getLoginStatus', function(data){

            if(data.code === '1') {
                loadPage(href,title);
            } else {
                window.location.href='/users/login'+location.hash;
                return;
            }
        });
    };

    function loadPage(href, title){
        $.ajax(
            href,
            {
                type: 'GET',
                statusCode: {
                    404: function() {
                        updatePageTitle(404);
                        $('#main-content').html('未找到页面。')
                    }
                },
                success: function(data){
                    updatePageTitle(title);
                    $('#main-content').html(data);
                }
            }
        );
    };

    function updatePageTitle(pageTitle){
        
        pageTitle = pageTitle || '管理后台';

        $('.content-header h1').text(pageTitle);
        $('.breadcrumb .active').text(pageTitle);
        $('title').text('智成天朗 | '+pageTitle);
    }


    // 用户登录设置cookie
    var username = getCookie('username');
    $('.the-username').text(username);

    function getCookie(cookieKey){
        var cookieValue = '';  
        var cookieAry = document.cookie.split("; "); // 所有Cookie  
        for(var i=0;i<cookieAry.length;i++){  
            var temp = cookieAry[i].split("=");  
            if(temp[0] == cookieKey){  
                 cookieValue = unescape(temp[1]);  
            }  
        }  
        return cookieValue;  
    }


});