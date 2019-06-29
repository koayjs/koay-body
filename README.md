# koay-body

[![npm package](https://nodei.co/npm/koay-body.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/koay-body)

> Note: A full-featured koa body parser middleware. Supports multipart, urlencoded, and json request bodies.

[![NPM version](https://img.shields.io/npm/v/koay-body.svg?style=flat)](https://npmjs.org/package/koay-body) [![NPM Downloads](https://img.shields.io/npm/dm/koay-body.svg?style=flat)](https://npmjs.org/package/koay-body)

---

## Installation

### Node >= 7.6

```bash
npm install --save koay-body
```

---

## Usage

```javascript
const bodyParser = require('koay-body');
const Koa = require('koa');

const app = new Koa();

app.use(bodyParser({
  formidable: {}, // default
  requestBody: 'body', // default
  requestFiles: 'files' // default
}));
app.use((ctx) => {
  // 禁用bodyparser
  ctx.disableBodyParser = true;
});
app.use((ctx) => {
  const { body } = ctx.request;

  console.log(body);
  
  ctx.body = body;
});
```

## Options explanation:
  
  - encoding 设置表单字段的编码
  - uploadDir 设置上传后的文件存放的目录, 默认为: os.tmpdir()
  - keepExtensions 设置上传后的文件是否保持原来的扩展名
  - type 可以设置成 multipart or urlencoded
  - maxFieldsSize 设置提交到后台数据的大小, 默认为: 20MB
  - maxFileSize 设置上传文件的大小, 默认为: 200MB
  - maxFields 设置url后面可接收的参数, 默认为: 1000
  - hash 使用sha1 or md5校验文件

  [Go to formidable API](https://github.com/felixge/node-formidable#api)
