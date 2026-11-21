import { waitFor } from '@testing-library/dom'

import { mount as ActiveChange } from '../../../../examples/toc/active-change.js'
import { mount as Basic } from '../../../../examples/toc/basic.js'
import { mount as Nested } from '../../../../examples/toc/nested.js'
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
