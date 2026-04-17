import { Toc } from '@ark-ui/solid/toc'
import { Swap } from '@ark-ui/solid/swap'
import { Pin, PinOff } from 'lucide-solid'
import { Index, createSignal } from 'solid-js'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction', lines: 12 },
  { value: 'getting-started', depth: 2, label: 'Getting Started', lines: 10 },
  { value: 'installation', depth: 2, label: 'Installation', lines: 8 },
  { value: 'usage', depth: 2, label: 'Usage', lines: 14 },
  { value: 'conclusion', depth: 2, label: 'Conclusion', lines: 10 },
]

export const WithHover = () => {
  const [pinned, setPinned] = createSignal(false)
  const [hovered, setHovered] = createSignal(false)

  return (
    <Toc.Root class={`${styles.Root} ${styles.HoverRoot}`} items={items} rootMargin="0px 0px -80% 0px">
      <Toc.Content class={styles.Content}>
        <div class={styles.ContentSection}>
          <Index each={items}>
            {(item) => (
              <section>
                <h2 id={item().value}>{item().label}</h2>
                <div class={styles.DummyText}>
                  <Index each={Array.from({ length: item().lines })}>{() => <div class={styles.DummyLine} />}</Index>
                </div>
              </section>
            )}
          </Index>
        </div>
      </Toc.Content>
      <Toc.Nav
        class={styles.NavHover}
        data-expanded={hovered() || pinned() || undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button
          type="button"
          class={styles.PinButton}
          onClick={() => setPinned((v) => !v)}
          aria-label={pinned() ? 'Unpin navigation' : 'Pin navigation'}
        >
          <Swap.Root swap={pinned()}>
            <Swap.Indicator type="on">
              <PinOff size={12} />
            </Swap.Indicator>
            <Swap.Indicator type="off">
              <Pin size={12} />
            </Swap.Indicator>
          </Swap.Root>
        </button>

        <Swap.Root class={styles.HoverSwap} swap={hovered() || pinned()}>
          <Swap.Indicator type="off">
            <div class={styles.HoverSkeletons}>
              {items.map((item) => (
                <span
                  class={styles.SkeletonBar}
                  style={{ width: `${Math.min(Math.max(item.label.length * 3, 16), 48)}px` }}
                />
              ))}
            </div>
          </Swap.Indicator>
          <Swap.Indicator type="on">
            <div>
              <Toc.List class={styles.HoverList}>
                {items.map((item) => (
                  <Toc.Item item={item} class={styles.Item}>
                    <Toc.Link class={styles.HoverLink} href={`#${item.value}`}>
                      {item.label}
                    </Toc.Link>
                  </Toc.Item>
                ))}
              </Toc.List>
            </div>
          </Swap.Indicator>
        </Swap.Root>
      </Toc.Nav>
    </Toc.Root>
  )
}
