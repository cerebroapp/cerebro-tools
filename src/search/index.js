import memoize from '../memoize'
const lowerCase = (str) => (
  str
    .replace(/[^а-яa-z0-9\s]/i, '')
    .replace(/([а-яa-z])([A-ZА-Я])/g, (x,y,z) => [y, z].join(' ').toLowerCase())
    .replace(/([^0-9])([0-9])/g, (x,y,z) => [y, z].join(' ').toLowerCase())
    .toLowerCase()
);
const escapeStringRegexp = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

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
 * @return {Array}
 */
export default (items, term) => {
  const searchRegexp = toSearchRegexp(term || '')
  return items.filter(item =>
    toSearchString(item.searchString).match(searchRegexp)
  )
}
