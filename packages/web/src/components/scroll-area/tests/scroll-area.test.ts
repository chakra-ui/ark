import { waitFor } from '@testing-library/dom'

import { mount as Basic } from '../examples/basic.js'
import { mount as Horizontal } from '../examples/horizontal.js'
import { mount as Nested } from '../examples/nested.js'
import { mount } from '../../../test-utils.js'

const scrollbar = () => document.querySelector('ark-scroll-area-scrollbar')!

const thumb = () => document.querySelector('ark-scroll-area-thumb')

const setSize = (element: Element, size: Record<string, number>) => {
  for (const [key, value] of Object.entries(size)) {
    Object.defineProperty(element, key, { configurable: true, value })
  }
}

const findViewport = async (selector = 'ark-scroll-area-viewport') => {
  const viewport = document.querySelector(selector)!
  await waitFor(() => expect(viewport).toHaveAttribute('data-scroll-area-viewport'))
  return viewport
}

const scroll = (viewport: Element, size: Record<string, number>) => {
  setSize(viewport, size)
  viewport.dispatchEvent(new Event('scroll'))
}

test('content taller than the viewport marks the vertical scrollbar as overflowing', async () => {
  mount(Basic)
  const viewport = await findViewport()

  scroll(viewport, { scrollHeight: 400, clientHeight: 200, scrollWidth: 300, clientWidth: 300 })

  await waitFor(() => expect(scrollbar()).toHaveAttribute('data-overflow-y', ''))
  expect(scrollbar()).toHaveAttribute('data-orientation', 'vertical')
  expect(scrollbar()).not.toHaveAttribute('data-overflow-x')
  expect(thumb()).toHaveAttribute('data-orientation', 'vertical')
  expect(viewport).toHaveAttribute('tabindex', '0')
})

test('content wider than the viewport marks the horizontal scrollbar as overflowing', async () => {
  mount(Horizontal)
  const viewport = await findViewport()

  scroll(viewport, { scrollHeight: 200, clientHeight: 200, scrollWidth: 600, clientWidth: 300 })

  await waitFor(() => expect(scrollbar()).toHaveAttribute('data-overflow-x', ''))
  expect(scrollbar()).not.toHaveAttribute('data-overflow-y')
  expect(thumb()).toHaveAttribute('data-orientation', 'horizontal')
})

test('nested scroll areas track their scroll position separately', async () => {
  mount(Nested)
  const outer = document.querySelector('ark-scroll-area-viewport')!
  const inner = await findViewport('ark-scroll-area ark-scroll-area ark-scroll-area-viewport')
  setSize(outer, { scrollHeight: 400, clientHeight: 200, scrollTop: 0 })

  scroll(inner, { scrollHeight: 400, clientHeight: 100, scrollTop: 300 })

  await waitFor(() => expect(inner).toHaveAttribute('data-at-bottom', ''))
  expect(outer).toHaveAttribute('data-at-top', '')
  expect(outer).not.toHaveAttribute('data-at-bottom', '')
})
