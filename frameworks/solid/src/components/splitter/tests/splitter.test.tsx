import { splitterAnatomy } from '@ark-ui/anatomy'
import { render } from '@solidjs/testing-library'
import { getExports, getParts } from '~/setup-test'
import { Splitter } from '../'
import { ComponentUnderTest } from './basic'

describe('Splitter', () => {
  it.each(getParts(splitterAnatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(splitterAnatomy))('should export %s', async (part) => {
    expect(Splitter[part]).toBeDefined()
  })
})
