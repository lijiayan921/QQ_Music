module.exports = {
    //@babel/preset-env: 一个智能预设，允许您使用最新的 JavaScript。
    presets: [[
      "@babel/preset-env",
       // 按需加载core-js的polyfill
       { useBuiltIns: "usage", corejs: { version: "3", proposals: true } },
    ]],
  };