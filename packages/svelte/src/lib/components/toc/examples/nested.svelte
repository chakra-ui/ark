<script lang="ts">
  import { Toc } from '@ark-ui/svelte/toc'
  import styles from 'styles/toc.module.css'

  const items = [
    { value: 'introduction', depth: 2, label: 'Introduction', lines: 10 },
    { value: 'getting-started', depth: 2, label: 'Getting Started', lines: 12 },
    { value: 'installation', depth: 3, label: 'Installation', lines: 8 },
    { value: 'configuration', depth: 3, label: 'Configuration', lines: 14 },
    { value: 'api-reference', depth: 2, label: 'API Reference', lines: 10 },
    { value: 'hooks', depth: 3, label: 'Hooks', lines: 8 },
    { value: 'components', depth: 3, label: 'Components', lines: 12 },
    { value: 'examples', depth: 2, label: 'Examples', lines: 10 },
  ]

  const tagMap = { 2: 'h2', 3: 'h3', 4: 'h4' } as const

  let contentEl: HTMLElement | null = $state(null)
</script>

<Toc.Root class={styles.Root} {items} getScrollEl={() => contentEl}>
  <Toc.Content bind:ref={contentEl} class={styles.Content}>
    {#each items as item (item.value)}
      <section>
        <svelte:element this={tagMap[item.depth as 2 | 3 | 4] ?? 'h2'} id={item.value}>
          {item.label}
        </svelte:element>
        <div class={styles.DummyText}>
          {#each { length: item.lines } as _}
            <div class={styles.DummyLine} />
          {/each}
        </div>
      </section>
    {/each}
  </Toc.Content>
  <Toc.Nav class={styles.Nav}>
    <Toc.Title class={styles.Title}>On this page</Toc.Title>
    <Toc.List class={styles.List}>
      {#each items as item (item.value)}
        <Toc.Item class={item.depth > 2 ? styles.ItemNested : styles.Item} {item}>
          <Toc.Link class={styles.Link} href={`#${item.value}`}>{item.label}</Toc.Link>
        </Toc.Item>
      {/each}
    </Toc.List>
  </Toc.Nav>
</Toc.Root>
