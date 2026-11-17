import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import type { Tour } from '../index.ts'
import ComponentUnderTest from './tour.test.vue'

describe('Tour', () => {
  beforeAll(() => {
    if (window.visualViewport) return
    Object.defineProperty(window, 'visualViewport', {
      configurable: true,
      value: Object.assign(new EventTarget(), { width: 1024, height: 768, offsetTop: 0, offsetLeft: 0, scale: 1 }),
    })
  })

  it('should call status and step callbacks passed to useTour', async () => {
    const onStatusChange = vi.fn()
    const onStepChange = vi.fn()
    render(ComponentUnderTest, { props: { onStatusChange, onStepChange } })

    await userEvent.click(screen.getByRole('button', { name: 'Start' }))
    await waitFor(() => expect(onStatusChange).toHaveBeenCalledWith(expect.objectContaining({ status: 'started' })))
    expect(onStepChange).toHaveBeenLastCalledWith(expect.objectContaining({ stepId: 'one' }))

    await userEvent.click(screen.getByRole('button', { name: 'Next step' }))
    expect(onStepChange).toHaveBeenLastCalledWith(expect.objectContaining({ stepId: 'two' }))
  })

  it('should only declare the events Tour.Root emits', () => {
    expectTypeOf<keyof Tour.RootEmits>().toEqualTypeOf<'enterComplete' | 'exitComplete'>()
  })
})
