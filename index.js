'use strict';

const { IncomingForm } = require('formidable');
const { isUndefined, isObject } = require('celia');
const { append } = require('kick-array');

const { isArray } = Array;

module.exports = function (opts) {
  opts = opts || {};
  const { formidable = {}, requestBody = 'body', requestFiles = 'files' } = opts;

  return async function (ctx, next) {
    if (isUndefined(ctx.request.body)) {
      return next();
    }
    if (ctx.disableBodyParser) {
      return next();
    }
    const form = new IncomingForm();
    if (isObject(formidable)) {
      Object.assign(form, formidable);
    }

    await new Promise((resolve, reject) => {
      const body = {};
      const files = {};
      form
        .on('field', (name, value) => {
          let field;
          if (isUndefined(field = body[name])) {
            body[name] = value;
          } else { // 相同的name需要转成数组
            if (!isArray(field)) {
              field = [field];
            }
            append(field, value);
          }
        })
        .on('file', (name, file) => {
          let tmpFile;
          if (isUndefined(tmpFile = files[name])) {
            tmpFile = [];
          }
          append(tmpFile, file);
        })
        .on('error', (err) => {
          reject(err);
        })
        .on('end', () => {
          ctx.request[requestBody] = body;
          ctx.request[requestFiles] = files;
          resolve();
        })
        .parse(ctx.req);
    });

    return next();
  };
};
