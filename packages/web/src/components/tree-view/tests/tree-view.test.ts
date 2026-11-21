import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as AsyncLoading } from '../../../../examples/tree-view/async-loading.js'
import { mount } from '../../../test-utils.js'
import { createTreeCollection } from '@ark-ui/web/tree-view'

const user = userEvent.setup()

const texts = (elements: Iterable<Element>) => Array.from(elements, (element) => element.textContent?.trim())

interface File {
  id: string
  name: string
  files?: File[]
}

test('tree view renders bare nodes from a collection and updates when it is replaced', async () => {
  mount((root) => {
    root.innerHTML = /* html */ `
      <ark-tree-view default-expanded-value="docs">
        <ark-tree-view-tree></ark-tree-view-tree>
      </ark-tree-view>`
  })
  const treeView = document.querySelector('ark-tree-view')!
  const items = () => document.querySelectorAll('ark-tree-view-node-text')

  treeView.collection = createTreeCollection<File>({
    rootNode: {
      id: 'root',
      name: '',
      files: [
        { id: 'docs', name: 'Docs', files: [{ id: 'docs/intro', name: 'Intro' }] },
        { id: 'readme', name: 'README' },
      ],
    },
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    nodeToChildren: (node) => node.files ?? [],
  })

  await waitFor(() => expect(texts(items())).toEqual(['Docs', 'Intro', 'README']))
  await waitFor(() => expect(screen.getByText('Intro', { exact: true })).toBeVisible())
  expect(document.querySelectorAll('ark-tree-view-node-group[value="docs"]')).toHaveLength(1)

  treeView.collection = createTreeCollection({
    rootNode: { value: 'root', label: '', children: [{ value: 'changelog', label: 'CHANGELOG' }] },
  })
  await waitFor(() => expect(texts(items())).toEqual(['CHANGELOG']))
})

test('tree view loads children into a new collection', async () => {
  mount(AsyncLoading)

  await user.click(await screen.findByText('src', { exact: true }))

  await waitFor(() => expect(screen.getByText('index.ts', { exact: true })).toBeVisible())
  expect(document.querySelector('output')).toHaveTextContent('Files loaded.')
})
