import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/signature-pad/basic.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const paths = () => document.querySelectorAll('ark-signature-pad-segment svg path')

async function draw() {
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

test('drawing creates a path and emits drawend', async () => {
  mount(Basic)
  const pad = document.querySelector('ark-signature-pad')!
  await waitFor(() => expect(pad).toHaveAttribute('data-signature-pad-root'))
  expect(paths()).toHaveLength(0)
  const ends: number[] = []
  pad.addEventListener('drawend', (event) => ends.push(event.detail.paths.length))

  await draw()
  await waitFor(() => expect(paths()).toHaveLength(1))
  expect(paths()[0].getAttribute('d')).toMatch(/^M/)
  expect(ends.at(-1)).toBe(1)
})

test('clear trigger removes the paths', async () => {
  mount(Basic)
  const clear = await waitFor(() => {
    const element = document.querySelector<HTMLButtonElement>('button[aria-label="clear signature"]')
    expect(element).toBeInTheDocument()
    return element!
  })
  expect(clear).not.toBeVisible()

  await draw()
  await waitFor(() => expect(paths()).toHaveLength(1))

  await waitFor(() => expect(screen.getByRole('button', { name: 'clear signature' })).toBeVisible())
  await user.click(clear)
  await waitFor(() => expect(paths()).toHaveLength(0))
  expect(clear).not.toBeVisible()
})

test('hidden input holds the signature data url', async () => {
  mount(Basic)
  const input = await waitFor(() => {
    const element = document.querySelector('ark-signature-pad-hidden-input input')
    expect(element).toBeInTheDocument()
    return element!
  })

  await waitFor(() => expect(input).toHaveAttribute('name', 'signature'))
  expect(input).toHaveValue('')
})
