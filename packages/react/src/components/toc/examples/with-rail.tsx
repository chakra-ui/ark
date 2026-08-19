import { Toc } from '@ark-ui/react/toc'
import { useRef } from 'react'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'overview', depth: 2, label: 'Overview', lines: 10 },
  { value: 'installation', depth: 2, label: 'Installation', lines: 8 },
  { value: 'package-manager', depth: 3, label: 'Package Manager', lines: 12 },
  { value: 'peer-dependencies', depth: 3, label: 'Peer Dependencies', lines: 6 },
  { value: 'usage', depth: 2, label: 'Usage', lines: 14 },
  { value: 'server-components', depth: 3, label: 'Server Components', lines: 9 },
  { value: 'styling', depth: 3, label: 'Styling', lines: 11 },
  { value: 'theming', depth: 4, label: 'Theming', lines: 7 },
  { value: 'api-reference', depth: 2, label: 'API Reference', lines: 12 },
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
  const { depth, prevDepth = depth, nextDepth = depth } = props
  const line = lineOffset(depth)
  const prevLine = lineOffset(prevDepth)
  const nextLine = lineOffset(nextDepth)
  const turns = prevLine !== line

  return (
    <svg
      className={styles.RailSvg}
      style={{
        top: -BRIDGE,
        width: Math.max(prevLine, line) + 9,
        height: line === nextLine ? `calc(100% + ${BRIDGE}px)` : '100%',
      }}
      aria-hidden="true"
    >
      {turns && (
        <path
          d={`M ${prevLine + 0.5} 0 C ${prevLine + 0.5} 8 ${line + 0.5} 4 ${line + 0.5} ${BRIDGE * 2}`}
          fill="none"
        />
      )}
      <line x1={line + 0.5} y1={turns ? BRIDGE * 2 : BRIDGE} x2={line + 0.5} y2="100%" />
    </svg>
  )
}

export const WithRail = () => {
  const contentRef = useRef<HTMLElement | null>(null)

  return (
    <Toc.Root className={styles.Root} items={items} scrollEl={() => contentRef.current}>
      <Toc.Content className={styles.Content} ref={contentRef}>
        {items.map((item) => (
          <section key={item.value}>
            <h2 id={item.value} className={styles.Heading} data-depth={item.depth}>
              {item.label}
            </h2>
            <div className={styles.DummyText}>
              {Array.from({ length: item.lines }).map((_, i) => (
                <div key={i} className={styles.DummyLine} />
              ))}
            </div>
          </section>
        ))}
      </Toc.Content>

      <Toc.Nav className={styles.Nav}>
        <Toc.Title className={styles.Title}>On this page</Toc.Title>
        <Toc.List className={styles.RailList}>
          {items.map((item, index) => (
            <Toc.Item className={styles.RailItem} key={item.value} item={item}>
              <Toc.Link
                className={styles.RailLink}
                href={`#${item.value}`}
                style={{ paddingInlineStart: textOffset(item.depth) }}
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
