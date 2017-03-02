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

    // $(window).on('hashchange', hashHandle);
    $(".sidebar-menu li a").click(function() {
        hashHandle($(this).attr('href').replace('#q=', ''));
    })

    hashHandle();

    function hashHandle(href){

        // var href = $this.attr('data-href');
        // var href = getParameter('q') || '/dashboard';
        href = href || '/dashboard';


        // 若 页面打开过，做切换 不做请求
        var hrefWords = href.replace(/\//g, '');
        hrefWords += '-page';

        var ele = $('#'+hrefWords);

        if(ele.length > 0) {
            switchPage(ele);
        } else {
            $('#main-content').children().hide();
            $('#main-content').append('<div id="'+hrefWords+'"><br />加载中... </div>')
            
            loadPage(href, hrefWords);
        }


        // 导航 样式 开关
        $('.sidebar-menu li a').each(function(){
            if( $(this).attr('href') === '#q=' + href ){
                $(this).parent().addClass('active');
                updatePageTitle($(this).text());
            } else {
                $(this).parent().removeClass('active');
            }
        });


    };

    function switchPage(ele) {
        ele.show().siblings().hide();
    }

    function loadPage(href, hrefWords){

        // 登录过时处理
        $.post('/getLoginStatus', function(data){
            if(data.code === '1') {
                doRequest(href); // 请求页面
            } else {
                window.location.href='/users/login'+location.hash;
                return;
            }
        });

        function doRequest(href) {
            $.ajax(
                href,
                {
                    type: 'GET',
                    statusCode: {
                        404: function() {
                            updatePageTitle(404);
                            $('#'+ hrefWords).html('未找到页面。');
                        }
                    },
                    success: function(data){
                        $('#' + hrefWords).html(data);
                    }
                }
            );
        }

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