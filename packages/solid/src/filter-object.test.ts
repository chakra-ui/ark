import { filterBooleanAttributeValues, filterFunctionValues } from './filter-object'

describe('filterObject', () => {
  it('should filter fn from object', () => {
    const data = {
      foo: 'bar',
      onClick() {
        console.log('foo')
      },
    }
    expect(filterFunctionValues(data)).toEqual({
      foo: 'bar',
    })
  })

  it('should filter boolean attributes like disabled if their value is falsy', () => {
    const data = {
      foo: 'bar',
      disabled: false,
    }
    expect(filterBooleanAttributeValues(data)).toEqual({
      foo: 'bar',
    })
  })

  it('should not filter boolean attributes if their value is truthy', () => {
    const data = {
      foo: 'bar',
      disabled: true,
    }
    expect(filterBooleanAttributeValues(data)).toEqual({
      foo: 'bar',
      disabled: true,
    })
  })
})
