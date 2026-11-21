import { waitFor } from '@testing-library/dom'

import { mount as Basic } from '../../../../examples/scroll-area/basic.js'
import { mount as Horizontal } from '../../../../examples/scroll-area/horizontal.js'
import { mount as Nested } from '../../../../examples/scroll-area/nested.js'
import { mount } from '../../../test-utils.js'

const setSize = (element: Element, size: Record<string, number>) => {
  for (const [key, value] of Object.entries(size)) {
    Object.defineProperty(element, key, { configurable: true, value })
  }
}

test('scroll area marks overflow on the axes that scroll', async () => {
  mount(Basic)
  const vertical = document.querySelector('ark-scroll-area-scrollbar')!
  const viewport = document.querySelector('ark-scroll-area-viewport')!
  await waitFor(() => expect(viewport).toHaveAttribute('data-scroll-area-viewport'))
  setSize(viewport, { scrollHeight: 400, clientHeight: 200, scrollWidth: 300, clientWidth: 300 })
  viewport.dispatchEvent(new Event('scroll'))

  await waitFor(() => expect(vertical).toHaveAttribute('data-overflow-y', ''))
  expect(vertical).toHaveAttribute('data-orientation', 'vertical')
  expect(vertical).not.toHaveAttribute('data-overflow-x')
  expect(document.querySelector('ark-scroll-area-thumb')).toHaveAttribute('data-orientation', 'vertical')
  expect(viewport).toHaveAttribute('tabindex', '0')

  document.body.replaceChildren()
  mount(Horizontal)
  const horizontal = document.querySelector('ark-scroll-area-scrollbar')!
  const horizontalViewport = document.querySelector('ark-scroll-area-viewport')!
  await waitFor(() => expect(horizontalViewport).toHaveAttribute('data-scroll-area-viewport'))
  setSize(horizontalViewport, { scrollHeight: 200, clientHeight: 200, scrollWidth: 600, clientWidth: 300 })
  horizontalViewport.dispatchEvent(new Event('scroll'))

  await waitFor(() => expect(horizontal).toHaveAttribute('data-overflow-x', ''))
  expect(horizontal).not.toHaveAttribute('data-overflow-y')
  expect(document.querySelector('ark-scroll-area-thumb')).toHaveAttribute('data-orientation', 'horizontal')
})

test('nested scroll areas track their own scroll state', async () => {
  mount(Nested)
  const outer = document.querySelector('ark-scroll-area-viewport')!
  const inner = document.querySelector('ark-scroll-area ark-scroll-area ark-scroll-area-viewport')!
  await waitFor(() => expect(inner).toHaveAttribute('data-scroll-area-viewport'))
  setSize(outer, { scrollHeight: 400, clientHeight: 200, scrollTop: 0 })
  setSize(inner, { scrollHeight: 400, clientHeight: 100, scrollTop: 300 })

  inner.dispatchEvent(new Event('scroll'))
  await waitFor(() => expect(inner).toHaveAttribute('data-at-bottom', ''))
  expect(outer).toHaveAttribute('data-at-top', '')
  expect(outer).not.toHaveAttribute('data-at-bottom', '')
})
