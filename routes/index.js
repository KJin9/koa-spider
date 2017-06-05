var router = require('koa-router')();


// 栏目
var cate = [ 
  'aspnet' , 'design', 'android', 'ios',
	'java', 'cpp', 'php', 'delphi', 'python', 'ruby',
	'web', 'javascript', 'jquery', 'html5' , 'win7' 
];

// 作者
var author = [
	'lianmin', 'coco1s'
];

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa爬虫',
    spiderName : '博客园',
    cate,
    author
  };

  await ctx.render('index', {});
});

module.exports = router;
