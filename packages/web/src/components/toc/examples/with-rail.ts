import '@ark-ui/web/toc'

import styles from 'styles/toc.module.css'

interface Item {
  value: string
  depth: number
  label: string
  lines: number
}

const items: Item[] = [
  { value: '07-overview', depth: 2, label: 'Overview', lines: 10 },
  { value: '07-installation', depth: 2, label: 'Installation', lines: 8 },
  { value: '07-package-manager', depth: 3, label: 'Package Manager', lines: 12 },
  { value: '07-peer-dependencies', depth: 3, label: 'Peer Dependencies', lines: 6 },
  { value: '07-usage', depth: 2, label: 'Usage', lines: 14 },
  { value: '07-server-components', depth: 3, label: 'Server Components', lines: 9 },
  { value: '07-styling', depth: 3, label: 'Styling', lines: 11 },
  { value: '07-theming', depth: 4, label: 'Theming', lines: 7 },
  { value: '07-api-reference', depth: 2, label: 'API Reference', lines: 12 },
]

const BASE = 8
const RAIL_STEP = 8
const TEXT_STEP = 12
const MAX_LEVEL = 2
const BRIDGE = 6

const levelOf = (depth: number) => Math.min(Math.max(depth - 2, 0), MAX_LEVEL)
const lineOffset = (depth: number) => BASE + levelOf(depth) * RAIL_STEP
const textOffset = (depth: number) => BASE + (levelOf(depth) + 1) * TEXT_STEP

const rail = (depth: number, prevDepth = depth, nextDepth = depth) => {
  const line = lineOffset(depth)
  const prevLine = lineOffset(prevDepth)
  const turns = prevLine !== line
  const height = line === lineOffset(nextDepth) ? `calc(100% + ${BRIDGE}px)` : '100%'
  const turn = turns
    ? `<path d="M ${prevLine + 0.5} 0 C ${prevLine + 0.5} 8 ${line + 0.5} 4 ${line + 0.5} ${BRIDGE * 2}" fill="none" />`
    : ''
  return /* html */ `
    <svg class="${styles.RailSvg}" style="top: -${BRIDGE}px; width: ${Math.max(prevLine, line) + 9}px; height: ${height}" aria-hidden="true">
      ${turn}<line x1="${line + 0.5}" y1="${turns ? BRIDGE * 2 : BRIDGE}" x2="${line + 0.5}" y2="100%" />
    </svg>`
}

const section = (item: Item, tag = 'h2') => /* html */ `
  <section>
    <${tag} id="${item.value}" class="${styles.Heading}" data-depth="${item.depth}">${item.label}</${tag}>
    <div class="${styles.DummyText}">${`<div class="${styles.DummyLine}"></div>`.repeat(item.lines)}</div>
  </section>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-toc class="${styles.Root}">
    <ark-toc-content class="${styles.Content}">${items.map((item) => section(item)).join('')}</ark-toc-content>
    <ark-toc-nav class="${styles.Nav}">
      <ark-toc-title class="${styles.Title}">On this page</ark-toc-title>
      <ark-toc-list class="${styles.RailList}">
        ${items
          .map(
            (item, index) => /* html */ `
        <ark-toc-item class="${styles.RailItem}" value="${item.value}" depth="${item.depth}">
          <ark-toc-link>
            <a class="${styles.RailLink}" href="#${item.value}" style="padding-inline-start: ${textOffset(item.depth)}px">
              ${rail(item.depth, items[index - 1]?.depth, items[index + 1]?.depth)}${item.label}
            </a>
          </ark-toc-link>
        </ark-toc-item>`,
          )
          .join('')}
      </ark-toc-list>
    </ark-toc-nav>
  </ark-toc>`
}
