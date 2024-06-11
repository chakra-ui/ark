import { qrCodeAnatomy } from '@ark-ui/anatomy'
import { render } from '@solidjs/testing-library'
import { QrCode } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('QrCode', () => {
  it.each(getParts(qrCodeAnatomy))('should render part %s', async (part) => {
    render(() => <ComponentUnderTest />)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(qrCodeAnatomy))('should export %s', async (part) => {
    expect(QrCode[part]).toBeDefined()
  })
})
