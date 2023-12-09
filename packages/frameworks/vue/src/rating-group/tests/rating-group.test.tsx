import { ratingGroupAnatomy } from '@ark-ui/anatomy'
import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import { getParts } from '../../setup-test'
import ComponentUnderTest from './rating-group.test.vue'

describe('Rating Group', () => {
  it.each(getParts(ratingGroupAnatomy))('should render part! %s', async (part) => {
    render(ComponentUnderTest)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it('should apply default value', async () => {
    render(ComponentUnderTest, { props: { modelValue: 2, count: 5 } })

    const input = screen.getByRole('textbox', { hidden: true })

    expect(input).toHaveValue('2')
  })

  it('should trigger onValueChange on click', async () => {
    const onValueChange = vi.fn()
    render(ComponentUnderTest, { props: { modelValue: 1, onValueChange, count: 5 } })

    const maxStarRadio = screen.getByRole('radio', { name: '5 stars' })
    fireEvent.click(maxStarRadio)

    await waitFor(() => expect(onValueChange).toHaveBeenNthCalledWith(1, { value: 5 }))
  })

  it('should update rating on click', async () => {
    render(ComponentUnderTest, { props: { modelValue: 0, count: 5 } })

    const input = screen.getByRole('textbox', { hidden: true })
    const maxStarRadio = screen.getByRole('radio', { name: '5 stars' })
    fireEvent.click(maxStarRadio)

    await waitFor(() => expect(input).toHaveValue('5'))
  })
})
