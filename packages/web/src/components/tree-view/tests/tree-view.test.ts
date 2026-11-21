import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/test-fixtures/index.html')
})

test('tree view renders bare nodes from a collection and updates when it is replaced', async ({ page }) => {
  await page.setContent(/* html */ `
    <ark-tree-view default-expanded-value="docs">
      <ark-tree-view-tree></ark-tree-view-tree>
    </ark-tree-view>`)
  await page.evaluate(() => {
    const { createTreeCollection } = window as unknown as typeof import('../../../index.js')
    document.querySelector('ark-tree-view')!.collection = createTreeCollection({
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
  })
  const items = page.locator('ark-tree-view-node-text')
  await expect(items).toHaveText(['Docs', 'Intro', 'README'])
  await expect(page.getByText('Intro', { exact: true })).toBeVisible()
  await expect(page.locator('ark-tree-view-node-group[value="docs"]')).toHaveCount(1)

  await page.evaluate(() => {
    const { createTreeCollection } = window as unknown as typeof import('../../../index.js')
    document.querySelector('ark-tree-view')!.collection = createTreeCollection({
      rootNode: { value: 'root', label: '', children: [{ value: 'changelog', label: 'CHANGELOG' }] },
    })
  })
  await expect(items).toHaveCount(1)
  await expect(items).toHaveText('CHANGELOG')
})

test('tree view loads children into a new collection', async ({ page }) => {
  await page.goto('/iframe.html?id=components-tree-view--async-loading&viewMode=story')
  await page.getByText('src', { exact: true }).click()
  await expect(page.getByText('index.ts', { exact: true })).toBeVisible()
  await expect(page.locator('output')).toHaveText('Files loaded.')
})
