'use strict'
/*
 * Scripture Reference Tag Plugin
 * 
 * See https://github.com/danieljsummers/hexo-tag-scripture/ for up-to-date
 * documentation.
 */
let scrip = require('./lib/scripture')

/**
 * Hexo tag signature for Scripture reference
 * @param {string[]} args Arguments passed to the tag
 * @param {string} content Content of the tag (ignored)
 * @return {string} The generated HTML
 */
let ref = (args, content) => scrip.generateReference(args)

/**
 * Function with string -> string signature that uses Hexo's markdown engine
 * @param {string} content The Markdown content to be rendered
 * @return {string} The parsed and rendered HTML
 */
let renderMarkdown = content => hexo.render.renderSync({ text: content, engine: 'markdown' })

/** Tag options for an inline tag with no end block */
let inlineTag = { async: true, ends: false }

/** Tag options for a block tag (tag / endtag pair) */
let blockTag = { async: true, ends: true }

hexo.extend.tag.register('scripture', ref, inlineTag)
hexo.extend.tag.register('csb',  (args, content) => ref(args.concat(['version:csb']),  content), inlineTag)
hexo.extend.tag.register('esv',  (args, content) => ref(args.concat(['version:esv']),  content), inlineTag)
hexo.extend.tag.register('hcsb', (args, content) => ref(args.concat(['version:hcsb']), content), inlineTag)
hexo.extend.tag.register('kjv',  (args, content) => ref(args.concat(['version:kjv']),  content), inlineTag)
hexo.extend.tag.register('niv',  (args, content) => ref(args.concat(['version:niv']),  content), inlineTag)
hexo.extend.tag.register('nkjv', (args, content) => ref(args.concat(['version:nkjv']), content), inlineTag)

hexo.extend.tag.register(
  'bible', (args, content) => scrip.generateBlockquote(args, content, renderMarkdown), blockTag)
