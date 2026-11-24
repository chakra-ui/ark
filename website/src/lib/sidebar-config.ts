export interface SidebarItemConfig {
  id: string
  title?: string
}

export interface SidebarGroupConfig {
  title: string
  id?: string
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
    title: 'Get Started',
    groups: [
      {
        title: 'Overview',
        items: [
          { id: 'getting-started' },
          { id: 'upgrade-guide' },
          { id: 'changelog' },
          { id: 'about', title: 'About' },
        ],
      },
      {
        title: 'AI for agents',
        items: [{ id: 'mcp-server', title: 'MCP Server' }, { id: 'llms.txt' }],
      },
    ],
  },
  {
    key: 'components',
    title: 'Components',
    groups: [
      {
        title: 'Guides',
        items: [
          { id: 'styling' },
          { id: 'composition' },
          { id: 'component-state' },
          { id: 'animation' },
          { id: 'forms' },
          { id: 'virtualization' },
          { id: 'ref', title: 'Refs' },
        ],
      },
      {
        title: 'Components',
        id: 'components-overview',
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
          { id: 'command' },
          { id: 'date-input' },
          { id: 'date-picker' },
          { id: 'dialog' },
          { id: 'drawer' },
          { id: 'editable' },
          { id: 'field' },
          { id: 'fieldset' },
          { id: 'file-upload' },
          { id: 'floating-panel' },
          { id: 'hover-card' },
          { id: 'image-cropper' },
          { id: 'json-tree-view', title: 'JSON Tree View' },
          { id: 'listbox' },
          { id: 'marquee' },
          { id: 'menu' },
          { id: 'menubar' },
          { id: 'meter' },
          { id: 'navigation-menu' },
          { id: 'number-flow' },
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
          { id: 'swap' },
          { id: 'switch' },
          { id: 'toc' },
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
    ],
  },
  {
    key: 'utilities',
    title: 'Utilities',
    groups: [
      {
        title: 'Utilities',
        id: 'utilities-overview',
        items: [
          { id: 'client-only' },
          { id: 'download-trigger' },
          { id: 'environment' },
          { id: 'focus-trap' },
          { id: 'format-byte' },
          { id: 'format-number' },
          { id: 'format-relative-time' },
          { id: 'format-time' },
          { id: 'frame' },
          { id: 'highlight' },
          { id: 'hotkeys' },
          { id: 'locale' },
          { id: 'presence' },
          { id: 'virtualizer' },
        ],
      },
      {
        title: 'Collections',
        items: [{ id: 'list-collection' }, { id: 'tree-collection' }, { id: 'async-list' }, { id: 'list-selection' }],
      },
    ],
  },
]
