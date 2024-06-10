import { signaturePadAnatomy } from '@ark-ui/anatomy'
import { SignaturePad } from '..'
import { getExports } from '../../../setup-test'

describe('Signature Pad', () => {
  // const renderedParts = getParts(signaturePadAnatomy).filter(
  //   (part) => !part.includes('[data-part="segment-path"]'),
  // )
  // it.each(getParts(renderedParts))('should render part! %s', async (part) => {
  //   render(ComponentUnderTest)

  //   expect(document.querySelector(part)).toBeInTheDocument()
  // })

  it.skip.each(getExports(signaturePadAnatomy))('should export %s', async (part) => {
    // @ts-expect-error
    expect(SignaturePad[part]).toBeDefined()
  })
})
