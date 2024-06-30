import { render } from '@testing-library/vue'
import { QrCode, qrCodeAnatomy } from '../'
import { getExports, getParts } from '../../../setup-test'
import ComponentUnderTest from './basic.vue'

describe('Rating Group', () => {
  it.each(getParts(qrCodeAnatomy))('should render part! %s', async (part) => {
    render(ComponentUnderTest)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(qrCodeAnatomy))('should export %s', async (part) => {
    expect(QrCode[part]).toBeDefined()
  })
})
