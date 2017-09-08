'use strict'
/**
 * Scripture Reference Tag Plugin
 * 
 * There are two different styles of tags that this plugin provides. The first
 * is an inline link to Bible Gateway, where the text is the reference.  The
 * syntax for this one is (using John 3:16 as an example):
 * 
 * {% scripture John 3:16 [version:ver] [extra:x] [show-version] %}
 * 
 * The "version" should be an abbreviation supported by Bible Gateway; the
 * plugin defaults to "esv" (ESV - English Standard Version). "extra" will put
 * whatever is after it (until the next space) directly behind the reference;
 * it can be used where you quote only part of the verse, and you want "a". The
 * "show-version" parameter, if present, will put a space, and the version
 * abbreviation in parenthesis after the linked reference. So, to fill in a
 * complete example:
 * 
 * {% scripture John 3:16 version:csb extra:a show-version %}
 * 
 * ...would result in...
 * 
 * [a href="link"]John 3:16[/a]a [em](CSB)[/em]
 * 
 * For convenience, there are tags that assume different versions, allowing
 * these links to take up very little space. For example, the "esv" tag, with
 * no options, would simply be:
 * 
 * {% esv John 3:16 %}
 * 
 * There are these type of tags for the following versions:
 * - csb (Christian Standard Bible)
 * - esv (English Standard Version)
 * - hcsb (Holman Christian Standard Bible)
 * - kjv (King James Version)
 * - niv (New International Version)
 * - nkjv (New King James Version)
 * 
 * Other versions that Bible Gateway supports would be easy; create an issue (or
 * PR). :)
 * 
 * The second type of tag generates a [blockquote class="bible"] around the
 * content, with a linked reference citation. The tag supports all the options
 * and defaults of the inline tag.
 * 
 * {% bible John 3:16 [version:ver] [extra:x] [show-version] %}
 * text
 * {% endbible %}
 * 
 * To display the first part of John 3:16 from the King James, this would be:
 * 
 * {% bible John 3:16 version:kjv extra:a %}
 * For God so loved the world...
 * {% endbible %}
 * 
 * ...which would generate...
 * 
 * [blockquote class="bible"]
 * For God so loved the world...
 * [cite]- [a href="link"]John 3:16[/a]a[/cite]
 * [/blockquote]
 */
var scrip = require('lib/scripture')

let scripture = (args, content) => scrip.generateReference(args)
let tagOpts = { async: true, ends: false }

let renderMarkdown = content => hexo.render.renderSync({ text: content, engine: 'markdown' })

hexo.extend.tag.register('scripture', scripture, tagOpts)
hexo.extend.tag.register('csb',  (args, content) => scripture(args.concat(['version:csb']),  content), tagOpts)
hexo.extend.tag.register('esv',  (args, content) => scripture(args.concat(['version:esv']),  content), tagOpts)
hexo.extend.tag.register('hcsb', (args, content) => scripture(args.concat(['version:hcsb']), content), tagOpts)
hexo.extend.tag.register('kjv',  (args, content) => scripture(args.concat(['version:kjv']),  content), tagOpts)
hexo.extend.tag.register('niv',  (args, content) => scripture(args.concat(['version:niv']),  content), tagOpts)
hexo.extend.tag.register('nkjv', (args, content) => scripture(args.concat(['version:nkjv']), content), tagOpts)

hexo.extend.tag.register('bible',
  (args, content) => scripture.generateBlockquote(args, content, renderMarkdown), {
    async: true,
    ends: true
  })
