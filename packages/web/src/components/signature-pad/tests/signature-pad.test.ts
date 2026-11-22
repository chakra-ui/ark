import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const paths = () => document.querySelectorAll('ark-signature-pad-segment svg path')

const clearButton = () => document.querySelector('button[aria-label="clear signature"]')

const draw = async () => {
  const control = document.querySelector('ark-signature-pad-control')!
  const moves = Array.from({ length: 10 }, (_, index) => ({
    coords: { clientX: 40 + (index + 1) * 15, clientY: 40 + (index + 1) * 4 },
  }))

  await user.pointer([
    { keys: '[MouseLeft>]', target: control, coords: { clientX: 40, clientY: 40 } },
    ...moves,
    { keys: '[/MouseLeft]' },
  ])
}

test('drawing adds a path and reports it when the stroke ends', async () => {
  mount(Basic)
  const pad = document.querySelector('ark-signature-pad')!
  await waitFor(() => expect(pad).toHaveAttribute('data-signature-pad-root'))
  expect(paths()).toHaveLength(0)
  const ends: number[] = []
  pad.addEventListener('drawend', (event) => ends.push(event.detail.paths.length))

  await draw()

  await waitFor(() => expect(paths()).toHaveLength(1))
  expect(paths()[0]).toHaveAttribute('d', expect.stringMatching(/^M/))
  expect(ends.at(-1)).toBe(1)
})

test('the clear button appears after drawing and removes the paths', async () => {
  mount(Basic)
  await waitFor(() => expect(clearButton()).toBeInTheDocument())
  expect(clearButton()).not.toBeVisible()
  await draw()
  await waitFor(() => expect(paths()).toHaveLength(1))
  await waitFor(() => expect(screen.getByRole('button', { name: 'clear signature' })).toBeVisible())

  await user.click(clearButton()!)

  await waitFor(() => expect(paths()).toHaveLength(0))
  expect(clearButton()).not.toBeVisible()
})

test('the hidden input is named and starts empty', async () => {
  mount(Basic)
  const input = () => document.querySelector('ark-signature-pad-hidden-input input')

  await waitFor(() => expect(input()).toHaveAttribute('name', 'signature'))
  expect(input()).toHaveValue('')
})
