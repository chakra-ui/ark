import { signaturePadAnatomy } from '@ark-ui/anatomy'
import { render } from '@solidjs/testing-library'
import { SignaturePad } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('SignaturePad / Parts & Exports', () => {
  const renderedParts = getParts(signaturePadAnatomy).filter(
    (part) => !part.includes('[data-part="segment-path"]'),
  )

  it.each(renderedParts)('should render part %s', async (part) => {
    render(() => <ComponentUnderTest />)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.skip.each(getExports(signaturePadAnatomy))('should export %s', async (part) => {
    // @ts-expect-error
    expect(SignaturePad[part]).toBeDefined()
  })
})
