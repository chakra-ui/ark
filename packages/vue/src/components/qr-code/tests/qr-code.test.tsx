import { render } from '@testing-library/vue'
import { anatomy } from '@zag-js/qrCode'
import { QrCode } from '../'
import { getExports, getParts } from '../../../setup-test'
import ComponentUnderTest from './basic.vue'

describe('Rating Group', () => {
  it.each(getParts(anatomy))('should render part! %s', async (part) => {
    render(ComponentUnderTest)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(anatomy))('should export %s', async (part) => {
    expect(QrCode[part]).toBeDefined()
  })
})
