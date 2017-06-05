$(function(){

    var nowpage = 1;
    $('#cate').on('change', function(){
        var cate = $(this).val();
        setNull();
        if(cate == 0){
            return false;
        }
        getAjax(cate,1);
    });

    // 内容置空
    var setNull = function(){
        $('.artic').html('');
        $('.page').html('');
    }

    // 点击分页按钮
    $('.page').delegate('button','click',function(){
        var page = 1;
        console.log('nowpage',nowpage);
        var cate = $(this).attr('cate');
        var pageStr = $.trim($(this).text());
        if(pageStr == '···' || pageStr == nowpage){
            return false;
        }else if(pageStr == 'Next >'){
            page = ++nowpage;
        }else if(pageStr == '< Prev'){
            page = --nowpage;
        }else{
            page = parseInt(pageStr);
        }
        setNull();
        console.log('page',page);
        getAjax(cate,page);
    });


    // ajax
    var ajaxFlag = 0;
    var getAjax = function(cate,page){
        if(ajaxFlag == 0){
            ajaxFlag++;
            $.ajax({
                url: '/cnblogs/cate/' + cate + '/' + page,
                type: 'GET',
                dataType: 'json',
                success: function(data){
                    console.log('cata:',data.article.length);
                    for(var i=0; i<data.article.length; i++){
                        var compiled = _.template($('#cnblogs').html());
                        var art = compiled(data.article[i]);
                        $('.artic').append(art);
                    }

                    // 设置分页
                    for(var i=0; i<data.page.length; i++){
                        var compiled = _.template($('#pages').html());
                        var art = compiled(data.page[i]);
                        $('.page').append(art);
                    }
                    // 当前页数高亮
                    $('.page .btn').each(function(){
                        if(parseInt($(this).text()) == parseInt(data.nowpage)){
                            $(this).addClass('btn-info');
                        }
                        if($.trim($(this).text()) == '···'){
                            $(this).attr('disabled',"disabled");
                        }
                    });
                    nowpage = parseInt(data.nowpage);
                    ajaxFlag = 0;
                }
            });
        }
        
    }
});