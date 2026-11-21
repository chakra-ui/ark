import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/angle-slider/basic.js'
import { mount as Step } from '../../../../examples/angle-slider/step.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const valueText = () => document.querySelector('ark-angle-slider-value-text')

const findThumb = async (name: string) => {
  const thumb = await screen.findByRole('slider', { name })
  await waitFor(() => expect(thumb).toHaveAttribute('aria-valuenow', '0'))
  return thumb
}

test('arrow keys turn the slider by its step and report a keyboard change', async () => {
  mount(Step)
  const slider = document.querySelector('ark-angle-slider')!
  const thumb = await findThumb('15 Step')
  const changes: string[] = []
  slider.addEventListener('valuechange', (event) => changes.push(`${event.detail.value}:${event.detail.source}`))

  thumb.focus()
  await user.keyboard('{ArrowRight}')

  await waitFor(() => expect(thumb).toHaveAttribute('aria-valuenow', '15'))
  expect(changes.at(-1)).toBe('15:keyboard')

  await user.keyboard('{ArrowRight}')

  await waitFor(() => expect(thumb).toHaveAttribute('aria-valuenow', '30'))
  expect(valueText()).toHaveTextContent('30deg')

  await user.keyboard('{ArrowLeft}')

  await waitFor(() => expect(thumb).toHaveAttribute('aria-valuenow', '15'))
  expect(changes.at(-1)).toBe('15:keyboard')
})

test('setting the value property moves the thumb without a change event', async () => {
  mount(Basic)
  const slider = document.querySelector('ark-angle-slider')!
  const thumb = await findThumb('Rotation')
  const changed = vi.fn()
  slider.addEventListener('valuechange', changed)

  slider.value = 90

  expect(slider.value).toBe(90)
  await waitFor(() => expect(thumb).toHaveAttribute('aria-valuenow', '90'))
  expect(valueText()).toHaveTextContent('90deg')
  expect(document.querySelector('ark-angle-slider-marker[value="90"]')).toHaveAttribute('data-state', 'at-value')
  expect(changed).not.toHaveBeenCalled()
})

test('the slider value is submitted with its form', async () => {
  mount(Basic)
  const form = document.createElement('form')
  form.innerHTML = /* html */ `
  <ark-angle-slider name="rotation" default-value="30" step="10">
    <ark-angle-slider-label>Form rotation</ark-angle-slider-label>
    <ark-angle-slider-control><ark-angle-slider-thumb></ark-angle-slider-thumb></ark-angle-slider-control>
    <ark-angle-slider-hidden-input></ark-angle-slider-hidden-input>
  </ark-angle-slider>`
  document.body.append(form)
  const submitted = () => new FormData(form).get('rotation')

  await waitFor(() => expect(submitted()).toBe('30'))

  const thumb = await screen.findByRole('slider', { name: 'Form rotation' })
  thumb.focus()
  await user.keyboard('{ArrowRight}')

  await waitFor(() => expect(submitted()).toBe('40'))
})
