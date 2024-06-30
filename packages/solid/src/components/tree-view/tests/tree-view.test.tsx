import { render } from '@solidjs/testing-library'
import { TreeView, treeViewAnatomy } from '..'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('TreeView', () => {
  it.each(getParts(treeViewAnatomy))('should render part %s', async (part) => {
    render(() => <ComponentUnderTest />)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(treeViewAnatomy))('should export %s', async (part) => {
    expect(TreeView[part]).toBeDefined()
  })
})
