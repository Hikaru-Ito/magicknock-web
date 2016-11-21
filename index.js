var Metalsmith  = require('metalsmith')
var markdown    = require('metalsmith-markdown')
var layouts     = require('metalsmith-layouts')
var permalinks  = require('metalsmith-permalinks')

Metalsmith(__dirname)
  .metadata({
    title: "MagicKnock",
    sitename: "MagicKnock",
    description: "魔法のように、あらゆるものをノックでコントロールできる実世界指向インタフェース",
    generator: "Metalsmith",
    url: "http://magicknock.com/"
  })
  .source('./src')
  .destination('./build')
  .clean(false)
  .use(markdown())
  .use(permalinks())
  .use(layouts({
    engine: 'handlebars'
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
