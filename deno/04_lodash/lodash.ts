import _filter from 'https://deno.land/x/lodash/filter.js'

const arr = [2, 1, 3]
console.log(_filter(arr, (n: number) => n >= 2))
