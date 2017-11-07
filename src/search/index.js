import memoize from '../memoize'
const rx1 = /[^а-яa-z0-9\s]/i
const rx2 = /([а-яa-z])([A-ZА-Я])/g
const rx3 = /([^0-9])([0-9])/g
const lowerCase = (str) => (
  str
    .replace(rx1, '')
    .replace(rx2, (x,y,z) => [y, z].join(' ').toLowerCase())
    .replace(rx3, (x,y,z) => [y, z].join(' ').toLowerCase())
    .toLowerCase()
);
const rx4 = /[|\\{}()[\]^$+*?.]/g
const escapeStringRegexp = (str) => str.replace(rx4, '\\$&')

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
