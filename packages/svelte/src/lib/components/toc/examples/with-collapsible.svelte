<script lang="ts">
  import { Collapsible } from '@ark-ui/svelte/collapsible'
  import { Toc } from '@ark-ui/svelte/toc'
  import { loremIpsum } from 'lorem-ipsum'
  import { ChevronRightIcon } from 'lucide-svelte'
  import collapsibleStyles from 'styles/collapsible.module.css'
  import styles from 'styles/toc.module.css'

  const p = loremIpsum({ count: 7, units: 'paragraphs' })

  const items = [
    { value: 'introduction', depth: 2, label: 'Introduction' },
    { value: 'installation', depth: 2, label: 'Installation' },
    { value: 'usage', depth: 2, label: 'Usage' },
    { value: 'api-reference', depth: 2, label: 'API Reference' },
    { value: 'examples', depth: 2, label: 'Examples' },
  ]

  const RADIUS = 14
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS
</script>

<Toc.Root class="{styles.Root} {styles.RootStacked}" {items}>
  <Toc.Content class={styles.Content}>
    {#each items as item (item.value)}
      <section>
        <h2 id={item.value}>{item.label}</h2>
        <p>{p}</p>
      </section>
    {/each}
  </Toc.Content>
  <Toc.Nav class={styles.Nav}>
    <Collapsible.Root class={collapsibleStyles.Root} style="width: 100%">
      <Toc.Context>
        {#snippet render(toc)}
          {@const activeIndex = toc().activeItems[0]
            ? items.findIndex((i) => i.value === toc().activeItems[0].value)
            : -1}
          {@const progress = activeIndex >= 0 ? (activeIndex + 1) / items.length : 0}
          {@const dashArray = `${progress * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
          <Collapsible.Trigger class={collapsibleStyles.Trigger}>
            <span class={styles.TriggerContent}>
              <span class={styles.ProgressRing}>
                <svg width="28" height="28" viewBox="0 0 36 36" aria-hidden="true">
                  <circle cx="18" cy="18" r={RADIUS} fill="none" stroke="currentColor" stroke-opacity="0.2" stroke-width="2.5" />
                  <circle
                    cx="18"
                    cy="18"
                    r={RADIUS}
                    fill="none"
                    stroke="var(--demo-coral-solid)"
                    stroke-width="2.5"
                    stroke-dasharray={dashArray}
                    stroke-linecap="round"
                    transform="rotate(-90 18 18)"
                    style="transition: stroke-dasharray 0.4s ease-out"
                  />
                  <text
                    x="18"
                    y="18"
                    text-anchor="middle"
                    dominant-baseline="central"
                    font-size="10"
                    font-weight="600"
                    fill="currentColor"
                    class={styles.ProgressIndexText}
                  >
                    {activeIndex >= 0 ? activeIndex + 1 : '—'}
                  </text>
                </svg>
              </span>
              <span class={styles.TriggerLabel}>
                {activeIndex >= 0 ? items[activeIndex].label : 'On this page'}
              </span>
            </span>
            <Collapsible.Indicator class={collapsibleStyles.Indicator}>
              <ChevronRightIcon />
            </Collapsible.Indicator>
          </Collapsible.Trigger>
        {/snippet}
      </Toc.Context>
      <Collapsible.Content class={collapsibleStyles.Content}>
        <Toc.List class={styles.List}>
          {#each items as item, index (item.value)}
            <Toc.Item class={styles.Item} {item}>
              <Toc.Link class={styles.LinkNumbered} href={`#${item.value}`}>
                <span class={styles.Number}>{String(index + 1).padStart(2, '0')}</span>
                {item.label}
              </Toc.Link>
            </Toc.Item>
          {/each}
        </Toc.List>
      </Collapsible.Content>
    </Collapsible.Root>
  </Toc.Nav>
</Toc.Root>
