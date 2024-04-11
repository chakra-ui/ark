import { createSplitProps } from './create-split-props'

describe('createSplitProps', () => {
  type Target = {
    name: string
  }

  const source = {
    name: 'react',
    b: 2,
    c: 3,
  }

  it('should throw TS error on incomplete keys', () => {
    // @ts-expect-error this must be an error because name is not specified
    createSplitProps<Target>()(source, [])
  })

  it('should throw TS error on extra keys', () => {
    // @ts-expect-error this must be an error because age is not known to Target
    createSplitProps<Target>()(source, ['name', 'age'])
  })

  it('should create an empty object when no keys are required', () => {
    const [firstGroup, rest] = createSplitProps()(source, [])

    expect(firstGroup).toStrictEqual({})
    expect(rest).toStrictEqual(source)
  })

  it('should split props', () => {
    const [firstGroup, rest] = createSplitProps<Target>()(source, ['name'])

    expect(firstGroup).toStrictEqual({ name: 'react' })
    expect(rest).toEqual({ b: 2, c: 3 })
  })
})
