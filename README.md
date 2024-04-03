## NOTE _(April 2024)_

To the best of my knowledge, this is still a valid project. I do not use Hexo day-to-day as I did when I created this library. If it needs attention, please open an issue!

# hexo-tag-scripture
A Hexo tag plugin to easily link Scripture references to Bible Gateway

[![npm](https://img.shields.io/npm/v/hexo-tag-scripture.svg)](//www.npmjs.com/package/hexo-tag-scripture) [![AppVeyor](https://img.shields.io/appveyor/ci/danieljsummers/hexo-tag-scripture.svg)](//ci.appveyor.com/project/danieljsummers/hexo-tag-scripture) [![Bless](https://cdn.rawgit.com/LunaGao/BlessYourCodeTag/master/tags/god.svg)](https://github.com/LunaGao/BlessYourCodeTag)

## Installation

```
npm install --save hexo-tag-scripture
```

## Docs, TL;DR-Style

**Scripture Reference Links**

```markdown
{% scripture John 3:16 %}
```

becomes

```html
<a href="https://www.biblegateway.com/passage/?search=John+3:16&amp;version=ESV" title="Read John 3:16 (ESV) at Bible Gateway">John 3:16</a>
```
_(See [below](#reference-link-aliases) for version aliases.)_

**Scripture Blockquotes**

```markdown
{% bible John 3:16 %}
The **text**
{% endbible %}
```

becomes

```html
<blockquote class="bible">
  The <strong>text</strong>
  <cite>&mdash; [the linked reference from the previous example]</cite>
</blockquote>
```

## Documentation

This plugin provides two different styles of tags - reference links and blockquotes. The TL;DR version has examples of each.

### Common Options

Both tags support a set of options that can be specified after the passage reference.

* `version` is the abbreviation for the translation (version) that should be linked. `version:esv` is the default.
* `extra` is extra text that will be placed immediately after the reference. If you had quoted the first part of a verse, passing `extra:a` would result in an "a" right after the closing anchor tag.
* `show-version` specifies that the version abbreviation should be shown after the linked reference. If present, the italicized version abbreviation, in parentheses, will be generated, and separated from the link by one space.

A complete example, using the `scripture` tag...

```markdown
{% scripture John 3:16 version:csb extra:a show-version %}
```

becomes

```html
<a href="https://www.biblegateway.com/passage/?search=John+3:16&amp;version=CSB" title="Read John 3:16 (CSB) at Bible Gateway">John 3:16</a>a <em>(CSB)</em>
```

### Reference Link Aliases

The plugin uses the English Standard Version (ESV) as the default translation (`version`). However, to simplify links to commonly-used versions, the following tags serve as aliases to their respective `version:xxx` options to the `scripture` tag.

* `csb` (Christian Standard Bible)
* `esv` (English Standard Version)
* `hcsb` (Holman Christian Standard Bible)
* `kjv` (King James Version)
* `niv` (New International Version)
* `nkjv` (New King James Version)
 
Other versions that Bible Gateway supports would be easy; create an issue (or PR). :)

## Example

This plugin was originally developed as I migrated the (now inaccurately named) [Daniel's Weekly Devotions](https://devotions.summershome.org) site, where you can see its results; all actual Scripture references and blockquotes use this plugin to generate them. An overview of how this plugin was developed can be found on the [DJS Consulting Tech Blog](https://techblog.djs-consulting.com/2017/writing-a-hexo-tag-plugin.html).

## License

[MIT](LICENSE)
