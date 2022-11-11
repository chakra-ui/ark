import { createSplitProps } from './create-split-props'

describe('createSplitProps', () => {
  it('should split props', () => {
    type Framework = {
      name: string
    }
    const source = { name: 'react', b: 2, c: 3 }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error this must be an error because name is not specified
    createSplitProps<User>()(source, [])

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error this must be an error because age is not known to User
    createSplitProps<User>()(source, ['name', 'age'])

    const [firstGroup, rest] = createSplitProps<Framework>()(source, ['name'])

    expect(firstGroup).toStrictEqual({ name: 'react' })
    expect(rest).toEqual({ b: 2, c: 3 })
  })
})
