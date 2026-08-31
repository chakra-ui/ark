import { Toc } from '@ark-ui/solid/toc'
import { Show } from 'solid-js'
import styles from 'styles/toc.module.css'

const items = [
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

// h2 sits at level 0; deeper headings step in, clamped so h5+ share h4's indent
const BASE = 8
const RAIL_STEP = 8
const TEXT_STEP = 12
const MAX_LEVEL = 2

// the rail overlaps the row above by BRIDGE px so the turn can straddle the boundary
const BRIDGE = 6

const levelOf = (depth: number) => Math.min(Math.max(depth - 2, 0), MAX_LEVEL)
const lineOffset = (depth: number) => BASE + levelOf(depth) * RAIL_STEP
const textOffset = (depth: number) => BASE + (levelOf(depth) + 1) * TEXT_STEP

const Rail = (props: { depth: number; prevDepth?: number; nextDepth?: number }) => {
  const line = () => lineOffset(props.depth)
  const prevLine = () => lineOffset(props.prevDepth ?? props.depth)
  const nextLine = () => lineOffset(props.nextDepth ?? props.depth)
  const turns = () => prevLine() !== line()

  return (
    <svg
      class={styles.RailSvg}
      style={{
        top: `${-BRIDGE}px`,
        width: `${Math.max(prevLine(), line()) + 9}px`,
        height: line() === nextLine() ? `calc(100% + ${BRIDGE}px)` : '100%',
      }}
      aria-hidden="true"
    >
      <Show when={turns()}>
        <path
          d={`M ${prevLine() + 0.5} 0 C ${prevLine() + 0.5} 8 ${line() + 0.5} 4 ${line() + 0.5} ${BRIDGE * 2}`}
          fill="none"
        />
      </Show>
      <line x1={line() + 0.5} y1={turns() ? BRIDGE * 2 : BRIDGE} x2={line() + 0.5} y2="100%" />
    </svg>
  )
}

export const WithRail = () => {
  let contentRef: HTMLElement | null = null

  return (
    <Toc.Root class={styles.Root} items={items} scrollEl={() => contentRef}>
      <Toc.Content class={styles.Content} ref={(el) => (contentRef = el)}>
        {items.map((item) => (
          <section>
            <h2 id={item.value} class={styles.Heading} data-depth={item.depth}>
              {item.label}
            </h2>
            <div class={styles.DummyText}>
              {[...Array(item.lines)].map(() => (
                <div class={styles.DummyLine} />
              ))}
            </div>
          </section>
        ))}
      </Toc.Content>

      <Toc.Nav class={styles.Nav}>
        <Toc.Title class={styles.Title}>On this page</Toc.Title>
        <Toc.List class={styles.RailList}>
          {items.map((item, index) => (
            <Toc.Item class={styles.RailItem} item={item}>
              <Toc.Link
                class={styles.RailLink}
                href={`#${item.value}`}
                style={{ 'padding-inline-start': `${textOffset(item.depth)}px` }}
              >
                <Rail depth={item.depth} prevDepth={items[index - 1]?.depth} nextDepth={items[index + 1]?.depth} />
                {item.label}
              </Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc.Root>
  )
}
