export interface SidebarItemConfig {
  id: string
  title?: string
}

export interface SidebarGroupConfig {
  title: string
  items: SidebarItemConfig[]
}

export interface SidebarTabConfig {
  key: string
  title: string
  groups: SidebarGroupConfig[]
}

export const sidebarConfig: SidebarTabConfig[] = [
  {
    key: 'guides',
    title: 'Guides',
    groups: [
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
    ],
  },
  {
    key: 'components',
    title: 'Components',
    groups: [
      {
        title: 'Overview',
        items: [{ id: 'components-overview', title: 'Overview' }],
      },
      {
        title: 'Forms & Inputs',
        items: [
          { id: 'checkbox' },
          { id: 'field' },
          { id: 'fieldset' },
          { id: 'radio-group' },
          { id: 'switch' },
          { id: 'toggle' },
          { id: 'toggle-group' },
          { id: 'slider' },
          { id: 'angle-slider' },
          { id: 'number-input' },
          { id: 'pin-input' },
          { id: 'password-input' },
          { id: 'date-input' },
          { id: 'date-picker' },
          { id: 'editable' },
          { id: 'rating-group' },
          { id: 'segment-group' },
          { id: 'signature-pad' },
          { id: 'file-upload' },
          { id: 'color-picker' },
          { id: 'tags-input' },
          { id: 'combobox' },
          { id: 'select' },
          { id: 'listbox' },
        ],
      },
      {
        title: 'Overlays',
        items: [
          { id: 'dialog' },
          { id: 'drawer' },
          { id: 'popover' },
          { id: 'hover-card' },
          { id: 'tooltip' },
          { id: 'floating-panel' },
        ],
      },
      {
        title: 'Navigation',
        items: [
          { id: 'menu' },
          { id: 'menubar' },
          { id: 'navigation-menu' },
          { id: 'tabs' },
          { id: 'steps' },
          { id: 'pagination' },
          { id: 'tour' },
        ],
      },
      {
        title: 'Data Display',
        items: [
          { id: 'accordion' },
          { id: 'avatar' },
          { id: 'carousel' },
          { id: 'collapsible' },
          { id: 'qr-code', title: 'QR Code' },
          { id: 'tree-view' },
          { id: 'toc' },
          { id: 'marquee' },
          { id: 'image-cropper' },
          { id: 'scroll-area' },
          { id: 'splitter' },
          { id: 'clipboard' },
        ],
      },
      {
        title: 'Feedback',
        items: [{ id: 'progress-circular' }, { id: 'progress-linear' }, { id: 'toast' }, { id: 'timer' }],
      },
    ],
  },
  {
    key: 'utilities',
    title: 'Utilities',
    groups: [
      {
        title: 'Overview',
        items: [{ id: 'utilities-overview', title: 'Overview' }],
      },
      {
        title: 'Formatting',
        items: [{ id: 'format-byte' }, { id: 'format-number' }, { id: 'format-time' }, { id: 'format-relative-time' }],
      },
      {
        title: 'Utilities',
        items: [
          { id: 'client-only' },
          { id: 'download-trigger' },
          { id: 'environment' },
          { id: 'focus-trap' },
          { id: 'frame' },
          { id: 'highlight' },
          { id: 'hotkeys' },
          { id: 'json-tree-view', title: 'JSON Tree View' },
          { id: 'virtualizer' },
          { id: 'locale' },
          { id: 'presence' },
          { id: 'swap' },
        ],
      },
    ],
  },
]
