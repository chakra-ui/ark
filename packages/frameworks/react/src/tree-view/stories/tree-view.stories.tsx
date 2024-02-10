import type { Meta } from '@storybook/react'
import { TreeView } from '../'

const meta: Meta = {
  title: 'Components / Tree View',
}

export default meta

export const Basic = () => {
  return (
    <TreeView.Root>
      <TreeView.Label>My Documents</TreeView.Label>
      <TreeView.Tree>
        <TreeView.Branch id="node_modules" depth={1}>
          <TreeView.BranchControl id="node_modules" depth={1}>
            <TreeView.BranchText id="node_modules" depth={1}>
              📂 node_modules
            </TreeView.BranchText>
          </TreeView.BranchControl>

          <TreeView.BranchContent id="node_modules" depth={1}>
            <TreeView.Item id="node_modules/zag-js" depth={2}>
              📄 zag-js
            </TreeView.Item>
            <TreeView.Item id="node_modules/pandacss" depth={2}>
              📄 panda
            </TreeView.Item>

            <TreeView.Branch id="node_modules/@types" depth={2}>
              <TreeView.BranchControl id="node_modules/@types" depth={2}>
                <TreeView.BranchText id="node_modules/@types" depth={2}>
                  📂 @types
                </TreeView.BranchText>
              </TreeView.BranchControl>

              <TreeView.BranchContent id="node_modules/@types" depth={2}>
                <TreeView.Item id="node_modules/@types/react" depth={3}>
                  📄 react
                </TreeView.Item>
                <TreeView.Item id="node_modules/@types/react-dom" depth={3}>
                  📄 react-dom
                </TreeView.Item>
              </TreeView.BranchContent>
            </TreeView.Branch>
          </TreeView.BranchContent>
        </TreeView.Branch>

        <TreeView.Branch id="src" depth={1}>
          <TreeView.BranchControl id="src" depth={1}>
            <TreeView.BranchText id="src" depth={1}>
              📂 src
            </TreeView.BranchText>
          </TreeView.BranchControl>

          <TreeView.BranchContent id="src" depth={1}>
            <TreeView.Item id="src/app.tsx" depth={2}>
              📄 app.tsx
            </TreeView.Item>
            <TreeView.Item id="src/index.ts" depth={2}>
              📄 index.ts
            </TreeView.Item>
          </TreeView.BranchContent>
        </TreeView.Branch>

        <TreeView.Item id="panda.config" depth={1}>
          📄 panda.config.ts
        </TreeView.Item>
        <TreeView.Item id="package.json" depth={1}>
          📄 package.json
        </TreeView.Item>
        <TreeView.Item id="renovate.json" depth={1}>
          📄 renovate.json
        </TreeView.Item>
        <TreeView.Item id="readme.md" depth={1}>
          📄 README.md
        </TreeView.Item>
      </TreeView.Tree>
    </TreeView.Root>
  )
}
