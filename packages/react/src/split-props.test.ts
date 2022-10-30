import { splitProps } from './split-props'

describe('splitProps', () => {
  it('should return all keys', () => {
    const source = { a: 1, b: 2, c: 3 }

    const [firstGroup, rest] = splitProps(source, [])

    expect(firstGroup).toStrictEqual({})
    expect(rest).toStrictEqual(source)
  })

  it('should split in two groups', () => {
    const source = { a: 1, b: 2, c: 3 }

    const [firstGroup, rest] = splitProps(source, ['a'])

    expect(firstGroup).toStrictEqual({ a: 1 })
    expect(rest).toStrictEqual({ b: 2, c: 3 })
  })

  it('should split in three groups', () => {
    const source = { a: 1, b: 2, c: 3 }

    const [firstGroup, secondGroup, rest] = splitProps(source, ['a'], ['b'])

    expect(firstGroup).toStrictEqual({ a: 1 })
    expect(secondGroup).toStrictEqual({ b: 2 })
    expect(rest).toStrictEqual({ c: 3 })
  })
})
