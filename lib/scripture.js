'use strict'

/**
 * Generate a Scripture reference from the given arguments
 * @param {string[]} args The arguments to the tag, the way they are passed to the tag
 * @return {string} The link to Bible Gateway
 */
let generateRef = args => {
  let rExtra = /\s*extra:(\w+)/i
  let rVersion = /\s*version:(\w+)/i
  let rShowVersion = /\s*show-version/i

  let arg = args.join(' ')
  let version = 'ESV'
  let versionText = ''
  let extraText = ''

  if (rVersion.test(arg)) {
    arg = arg.replace(rVersion, (match, p1) => {
      version = p1.toUpperCase()
      return ''
    })
  }

  if (rShowVersion.test(arg)) {
    arg = arg.replace(rShowVersion, () => {
      versionText = ` <em>(${version})</em>`
      return ''
    })
  }

  if (rExtra.test(arg)) {
    arg = arg.replace(rExtra, (match, p1) => {
      extraText = p1
      return ''
    })
  }
 
  let reference = arg.trim()
  let urlReference = reference.split(' ').join('+')

  return `<a href="https://www.biblegateway.com/passage/?search=${urlReference}&amp;version=${version}" `
    + `title="Read ${reference} (${version}) at Bible Gateway">${reference}</a>${extraText}${versionText}`
}

module.exports = {
  
  /**
   * Generate a Scripture reference from the given arguments
   * @param {string[]} args The arguments to the tag, the way they are passed to the tag
   * @return {string} The link to Bible Gateway
   */
  generateReference: generateRef,

  /**
   * Generate a Bible blockquote element
   * @param {string[]} args The arguments to the tag, the way they are passed to the tag
   * @param {string} content The content representing the text of the passage
   * @param {function(string): string} renderFunc Function to apply to the text (typically Markdown rendering)
   * @return {string} The blockquote with the "bible" CSS class and a citation with a linked reference
   */
  generateBlockquote: (args, content, renderFunc) =>
    `<blockquote class="bible">${renderFunc(content)}<cite>&mdash; ${generateRef(args)}</cite></blockquote>`
}
