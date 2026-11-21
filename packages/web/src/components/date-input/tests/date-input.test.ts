import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/date-input/basic.js'
import { mount as DefaultValue } from '../../../../examples/date-input/default-value.js'
import { mount as WithClearButton } from '../../../../examples/date-input/with-clear-button.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const segments = () => screen.getAllByRole('spinbutton')

const hiddenInput = () => document.querySelector('ark-date-input-hidden-input input')

const findSegments = async () => {
  await waitFor(() => expect(segments()).toHaveLength(3))
  return segments()
}

test('typing digits fills each segment and reports a keyboard change', async () => {
  mount(Basic)
  const dateInput = document.querySelector('ark-date-input')!
  const changes: { value: string[]; source: unknown }[] = []
  dateInput.addEventListener('valuechange', (event) => {
    const { value, source } = event.detail
    changes.push({ value: value.map(String), source })
  })
  const [month, day, year] = await findSegments()

  await user.click(month)
  await user.keyboard('06152024')

  await waitFor(() => expect(month).toHaveAttribute('aria-valuenow', '6'))
  expect(day).toHaveAttribute('aria-valuenow', '15')
  expect(year).toHaveAttribute('aria-valuenow', '2024')
  await waitFor(() => expect(changes.at(-1)).toEqual({ value: ['2024-06-15'], source: 'keyboard' }))
  await waitFor(() => expect(dateInput.value.map(String)).toEqual(['2024-06-15']))
})

test('arrow keys move between segments and step the focused one', async () => {
  mount(DefaultValue)
  await waitFor(() => expect(hiddenInput()).toHaveValue('6/15/2024'))
  const [month, day] = segments()

  month.focus()
  await user.keyboard('{ArrowUp}')

  await waitFor(() => expect(month).toHaveAttribute('aria-valuenow', '7'))

  await user.keyboard('{ArrowRight}')

  await waitFor(() => expect(day).toHaveFocus())

  await user.keyboard('{ArrowUp}')

  await waitFor(() => expect(day).toHaveAttribute('aria-valuenow', '16'))
  await waitFor(() => expect(hiddenInput()).toHaveValue('7/16/2024'))

  await user.keyboard('{ArrowLeft}')

  await waitFor(() => expect(month).toHaveFocus())
})

test('the clear button empties the date and focuses the first segment', async () => {
  mount(WithClearButton)
  const [month] = await findSegments()
  await user.click(month)
  await user.keyboard('06152024')
  await waitFor(() => expect(hiddenInput()).toHaveValue('6/15/2024'))

  await user.click(screen.getByRole('button', { name: 'Clear date' }))

  await waitFor(() => expect(hiddenInput()).toHaveValue(''))
  for (const segment of segments()) expect(segment).toHaveAttribute('data-placeholder-shown', '')
  await waitFor(() => expect(segments()[0]).toHaveFocus())
})

test('the date is submitted with its form', async () => {
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
