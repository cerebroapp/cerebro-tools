import expect from 'expect'
import search from './index'

describe('search', () => {
  it('searchs in strings array without toString function', () => {
    const items = ['Facetime']
    const term = 'face'
    expect(search(items, term)).toEqual(items)
  })

  it('searchs in objects array with toString function', () => {
    const items = [{
      name: 'Facetime'
    }, {
      name: 'Terminal'
    }]
    const term = 'face'
    const toString = x => x.name
    expect(search(items, term, toString)).toEqual([items[0]])
  })

  it("doesn't search in the middle of words", () => {
    const items = ['Facetime']
    const term = 'ace'
    expect(search(items, term)).toEqual([])
  })

  it('searchs in second word', () => {
    const items = ['Face time']
    const term = 'ti'
    expect(search(items, term)).toEqual(items)
  })

  context('case insesetive', () => {
    const items = [
      {
        name: 'App Store',
        filename: 'App Store.app'
      },
      {
        name: 'App Store',
        filename: 'App Store.prefPane'
      }
    ]
    const toString = (app) => `${app.name} ${app.filename}`

    it('with lowercase', () => {
      const term = 'app'
      expect(search(items, term, toString)).toEqual(items)
    })

    it('with uppercase', () => {
      const term = 'App'
      expect(search(items, term, toString)).toEqual(items)
    })
  })

  it('is case insesetive for UpperCase', () => {
    const items = ['FaceTime']
    const term = 'Face'
    expect(search(items, term)).toEqual(items)
  })

  it('searchs for CamelCase', () => {
    const items = ['DaisyDisk']
    const term = 'dis'
    expect(search(items, term)).toEqual(items)
  })

  it('searchs in russian', () => {
    const items = ['Александр Сергеевич']
    const term = 'серг'
    expect(search(items, term)).toEqual(items)
  })

  it("doesn't search in the middle of russian words", () => {
    const items = ['Александр Сергеевич']
    const term = 'сан'
    expect(search(items, term)).toEqual([])
  })

  it("searchs for numbers in the begining of the word", () => {
    const items = ['Spotlight', 'Facetime', '1Password']
    const term = '1'
    expect(search(items, term)).toEqual(['1Password'])
  })

  it("searchs for numbers in the end of word", () => {
    const items = ['1Password', 'PS4 Remote']
    const term = '4'
    expect(search(items, term)).toEqual(['PS4 Remote'])
  })

  it("searchs for numbers and chars", () => {
    const items = ['Spotlight', 'Facetime', '1Password']
    const term = '1pass'
    expect(search(items, term)).toEqual(['1Password'])
  })

  it("doesn't remove non-alphanumeric symbols from term", () => {
    const items = ['Spotlight', 'Facetime', '1Password']
    const term = '$'
    expect(search(items, term)).toEqual([])
  })

  it('looks for non-alpanumeric symbols in names', () => {
    const items = ['$route.js']
    const term = '$'
    expect(search(items, term)).toEqual(items)
  })

  it('searchs for empty string by default', () => {
    const items = ['Facetime']
    const term = null
    expect(search(items, term)).toEqual(items)
  })

  it('searchs for full match', () => {
    const items = ['Facetime']
    const term = 'Facetime'
    expect(search(items, term)).toEqual(items)
  })
})
