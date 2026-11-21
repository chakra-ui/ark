import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/qr-code/basic.js'
import { mount as Download } from '../../../../examples/qr-code/download.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const pattern = () => document.querySelector('path[data-qr-code-pattern]')!

const patternPath = () => pattern().getAttribute('d')

const downloads = () => {
  const names: string[] = []
  const spy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
    names.push(this.download)
  })
  onTestFinished(() => spy.mockRestore())
  return names
}

test('the code is drawn as a single path inside the frame', async () => {
  mount(Basic)
  const svg = document.querySelector('ark-qr-code-frame > svg')!

  await waitFor(() => expect(svg).toHaveAttribute('data-qr-code-frame'))
  expect(svg).toHaveAttribute('viewBox', expect.stringMatching(/^0 0 \d+ \d+$/))
  expect(svg.querySelectorAll('path[data-qr-code-pattern]')).toHaveLength(1)
  expect(pattern()).toHaveAttribute('d', expect.stringMatching(/^M/))
})

test('the code is redrawn when the value attribute or property changes', async () => {
  mount(Basic)
  const qrCode = document.querySelector('ark-qr-code')!
  await waitFor(() => expect(patternPath()).toMatch(/^M/))
  const initial = patternPath()!

  qrCode.setAttribute('value', 'https://chakra-ui.com')

  await waitFor(() => expect(pattern()).not.toHaveAttribute('d', initial))

  const fromAttribute = patternPath()!
  qrCode.removeAttribute('value')
  qrCode.value = 'https://zagjs.com'

  await waitFor(() => expect(qrCode.value).toBe('https://zagjs.com'))
  await waitFor(() => expect(pattern()).not.toHaveAttribute('d', fromAttribute))
})

test('the download trigger saves the code as an image', async () => {
  mount(Download)
  const downloaded = downloads()
  await waitFor(() => expect(patternPath()).toMatch(/^M/))

  await user.click(screen.getByRole('button', { name: 'Download' }))

  await waitFor(() => expect(downloaded).toEqual(['qr-code.png']))
})
