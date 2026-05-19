import { createTreeCollection, type TreeCollection } from '@ark-ui/angular/src/collection'

export interface FileTreeNode {
  id: string
  name: string
  children?: FileTreeNode[]
}

export interface AsyncTreeNode {
  id: string
  name: string
  children?: AsyncTreeNode[]
  childrenCount?: number
}

export const fileTreeCollection = createTreeCollection<FileTreeNode>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  nodeToChildren: (node) => node.children ?? [],
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      {
        id: 'node_modules',
        name: 'node_modules',
        children: [
          { id: 'node_modules/zag-js', name: 'zag-js' },
          { id: 'node_modules/pandacss', name: 'panda' },
          {
            id: 'node_modules/@types',
            name: '@types',
            children: [
              { id: 'node_modules/@types/react', name: 'react' },
              { id: 'node_modules/@types/react-dom', name: 'react-dom' },
            ],
          },
        ],
      },
      {
        id: 'src',
        name: 'src',
        children: [
          { id: 'src/app.tsx', name: 'app.tsx' },
          { id: 'src/index.ts', name: 'index.ts' },
        ],
      },
      { id: 'panda.config', name: 'panda.config.ts' },
      { id: 'package.json', name: 'package.json' },
      { id: 'renovate.json', name: 'renovate.json' },
      { id: 'readme.md', name: 'README.md' },
    ],
  },
})

export const initialAsyncCollection = createTreeCollection<AsyncTreeNode>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  nodeToChildren: (node) => node.children ?? [],
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      { id: 'node_modules', name: 'node_modules', childrenCount: 3 },
      { id: 'src', name: 'src', childrenCount: 2 },
      { id: 'panda.config', name: 'panda.config.ts' },
      { id: 'package.json', name: 'package.json' },
      { id: 'renovate.json', name: 'renovate.json' },
      { id: 'readme.md', name: 'README.md' },
    ],
  },
})

export const asyncChildrenByPath: Record<string, AsyncTreeNode[]> = {
  node_modules: [
    { id: 'node_modules/zag-js', name: 'zag-js' },
    { id: 'node_modules/pandacss', name: 'panda' },
    { id: 'node_modules/@types', name: '@types', childrenCount: 2 },
  ],
  'node_modules/@types': [
    { id: 'node_modules/@types/react', name: 'react' },
    { id: 'node_modules/@types/react-dom', name: 'react-dom' },
  ],
  src: [
    { id: 'src/app.tsx', name: 'app.tsx' },
    { id: 'src/index.ts', name: 'index.ts' },
  ],
}

export function childIndexPath(indexPath: number[], index: number): number[] {
  return [...indexPath, index]
}

export function isBranch(node: FileTreeNode | AsyncTreeNode): boolean {
  return Boolean(node.children?.length || ('childrenCount' in node && node.childrenCount))
}

export function replaceNodeName(
  collection: TreeCollection<FileTreeNode>,
  indexPath: number[],
  name: string,
): TreeCollection<FileTreeNode> {
  const node = collection.at(indexPath)
  if (!node) return collection
  return collection.replace(indexPath, { ...node, name })
}
