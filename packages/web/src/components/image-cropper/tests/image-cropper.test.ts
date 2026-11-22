import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as Circle } from '../examples/circle.js'
import { mount as ControlledZoom } from '../examples/controlled-zoom.js'
import { mount as Fixed } from '../examples/fixed.js'
import { mount as Flip } from '../examples/flip.js'
import { mount as Reset } from '../examples/reset.js'
import { mount as Rotation } from '../examples/rotation.js'
import { mount as ZoomLimits } from '../examples/zoom-limits.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const cropper = () => document.querySelector('ark-image-cropper')!
const image = () => document.querySelector('ark-image-cropper-image img')!
const selection = () => document.querySelector('ark-image-cropper-selection')!

test('image cropper renders an accessible group with a selection slider', async () => {
  mount(Basic)
  await cropper().ready

  expect(screen.getByRole('group', { name: 'Image cropper' })).toBe(cropper())
  expect(cropper()).toHaveAttribute('aria-busy', 'true')
  expect(selection()).toHaveAttribute('role', 'slider')
  expect(selection()).toHaveAttribute('aria-label', 'Crop selection area (rectangle)')
  expect(selection()).toHaveAttribute('tabindex', '0')
  expect(image()).toHaveAttribute('data-image-cropper-image')
  expect(image()).toHaveAttribute('aria-hidden', 'true')
})

test('image cropper handles and grids reflect their placement and axis', async () => {
  mount(Basic)
  await cropper().ready

  const placements = [...document.querySelectorAll('ark-image-cropper-handle')].map((handle) =>
    handle.getAttribute('data-placement'),
  )
  const axes = [...document.querySelectorAll('ark-image-cropper-grid')].map((grid) => grid.getAttribute('data-axis'))

  expect(placements).toEqual(['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'])
  expect(axes).toEqual(['horizontal', 'vertical'])
})

test('image cropper zooms from an action and reports the change', async () => {
  mount(Basic)
  const listener = vi.fn()
  cropper().addEventListener('zoomchange', listener)

  cropper().zoomBy(0.5)

  await waitFor(() => expect(cropper().zoom).toBe(1.5))
  expect(listener.mock.calls[0][0].detail).toMatchObject({ zoom: 1.5, source: 'programmatic' })
  expect(cropper().style.getPropertyValue('--image-zoom')).toBe('1.5')
})

test('image cropper writes zoom and rotation through live properties', async () => {
  mount(Basic)
  await cropper().ready

  cropper().zoom = 2
  cropper().rotation = 45

  await waitFor(() => expect(cropper().api?.zoom).toBe(2))
  await waitFor(() => expect(cropper().api?.rotation).toBe(45))
})

test('controlled zoom follows the buttons', async () => {
  mount(ControlledZoom)
  await cropper().ready

  await user.click(screen.getByRole('button', { name: 'Zoom in' }))
  await user.click(screen.getByRole('button', { name: 'Zoom in' }))

  await waitFor(() => expect(screen.getByText('1.2x')).toBeInTheDocument())
  expect(cropper().zoom).toBeCloseTo(1.2)
})

test('zoom limits keep the zoom within range', async () => {
  mount(ZoomLimits)
  await cropper().ready

  for (let step = 0; step < 15; step++) await user.click(screen.getByRole('button', { name: 'Zoom in' }))

  await waitFor(() => expect(cropper().zoom).toBe(2))
})

test('controlled rotation turns the image', async () => {
  mount(Rotation)
  await cropper().ready

  await user.click(screen.getByRole('button', { name: 'Rotate right' }))

  await waitFor(() => expect(screen.getByText('90°')).toBeInTheDocument())
  expect(cropper().rotation).toBe(90)
  expect(cropper()).toHaveAttribute('rotation', '90')
})

test('controlled flip mirrors the image and marks its state', async () => {
  mount(Flip)
  await cropper().ready

  const horizontal = screen.getByRole('button', { name: 'Horizontal' })
  await user.click(horizontal)

  await waitFor(() => expect(image()).toHaveAttribute('data-flip-horizontal'))
  expect(horizontal).toHaveAttribute('data-variant', 'solid')
  expect(cropper().flip).toEqual({ horizontal: true, vertical: false })
  expect(document.querySelector('ark-image-cropper-image')!.state).toMatchObject({ flipHorizontal: true })
})

test('reset restores zoom, rotation and flip', async () => {
  mount(Reset)
  await cropper().ready

  await user.click(screen.getByRole('button', { name: 'Zoom in' }))
  await user.click(screen.getByRole('button', { name: 'Rotate right' }))
  await user.click(screen.getByRole('button', { name: 'Flip horizontally' }))
  await waitFor(() => expect(cropper().rotation).toBe(90))
  expect(cropper().zoom).toBeCloseTo(1.1)
  expect(cropper().flip.horizontal).toBe(true)

  await user.click(screen.getByRole('button', { name: 'Reset' }))

  await waitFor(() => expect(cropper().zoom).toBe(1))
  expect(cropper().rotation).toBe(0)
  expect(cropper().flip).toEqual({ horizontal: false, vertical: false })
})

test('circle crop shape is reflected on the selection', async () => {
  mount(Circle)
  await cropper().ready

  expect(selection()).toHaveAttribute('data-shape', 'circle')
  expect(selection().state).toMatchObject({ shape: 'circle' })
})

test('fixed crop area disables the selection', async () => {
  mount(Fixed)
  await cropper().ready

  expect(selection()).toHaveAttribute('data-disabled')
  expect(cropper().state).toMatchObject({ fixed: true })
})
