import { splitterAnatomy } from '@ark-ui/anatomy'
// eslint-disable-next-line testing-library/no-manual-cleanup
import { cleanup, render } from '@testing-library/react/pure'
import { Splitter } from '../'
import { getExports, getParts } from '../../setup-test'
import { ComponentUnderTest } from './basic'

describe('Splitter / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(splitterAnatomy))('should render part! %s', async (part) => {
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(splitterAnatomy))('should export %s', async (part) => {
    expect(Splitter[part]).toBeDefined()
  })
})
