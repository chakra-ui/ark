import type { TransformResult } from '../../types.ts'

const TREE_VIEW_PARTS: Record<string, string> = {
  branch: '[data-tree-view-node-group]',
  'branch-content': '[data-tree-view-node-group-content]',
  'branch-control': '[data-tree-view-node][data-branch]',
  'branch-indent-guide': '[data-tree-view-indent-guide]',
  'branch-indicator': '[data-tree-view-node-indicator]',
  'branch-text': '[data-tree-view-node-text]',
  'branch-trigger': '[data-tree-view-node-expand-trigger]',
  item: '[data-tree-view-node]:not([data-branch])',
  'item-text': '[data-tree-view-node-text]',
}

const TREE_VIEW_V2_PARTS = new Set([
  'cell',
  'indent-guide',
  'label',
  'node',
  'node-checkbox',
  'node-expand-trigger',
  'node-group',
  'node-group-content',
  'node-indicator',
  'node-rename-input',
  'node-text',
  'root',
  'tree',
])

const FIELD_PARTS: Record<string, string> = {
  input: 'control',
  textarea: 'control',
  select: 'control',
  'required-indicator': 'indicator',
}

const toSelector = (scope: string, part: string) => {
  if (scope === 'field' && FIELD_PARTS[part]) return `[data-field-${FIELD_PARTS[part]}]`
  if (scope !== 'tree-view' && scope !== 'json-tree-view') return `[data-${scope}-${part}]`
  if (TREE_VIEW_PARTS[part]) return TREE_VIEW_PARTS[part]
  if (TREE_VIEW_V2_PARTS.has(part)) return `[data-tree-view-${part}]`
  return `[data-${scope}-${part}]`
}

export function cssDataAttributes(source: string, filePath: string): TransformResult {
  let count = 0

  let code = source

  code = code.replace(
    /\[data-scope=(["']?)([\w-]+)\1\]\[data-part=(["']?)([\w-]+)\3\]/g,
    (_m, _q1, scope, _q2, part) => {
      count++
      return toSelector(scope, part)
    },
  )
  code = code.replace(
    /\[data-part=(["']?)([\w-]+)\1\]\[data-scope=(["']?)([\w-]+)\3\]/g,
    (_m, _q1, part, _q2, scope) => {
      count++
      return toSelector(scope, part)
    },
  )

  code = code.replace(/\[data-(json-)?tree-view-([a-z-]+)\]/g, (match, json, part) => {
    const next = toSelector(json ? 'json-tree-view' : 'tree-view', part)
    if (next === match) return match
    count++
    return next
  })

  code = code.replace(
    /(\[data-image-cropper-handle\])\[data-position(?=[\]=~|^$*])|(\[data-floating-panel-resize-trigger\])\[data-axis(?=[\]=~|^$*])/g,
    (_m, handle, trigger) => {
      count++
      return `${handle ?? trigger}[data-placement`
    },
  )

  const pressed = filePath.endsWith('.css')
    ? /\[data-state=(["'])on\1\]/g
    : /(?<=\[data-(?:toggle-root|toggle-group-item)\])\[data-state=(["'])on\1\]/g
  code = code.replace(pressed, () => {
    count++
    return '[data-pressed]'
  })

  code = code.replace(/(\[data-(?:toggle-group|toolbar)-root\])\[data-focus\]/g, (_m, sel) => {
    count++
    return `${sel}:focus-within`
  })
  code = code.replace(/(\[data-(?:toggle-group|toolbar)-item\])\[data-focus\]/g, (_m, sel) => {
    count++
    return `${sel}:focus-visible`
  })

  return { code: count > 0 ? code : null, count, skipped: [] }
}
