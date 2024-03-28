import { treeViewAnatomy } from '@ark-ui/anatomy'
import { render } from '@solidjs/testing-library'
import { TreeView } from '..'
import { getExports, getParts } from '../../setup-test'
import { ComponentUnderTest } from './basic'

describe('TreeView', () => {
  it.each(getParts(treeViewAnatomy))('should render part %s', async (part) => {
    render(() => <ComponentUnderTest />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(treeViewAnatomy))('should export %s', async (part) => {
    expect(TreeView[part]).toBeDefined()
  })
})
