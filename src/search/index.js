import memoize from '../memoize'
import lowerCase from 'lodash.lowercase'
import escapeStringRegexp from 'escape-string-regexp'

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
const toSearchRegexp = memoize((term) => new RegExp(`(^|[^a-zA-Zа-яА-Я0-9])${escapeStringRegexp(term.toString())}`))

/**
 * Search term in array
 * @param  {Array} items Array of items
 * @param  {String} term Search term
 * @param  {Function} toString Function that converts item from array to string
 * @return {Array}
 */
export default (items, term, toString = (item) => item) => {
  const searchRegexp = toSearchRegexp(term)
  return items.filter(item =>
    toSearchString(toString(item)).match(searchRegexp)
  )
}
