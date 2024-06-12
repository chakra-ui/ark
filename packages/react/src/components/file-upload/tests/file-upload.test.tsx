import { fileUploadAnatomy } from '@ark-ui/anatomy'
import { cleanup, render } from '@testing-library/react/pure'
import { axe } from 'vitest-axe'
import { FileUpload } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('FileUpload / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(fileUploadAnatomy))('should render part! %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(fileUploadAnatomy))('should export %s', async (part) => {
    expect(FileUpload[part]).toBeDefined()
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
