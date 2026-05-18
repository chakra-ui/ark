import { describe, expect, test } from 'bun:test'
import { formatAngularPropName, isAngularRequiredKind } from './angular-prop-binding'

describe('formatAngularPropName', () => {
  test('wraps input kind in square brackets', () => {
    expect(formatAngularPropName('id', 'input')).toBe('[id]')
  })

  test('wraps required-input kind in square brackets', () => {
    expect(formatAngularPropName('value', 'required-input')).toBe('[value]')
  })

  test('wraps model kind in banana-in-a-box', () => {
    expect(formatAngularPropName('open', 'model')).toBe('[(open)]')
  })

  test('wraps output kind in parentheses', () => {
    expect(formatAngularPropName('statusChange', 'output')).toBe('(statusChange)')
  })

  test('returns name unchanged when kind is undefined', () => {
    expect(formatAngularPropName('id')).toBe('id')
  })
})

describe('isAngularRequiredKind', () => {
  test('returns true for required-input', () => {
    expect(isAngularRequiredKind('required-input')).toBe(true)
  })

  test('returns false for other kinds', () => {
    expect(isAngularRequiredKind('input')).toBe(false)
    expect(isAngularRequiredKind('model')).toBe(false)
    expect(isAngularRequiredKind('output')).toBe(false)
  })

  test('returns false when kind is undefined', () => {
    expect(isAngularRequiredKind()).toBe(false)
  })
})
