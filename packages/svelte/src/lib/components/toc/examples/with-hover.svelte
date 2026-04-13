<script lang="ts">
  import { Swap } from '@ark-ui/svelte/swap'
  import { Toc } from '@ark-ui/svelte/toc'
  import { loremIpsum } from 'lorem-ipsum'
  import { PinIcon, PinOffIcon } from 'lucide-svelte'
  import styles from 'styles/toc.module.css'

  const p = loremIpsum({ count: 10, units: 'paragraphs' })

  const items = [
    { value: 'introduction', depth: 2, label: 'Introduction' },
    { value: 'getting-started', depth: 2, label: 'Getting Started' },
    { value: 'installation', depth: 2, label: 'Installation' },
    { value: 'usage', depth: 2, label: 'Usage' },
    { value: 'api', depth: 2, label: 'API' },
    { value: 'examples', depth: 2, label: 'Examples' },
  ]

  let pinned = $state(false)
  let hovered = $state(false)
</script>

<div class="{styles.Root} {styles.HoverRoot}">
  <article class={styles.Content}>
    {#each items as item (item.value)}
      <section>
        <h2 id={item.value}>{item.label}</h2>
        <p>{p}</p>
      </section>
    {/each}
  </article>
  <Toc.Nav
    class={styles.NavHover}
    {items}
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
                <Toc.Link class={styles.HoverLink}>{item.label}</Toc.Link>
              </Toc.Item>
            {/each}
          </Toc.List>
        </div>
      </Swap.Indicator>
    </Swap.Root>
  </Toc.Nav>
</div>
