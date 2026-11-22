import { mount as Basic } from '../examples/basic.js'
import { mount as SrcDoc } from '../examples/src-doc.js'
import { mount } from '../../../test-utils.js'

import '@ark-ui/web/frame'

const frameOf = () => document.querySelector('ark-frame')!

test('the content moves into the iframe document', () => {
  mount(Basic)
  const frame = frameOf()

  expect(frame.contentDocument?.querySelector('h1')).toHaveTextContent('Hello from inside the frame!')
  expect(frame.querySelector('h1')).toBeNull()
  expect(frame.mountNode).toHaveClass('frame-root')
})

test('head template content is added to the iframe head', () => {
  mount(Basic)
  const style = frameOf().contentDocument?.head.querySelectorAll('style')

  expect(Array.from(style ?? [], (node) => node.textContent)).toContain('body { background-color: #f0f0f0; }')
})

test('the head property adds markup to the iframe head and replaces it when set again', () => {
  mount(Basic)
  const frame = frameOf()

  frame.head = '<meta name="theme" content="light" />'
  expect(frame.contentDocument?.head.querySelector('meta[name=theme]')).toHaveAttribute('content', 'light')

  frame.head = '<meta name="theme" content="dark" />'
  expect(frame.contentDocument?.head.querySelectorAll('meta[name=theme]')).toHaveLength(1)
  expect(frame.contentDocument?.head.querySelector('meta[name=theme]')).toHaveAttribute('content', 'dark')
})

test('srcdoc sets the document the content is rendered into', () => {
  mount(SrcDoc)
  const doc = frameOf().contentDocument!

  expect(doc.head.querySelector('base')).toHaveAttribute('target', '_blank')
  expect(doc.body.querySelector('h1')).toHaveTextContent('Hello from inside the frame!')
})

test('an iframe is created when none is provided', async () => {
  document.body.innerHTML = /* html */ `<ark-frame><p>Inside</p></ark-frame>`
  const frame = frameOf()

  expect(frame.iframe).toBeInstanceOf(HTMLIFrameElement)
  await vi.waitFor(() => expect(frame.contentDocument?.body).toHaveTextContent('Inside'))
})

test('children added later are rendered into the iframe', async () => {
  mount(Basic)
  const frame = frameOf()
  const note = document.createElement('p')
  note.textContent = 'Added later'

  frame.append(note)

  await vi.waitFor(() => expect(frame.contentDocument?.body).toHaveTextContent('Added later'))
})

test('mount and unmount fire, and removing the frame returns its content', () => {
  const root = document.createElement('div')
  Basic(root)
  const frame = root.querySelector('ark-frame')!
  const onMount = vi.fn()
  const onUnmount = vi.fn()
  frame.addEventListener('mount', onMount)
  frame.addEventListener('unmount', onUnmount)

  document.body.append(root)
  expect(onMount).toHaveBeenCalledTimes(1)

  frame.remove()
  expect(onUnmount).toHaveBeenCalledTimes(1)
  expect(frame.querySelector('h1')).toHaveTextContent('Hello from inside the frame!')
})
