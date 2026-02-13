export interface SidebarItemConfig {
  id: string
  title?: string
}

export interface SidebarGroupConfig {
  title: string
  items: SidebarItemConfig[]
}

export const sidebarConfig: SidebarGroupConfig[] = [
  {
    title: 'Overview',
    items: [{ id: 'getting-started' }, { id: 'changelog' }, { id: 'about', title: 'About' }],
  },
  {
    title: 'Guides',
    items: [
      { id: 'styling' },
      { id: 'composition' },
      { id: 'component-state' },
      { id: 'animation' },
      { id: 'forms' },
      { id: 'ref', title: 'Refs' },
    ],
  },
  {
    title: 'AI for agents',
    items: [{ id: 'mcp-server', title: 'MCP Server' }, { id: 'llms.txt' }],
  },
  {
    title: 'Collections',
    items: [{ id: 'list-collection' }, { id: 'tree-collection' }, { id: 'async-list' }, { id: 'list-selection' }],
  },
  {
    title: 'Components',
    items: [
      { id: 'accordion' },
      { id: 'angle-slider' },
      { id: 'avatar' },
      { id: 'carousel' },
      { id: 'checkbox' },
      { id: 'clipboard' },
      { id: 'collapsible' },
      { id: 'color-picker' },
      { id: 'combobox' },
      { id: 'date-picker' },
      { id: 'dialog' },
      { id: 'editable' },
      { id: 'field' },
      { id: 'fieldset' },
      { id: 'file-upload' },
      { id: 'floating-panel' },
      { id: 'image-cropper' },
      { id: 'hover-card' },
      { id: 'listbox' },
      { id: 'marquee' },
      { id: 'menu' },
      { id: 'number-input' },
      { id: 'pagination' },
      { id: 'password-input' },
      { id: 'pin-input' },
      { id: 'popover' },
      { id: 'progress-circular' },
      { id: 'progress-linear' },
      { id: 'qr-code', title: 'QR Code' },
      { id: 'radio-group' },
      { id: 'rating-group' },
      { id: 'scroll-area' },
      { id: 'segment-group' },
      { id: 'select' },
      { id: 'signature-pad' },
      { id: 'slider' },
      { id: 'splitter' },
      { id: 'steps' },
      { id: 'switch' },
      { id: 'tabs' },
      { id: 'tags-input' },
      { id: 'timer' },
      { id: 'toast' },
      { id: 'toggle' },
      { id: 'toggle-group' },
      { id: 'tooltip' },
      { id: 'tour' },
      { id: 'tree-view' },
    ],
  },
  {
    title: 'Utilities',
    items: [
      { id: 'client-only' },
      { id: 'download-trigger' },
      { id: 'environment' },
      { id: 'focus-trap' },
      { id: 'format-byte' },
      { id: 'format-number' },
      { id: 'format-relative-time' },
      { id: 'frame' },
      { id: 'highlight' },
      { id: 'json-tree-view', title: 'JSON Tree View' },
      { id: 'locale' },
      { id: 'presence' },
    ],
  },
]
