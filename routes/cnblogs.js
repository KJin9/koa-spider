var router = require('koa-router')();

var url = require('url'); //解析操作url
var request = require('superagent');
var cheerio = require('cheerio');

router.get('/cate/:name/:page', async function (ctx, next) {
  // 获取cate的内容  ctx.params.name
  /** 
   * cheerio充当服务器端的jQuery功能，使用它的.load()来载入HTML，
   * 先再通过CSS selector来筛选元素。
   */ 
  var targetUrl = 'http://www.cnblogs.com/cate/' + ctx.params.name + '/' + ctx.params.page;
  // ctx.response.body = targetUrl;
   var article = await getCateContent(targetUrl);
  var page = await getPage(targetUrl,ctx.params.name);
  ctx.response.body = {
    page:page,
    article:article,
    nowpage:ctx.params.page
  };
  //  console.log(article);
});

router.get('/user/:name', async function (ctx, next) {
  var targetUrl = 'http://www.cnblogs.com/' + ctx.params.name;
  var cont = await getUserContent(targetUrl);
  var page = await getPage(targetUrl,ctx.params.name);
  ctx.response.body = {
    page:page,
    cont:cont
  };
});

var getCateContent = function(targetUrl){
  return new Promise(resolve => {
        request.get(targetUrl)
          .end(function (err, res) {
              var article = [];
              var pageHtml = [];
              var $ = cheerio.load(res.text);
              // 通过CSS selector来筛选数据
              // ctx.response.body = $('.post_item_summary').eq(0).text();
              $('.titlelnk').each(function(index, ele){
                var ele = $(ele);
                var href = ele.attr('href'); // 博客链接
                var title = ele.text();      // 博客内容
                article.push({
                  href: href,
                  title: title
                });		
              });
           resolve(article);
        });
    });
}

// 获取分页
var getPage = function(targetUrl,name){
  return new Promise(resolve => {
        request.get(targetUrl)
          .end(function (err, res) {
              var article = [];
              var pageHtml = [];
              var $ = cheerio.load(res.text);
              
              $('.pager').children().each(function(index,ele){
                var ele = $(ele);
                pageHtml.push({
                  name:name,
                  page:ele.text()
                });
              });
           resolve(pageHtml);
        });
    });
}

module.exports = router;
