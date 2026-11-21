import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/date-input/basic.js'
import { mount as DefaultValue } from '../../../../examples/date-input/default-value.js'
import { mount as WithClearButton } from '../../../../examples/date-input/with-clear-button.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const hiddenInput = () => document.querySelector<HTMLInputElement>('ark-date-input-hidden-input input')!

test('date input fills segments from typed digits and emits valuechange', async () => {
  mount(Basic)
  const dateInput = document.querySelector('ark-date-input') as HTMLElement & { value: unknown[] }
  const changes: { value: string[]; source: unknown }[] = []
  dateInput.addEventListener('valuechange', (event) => {
    const { value, source } = (event as CustomEvent).detail
    changes.push({ value: value.map(String), source })
  })

  await waitFor(() => expect(screen.getAllByRole('spinbutton')).toHaveLength(3))
  const segments = screen.getAllByRole('spinbutton')
  await user.click(segments[0])
  await user.keyboard('06152024')

  await waitFor(() => expect(segments[0]).toHaveAttribute('aria-valuenow', '6'))
  expect(segments[1]).toHaveAttribute('aria-valuenow', '15')
  expect(segments[2]).toHaveAttribute('aria-valuenow', '2024')
  await waitFor(() => expect(changes.at(-1)).toEqual({ value: ['2024-06-15'], source: 'keyboard' }))
  await waitFor(() => expect(dateInput.value.map(String)).toEqual(['2024-06-15']))
})

test('date input moves between segments and increments with arrow keys', async () => {
  mount(DefaultValue)
  await waitFor(() => expect(hiddenInput()).toHaveValue('6/15/2024'))
  const segments = screen.getAllByRole('spinbutton')

  segments[0].focus()
  await user.keyboard('{ArrowUp}')
  await waitFor(() => expect(segments[0]).toHaveAttribute('aria-valuenow', '7'))

  await user.keyboard('{ArrowRight}')
  await waitFor(() => expect(segments[1]).toHaveFocus())
  await user.keyboard('{ArrowUp}')
  await waitFor(() => expect(segments[1]).toHaveAttribute('aria-valuenow', '16'))
  await waitFor(() => expect(hiddenInput()).toHaveValue('7/16/2024'))

  await user.keyboard('{ArrowLeft}')
  await waitFor(() => expect(segments[0]).toHaveFocus())
})

test('date input clear trigger empties the value', async () => {
  mount(WithClearButton)
  await waitFor(() => expect(screen.getAllByRole('spinbutton').length).toBeGreaterThan(0))
  const segments = screen.getAllByRole('spinbutton')

  await user.click(segments[0])
  await user.keyboard('06152024')
  await waitFor(() => expect(hiddenInput()).toHaveValue('6/15/2024'))

  await user.click(screen.getByRole('button', { name: 'Clear date' }))
  await waitFor(() => expect(hiddenInput()).toHaveValue(''))
  for (const segment of screen.getAllByRole('spinbutton')) expect(segment).toHaveAttribute('data-placeholder-shown', '')
  await waitFor(() => expect(screen.getAllByRole('spinbutton')[0]).toHaveFocus())
})

test('date input submits its value through the hidden input', async () => {
  mount(Basic)
  const form = document.createElement('form')
  form.innerHTML = /* html */ `
  <ark-date-input name="date" default-value="2024-06-15">
    <ark-date-input-control>
      <ark-date-input-segment-group></ark-date-input-segment-group>
    </ark-date-input-control>
    <ark-date-input-hidden-input></ark-date-input-hidden-input>
  </ark-date-input>`
  document.body.append(form)

  await waitFor(() => expect(form.querySelectorAll('ark-date-input-segment[role=spinbutton]')).toHaveLength(3))
  await waitFor(() => expect(new FormData(form).get('date')).toBe('6/15/2024'))
})
