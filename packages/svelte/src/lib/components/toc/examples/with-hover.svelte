<script lang="ts">
  import { Swap } from '@ark-ui/svelte/swap'
  import { Toc } from '@ark-ui/svelte/toc'
  import { PinIcon, PinOffIcon } from 'lucide-svelte'
  import styles from 'styles/toc.module.css'

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction', lines: 12 },
  { value: 'getting-started', depth: 2, label: 'Getting Started', lines: 10 },
  { value: 'installation', depth: 2, label: 'Installation', lines: 8 },
  { value: 'usage', depth: 2, label: 'Usage', lines: 14 },
  { value: 'conclusion', depth: 2, label: 'Conclusion', lines: 10 },
]

  let pinned = $state(false)
  let hovered = $state(false)
</script>

<Toc.Root class="{styles.Root} {styles.HoverRoot}" {items} rootMargin="0px 0px -80% 0px">
  <Toc.Content class={styles.Content}>
    <div class={styles.ContentSection}>
      {#each items as item (item.value)}
        <section>
          <h2 id={item.value}>{item.label}</h2>
          <div class={styles.DummyText}>
            {#each { length: item.lines } as _, i}
              <div class={styles.DummyLine} />
            {/each}
          </div>
        </section>
      {/each}
    </div>
  </Toc.Content>
  <Toc.Nav
    class={styles.NavHover}
    data-expanded={(hovered || pinned) || undefined}
    onmouseenter={() => (hovered = true)}
    onmouseleave={() => (hovered = false)}
  >
    <button
      type="button"
      class={styles.PinButton}
      onclick={() => (pinned = !pinned)}
      aria-label={pinned ? 'Unpin navigation' : 'Pin navigation'}
    >
      <Swap.Root swap={pinned}>
        <Swap.Indicator type="on">
          <PinOffIcon size={12} />
        </Swap.Indicator>
        <Swap.Indicator type="off">
          <PinIcon size={12} />
        </Swap.Indicator>
      </Swap.Root>
    </button>

    <Swap.Root class={styles.HoverSwap} swap={hovered || pinned}>
      <Swap.Indicator type="off">
        <div class={styles.HoverSkeletons}>
          {#each items as item (item.value)}
            <span
              class={styles.SkeletonBar}
              style="width: {Math.min(Math.max(item.label.length * 3, 16), 48)}px"
            ></span>
          {/each}
        </div>
      </Swap.Indicator>
      <Swap.Indicator type="on">
        <div>
          <Toc.List class={styles.HoverList}>
            {#each items as item (item.value)}
              <Toc.Item {item} class={styles.Item}>
                <Toc.Link class={styles.HoverLink} href={`#${item.value}`}>{item.label}</Toc.Link>
              </Toc.Item>
            {/each}
          </Toc.List>
        </div>
      </Swap.Indicator>
    </Swap.Root>
  </Toc.Nav>
</Toc.Root>
