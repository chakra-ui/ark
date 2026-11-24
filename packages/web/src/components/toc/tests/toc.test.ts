import { waitFor } from '@testing-library/dom'

import { mount as ActiveChange } from '../examples/active-change.js'
import { mount as Basic } from '../examples/basic.js'
import { mount as Nested } from '../examples/nested.js'
import { mount as WithCollapsible } from '../examples/with-collapsible.js'
import { mount as WithHover } from '../examples/with-hover.js'
import { mount as WithRail } from '../examples/with-rail.js'
import { mount as WithSelect } from '../examples/with-select.js'
import { mount as WithTreeView } from '../examples/with-tree-view.js'
import { intersect, mount, observedTargets } from '../../../test-utils.js'

afterEach(() => {
  document.body.innerHTML = ''
})

const link = (value: string) => document.querySelector(`ark-toc-item[value="${value}"] a`)!

test('toc reads its items from the markup', async () => {
  mount(Nested)
  const toc = document.querySelector('ark-toc')!
  await waitFor(() => expect(toc.api?.items).toHaveLength(8))
  expect(toc.api!.items[2]).toMatchObject({ value: '02-free-blocks', depth: 3 })
  expect(document.querySelector('ark-toc-nav')).toHaveAttribute('data-toc-nav')
  expect(link('02-hooks')).toHaveAttribute('data-toc-link')
})

test('toc marks the heading in view as active and emits activechange', async () => {
  mount(ActiveChange)
  const toc = document.querySelector('ark-toc')!
  toc.setAttribute('multiple', '')
  await waitFor(() => expect(toc.api).toBeDefined())
  const heading = document.getElementById('03-usage')!
  await waitFor(() => expect(observedTargets()).toContain(heading))
  intersect(heading)
  await waitFor(() => expect(toc.activeIds).toEqual(['03-usage']))
  expect(link('03-usage')).toHaveAttribute('data-active')
  expect(document.querySelector('ark-toc-item[value="03-usage"]')).toHaveAttribute('data-active')
  await waitFor(() => expect(document.querySelector('output')).toHaveTextContent('activeIds: ["03-usage"]'))
})

test('toc active ids can be set through the property', async () => {
  mount(Basic)
  const toc = document.querySelector('ark-toc')!
  await waitFor(() => expect(toc.api).toBeDefined())
  toc.activeIds = ['01-installation']
  await waitFor(() => expect(link('01-installation')).toHaveAttribute('data-active'))
})

test('toc picks up items added to the markup', async () => {
  mount(Basic)
  const toc = document.querySelector('ark-toc')!
  await waitFor(() => expect(toc.api?.items).toHaveLength(5))
  const item = document.createElement('ark-toc-item')
  item.setAttribute('value', '01-faq')
  item.setAttribute('depth', '2')
  item.innerHTML = '<ark-toc-link><a href="#01-faq">FAQ</a></ark-toc-link>'
  document.querySelector('ark-toc-list')!.append(item)
  await waitFor(() => expect(toc.api?.items).toHaveLength(6))
})

const activate = async (id: string) => {
  const heading = document.getElementById(id)!
  await waitFor(() => expect(observedTargets()).toContain(heading))
  intersect(heading)
}

test('toc with a select follows the active heading and scrolls on change', async () => {
  mount(WithSelect)
  const select = document.querySelector('select')!
  await activate('08-usage')
  await waitFor(() => expect(select.value).toBe('08-usage'))
  const content = document.querySelector<HTMLElement>('ark-toc-content')!
  const scrollTo = vi.fn()
  content.scrollTo = scrollTo
  select.value = '08-conclusion'
  select.dispatchEvent(new Event('change'))
  expect(scrollTo).toHaveBeenCalled()
})

test('toc in a collapsible shows the active heading in its trigger', async () => {
  mount(WithCollapsible)
  await activate('04-quick-start')
  await waitFor(() => expect(document.querySelector('[data-label]')).toHaveTextContent('Quick Start'))
  expect(document.querySelector('[data-index]')).toHaveTextContent('3')
})

test('toc with hover uses its items property and swaps the list on hover', async () => {
  mount(WithHover)
  const toc = document.querySelector('ark-toc')!
  await waitFor(() => expect(toc.api?.items).toHaveLength(5))
  const nav = document.querySelector('ark-toc-nav')!
  nav.dispatchEvent(new MouseEvent('mouseenter'))
  await waitFor(() => expect(document.querySelector('ark-swap')).toHaveAttribute('swap'))
  expect(nav).toHaveAttribute('data-expanded')
})

test('toc with a rail draws a rail for each item', async () => {
  mount(WithRail)
  await waitFor(() => expect(document.querySelector('ark-toc')!.api?.items).toHaveLength(9))
  expect(document.querySelectorAll('ark-toc-item svg')).toHaveLength(9)
})

test('toc with a tree view expands the section of the active heading', async () => {
  mount(WithTreeView)
  const treeView = document.querySelector('ark-tree-view')!
  await waitFor(() => expect(document.querySelector('ark-toc')!.api?.items).toHaveLength(10))
  await activate('09-toc-events')
  await waitFor(() => expect(treeView.expandedValue).toEqual(['09-core-concepts']))
})
