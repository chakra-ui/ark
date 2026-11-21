import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/marquee/basic.js'
import { mount as ProgrammaticControl } from '../../../../examples/marquee/programmatic-control.js'
import { mount as WithEdges } from '../../../../examples/marquee/with-edges.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

afterEach(() => {
  document.body.innerHTML = ''
})

test('marquee wires the viewport, content and items', async () => {
  mount(Basic)
  const root = document.querySelector('ark-marquee')!
  await waitFor(() => expect(root).toHaveAttribute('data-marquee-root'))
  expect(document.querySelector('ark-marquee-viewport')).toHaveAttribute('data-marquee-viewport')
  const contents = document.querySelectorAll('ark-marquee-content')
  expect(contents.length).toBeGreaterThanOrEqual(1)
  expect(contents[0]).toHaveAttribute('data-marquee-content')
  expect(document.querySelectorAll('ark-marquee-content:not([data-rendered]) ark-marquee-item')).toHaveLength(6)
})

test('marquee keeps one copy of the content per content count, hidden from assistive tech', async () => {
  mount(Basic)
  const root = document.querySelector('ark-marquee')!
  await waitFor(() => expect(root.api).toBeDefined())
  await waitFor(() => expect(document.querySelectorAll('ark-marquee-content')).toHaveLength(root.api!.contentCount))
  for (const copy of document.querySelectorAll('ark-marquee-content[data-rendered]')) {
    expect(copy).toHaveAttribute('aria-hidden', 'true')
  }
})

test('marquee pauses and resumes through the paused property', async () => {
  mount(ProgrammaticControl)
  const root = document.querySelector('ark-marquee')!
  await waitFor(() => expect(root.api).toBeDefined())
  expect(root.paused).toBe(false)
  await user.click(screen.getByRole('button', { name: 'Pause' }))
  await waitFor(() => expect(root.paused).toBe(true))
  expect(root).toHaveAttribute('data-paused')
  await user.click(screen.getByRole('button', { name: 'Resume' }))
  await waitFor(() => expect(root.paused).toBe(false))
})

test('marquee edges get their side', async () => {
  mount(WithEdges)
  const edges = document.querySelectorAll('ark-marquee-edge')
  await waitFor(() => expect(edges[0]).toHaveAttribute('data-marquee-edge'))
  expect(edges[0]).toHaveAttribute('data-side', 'start')
  expect(edges[1]).toHaveAttribute('data-side', 'end')
})

test('marquee takes its direction from an ancestor', async () => {
  const wrapper = document.createElement('div')
  wrapper.dir = 'rtl'
  document.body.append(wrapper)
  Basic(wrapper)
  await waitFor(() => expect(document.querySelector('ark-marquee')).toHaveAttribute('dir', 'rtl'))
})
