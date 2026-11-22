import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as WithNumberInput } from '../examples/with-number-input.js'
import { mount as WithTooltip } from '../examples/with-tooltip.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

test('the number inputs and the range slider stay in sync', async () => {
  const root = mount(WithNumberInput)
  const [min, max] = root.querySelectorAll('ark-number-input input')
  const slider = document.querySelector('ark-slider')!
  await slider.ready
  const maxThumb = await screen.findByRole('slider', { name: 'Maximum price' })

  maxThumb.focus()
  await user.keyboard('{ArrowRight}')

  await waitFor(() => expect(max).toHaveValue('610'))

  await user.clear(min)
  await user.type(min, '300')
  await user.tab()

  await waitFor(() => expect(slider.value).toEqual([300, 610]))
})

test('the thumb tooltip shows the current value', async () => {
  mount(WithTooltip)
  const tooltip = document.querySelector('ark-tooltip')!
  await tooltip.ready
  const thumb = await screen.findByRole('slider')

  await user.hover(thumb)
  await waitFor(() => expect(tooltip.open).toBe(true))

  thumb.focus()
  await user.keyboard('{ArrowRight}')

  await waitFor(() => expect(document.querySelector('ark-tooltip-content')).toHaveTextContent('41'))
})
