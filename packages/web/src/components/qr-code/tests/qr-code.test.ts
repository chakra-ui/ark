import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/qr-code/basic.js'
import { mount as Download } from '../../../../examples/qr-code/download.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const pattern = () => document.querySelector('path[data-qr-code-pattern]')!

test('qr code renders the pattern path inside the frame svg', async () => {
  mount(Basic)
  const svg = document.querySelector('ark-qr-code-frame > svg')!

  await waitFor(() => expect(svg).toHaveAttribute('data-qr-code-frame'))
  expect(svg.getAttribute('viewBox')).toMatch(/^0 0 \d+ \d+$/)
  expect(svg.querySelectorAll('path[data-qr-code-pattern]')).toHaveLength(1)
  expect(pattern().getAttribute('d')).toMatch(/^M/)
})

test('qr code re-encodes when the value attribute or property changes', async () => {
  mount(Basic)
  const qrCode = document.querySelector('ark-qr-code')!

  await waitFor(() => expect(pattern().getAttribute('d')).toMatch(/^M/))
  const initial = pattern().getAttribute('d')

  qrCode.setAttribute('value', 'https://chakra-ui.com')

  await waitFor(() => expect(pattern()).not.toHaveAttribute('d', initial!))
  const controlled = pattern().getAttribute('d')

  qrCode.removeAttribute('value')
  qrCode.value = 'https://zagjs.com'

  await waitFor(() => expect(qrCode.value).toBe('https://zagjs.com'))
  await waitFor(() => expect(pattern()).not.toHaveAttribute('d', controlled!))
})

test('qr code download trigger downloads an image', async () => {
  mount(Download)
  const downloads: string[] = []
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
    downloads.push(this.download)
  })

  await waitFor(() => expect(pattern().getAttribute('d')).toMatch(/^M/))

  await user.click(screen.getByRole('button', { name: 'Download' }))

  await waitFor(() => expect(downloads).toEqual(['qr-code.png']))

  vi.restoreAllMocks()
})
