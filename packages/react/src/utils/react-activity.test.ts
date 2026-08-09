import { getActivity } from './react-activity.ts'

describe('getActivity', () => {
  it('returns undefined when React does not export Activity', () => {
    expect(getActivity({})).toBeUndefined()
  })

  it('returns Activity when React exports it', () => {
    const Activity = vi.fn()

    expect(getActivity({ Activity })).toBe(Activity)
  })
})
