import { cleanProps } from './clean-props.ts'

describe('Util: cleanProps', () => {
  it('should drop undefined values', () => {
    expect(cleanProps({ a: 1, b: undefined })).toEqual({ a: 1 })
  })

  it('should restore aria props that Vue camelized', () => {
    expect(cleanProps({ ariaLabel: 'Rotation', ariaLabelledby: 'label-id' })).toEqual({
      'aria-label': 'Rotation',
      'aria-labelledby': 'label-id',
    })
  })

  it('should keep aria props that are already hyphenated', () => {
    expect(cleanProps({ 'aria-label': 'Rotation' })).toEqual({ 'aria-label': 'Rotation' })
  })
})
