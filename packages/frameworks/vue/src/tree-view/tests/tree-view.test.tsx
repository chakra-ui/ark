import { treeViewAnatomy } from '@ark-ui/anatomy'
import { render } from '@testing-library/vue'
import { getParts } from '../../setup-test'
import ComponentUnderTest from './tree-view.test.vue'

describe('TreeView', () => {
  it.skip.each(getParts(treeViewAnatomy))('should render part %s', async (part) => {
    render(ComponentUnderTest)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  // it.each(getExports(treeViewAnatomy))('should export %s', async (part) => {
  //   expect(TreeView[part]).toBeDefined()
  // })
})
