'use strict'

let should = require('chai').should()
let scrip = require('../lib/scripture')

describe('Scripture References', () => {
  
  it('generates a default link to ESV', () => {
    let result = scrip.generateReference(['Genesis 1:1'])
    result.should.exist
    result.should.eq('<a href="https://www.biblegateway.com/passage/?search=Genesis+1:1&amp;version=ESV" title="Read Genesis 1:1 (ESV) at Bible Gateway">Genesis 1:1</a>')
  })

  it('shows the version if specified', () => {
    let result = scrip.generateReference(['James 3:2', 'show-version'])
    result.should.exist
    result.should.include('>James 3:2</a> <em>(ESV)</em>')
  })

  it('shows extra text if specified', () => {
    let result = scrip.generateReference(['John 3:16', 'extra:a'])
    result.should.exist
    result.should.include('>John 3:16</a>a')
  })

  it('uses the version that is specified', () => {
    let result = scrip.generateReference(['Joshua 24:15', 'version:nlt'])
    result.should.exist
    result.should.eq('<a href="https://www.biblegateway.com/passage/?search=Joshua+24:15&amp;version=NLT" title="Read Joshua 24:15 (NLT) at Bible Gateway">Joshua 24:15</a>')
  })

  it('handles all parameters at once', () => {
    let result = scrip.generateReference(['Ruth 1:16', 'extra:b', 'version:kj21', 'show-version'])
    result.should.exist
    result.should.include('href="https://www.biblegateway.com/passage/?search=Ruth+1:16&amp;version=KJ21')
    result.should.include('title="Read Ruth 1:16 (KJ21) at Bible Gateway"')
    result.should.include('>Ruth 1:16</a>b <em>(KJ21)</em>')
  })
})

describe('Scripture Blockquotes', () => {

  it('renders a blockquote with the "bible" class', () => {
    let result = scrip.generateBlockquote(['Titus 2:8'], 'test', x => x)
    result.should.exist
    result.should.include('<blockquote class="bible">')
  })

  it('calls the render function', () => {
    let render = text => `***${text}***`
    let result = scrip.generateBlockquote(['John 11:35'], 'Jesus wept.', render)
    result.should.include('***Jesus wept.***')
  })

  it('includes the link in a citation', () => {
    let result = scrip.generateBlockquote(['Isaiah 9:6-7'], 'test', x => x)
    result.should.exist
    result.should.include('<cite>&mdash; <a href="https://www.biblegateway.com/passage/?search=Isaiah+9:6-7')
  })

  it('renders everything together correctly', () => {
    let render = text => text.toUpperCase()
    let result = scrip.generateBlockquote(['1 Samuel 15:22', 'extra:b', 'version:kjv', 'show-version'], 'hmm', render)
    result.should.exist
    result.should.eq('<blockquote class="bible">HMM<cite>&mdash; <a href="https://www.biblegateway.com/passage/?search=1+Samuel+15:22&amp;version=KJV" title="Read 1 Samuel 15:22 (KJV) at Bible Gateway">1 Samuel 15:22</a>b <em>(KJV)</em></cite></blockquote>')
  })
})
