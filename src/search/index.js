import memoize from '../memoize'

const notSearchableCharsRegexp = /[^а-яa-z0-9\s]/i
const camelCaseRegexp = /([а-яa-z])([A-ZА-Я])/g
const wordsWithNumbersRegexp = /([^0-9])([0-9])/g
const escapeRegexp = /[|\\{}()[\]^$+*?.]/g

const lowerCase = (str) => (
  str
    .replace(notSearchableCharsRegexp, '')
    .replace(camelCaseRegexp, (x,y,z) => [y, z].join(' ').toLowerCase())
    .replace(wordsWithNumbersRegexp, (x,y,z) => [y, z].join(' ').toLowerCase())
    .toLowerCase()
)
const escapeStringRegexp = (str) => str.replace(escapeRegexp, '\\$&')

/**
 * Convert string to searchable lower-case string prepared for regexp search of search term
 *
 * @param  {String} string
 * @return {String}
 */
const toSearchString = memoize((string) => [
  string.toLowerCase(),
  lowerCase(string),
].join(' '))

/**
 * Get regexp for search term
 *
 * @param  {String} term
 * @return {Regexp}
 */
const toSearchRegexp = memoize((term) => new RegExp(`(^|[^a-zA-Zа-яА-Я0-9])${escapeStringRegexp(term.toLowerCase())}`))

/**
 * Search term in array
 * @param  {Array} items Array of items
 * @param  {String} term Search term
 * @param  {Function} toString Function that converts item from array to string
 * @return {Array}
 */
export default (items, term, toString = (item) => item) => {
  const searchRegexp = toSearchRegexp(term || '')
  return items.filter(item =>
    toSearchString(toString(item)).match(searchRegexp)
  )
}
