import { signaturePadAnatomy } from '@ark-ui/anatomy'
import { cleanup, render } from '@testing-library/react/pure'
import { axe } from 'vitest-axe'
import { SignaturePad } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('SignaturePad / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  const renderedParts = getParts(signaturePadAnatomy).filter(
    (part) => !part.includes('[data-part="segment-path"]'),
  )

  it.each(renderedParts)('should render part %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.skip.each(getExports(signaturePadAnatomy))('should export %s', async (part) => {
    // @ts-expect-error
    expect(SignaturePad[part]).toBeDefined()
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
