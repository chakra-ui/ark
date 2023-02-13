import { filterObject } from './filter-object'

describe('filterObject', () => {
  it('should filter fn from object', () => {
    const data = {
      'data-active': '3',
      style: { color: 'red' },
      onClick() {
        console.log('outer')
      },
    }
    expect(filterObject(data, ([, v]) => typeof v !== 'function')).toEqual({
      'data-active': '3',
      style: { color: 'red' },
    })
  })
})
