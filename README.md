# spider


基于nodejs,koa框架的爬虫
## Tech Stack

- Koa 2
- nodemon + runkoa（支持async/await，且不需关心babel）
- pm2 for deployment（服务器部署）
- express-style middlewares
  - koa-router
  - koa-views
  - koa-static
  - koa-bodyparser

## Getting Start

```
git clone https://github.com/17koa/koa2-demo.git
cd koa2-demo
npm install
npm start

## 安装http库 , 抓取页面模块
npm install superagent cheerio -S

```

open in browser

http://127.0.0.1:3000/ 

## 启动方式

最简单启动方式

```
node bin/run
```

最常用的集成nodemon的方式,代码变动会自动重载(其实就是nodemon去执行bin/run)

```
npm start
```

支持pm2部署

```
 #npm run pm2
 pm2 start bin/run 
```

## 支持view层多种模板


`koa-views` is using [consolidate](https://github.com/tj/consolidate.js) under the hood.

[List of supported engines](https://github.com/tj/consolidate.js#supported-template-engines)


需要注意的koa2使用的koa-views也是下一版本的koa-views@next，当前项目已经处理过了，不需要再处理的，哈哈

```

### ejs

```
npm i -S ejs
```

in app.js

```
app.use(views(__dirname + '/views-ejs', {
  extension: 'ejs' 
}));
```

说明

- bin/run(runkoa执行bin/www)
- bin/www是常规koa启动文件，和express的一样
- views是放默认的jade文件
- views-ejs是放ejs文件


# 运行

## 爬取博客园的博文
[获取某个栏目的数据](http://localhost:3000)  