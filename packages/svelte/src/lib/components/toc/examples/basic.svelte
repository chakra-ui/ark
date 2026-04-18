<script lang="ts">
  import { Toc } from '@ark-ui/svelte/toc'
  import styles from 'styles/toc.module.css'

  const items = [
    { value: 'introduction', depth: 2, label: 'Introduction', lines: 12 },
    { value: 'getting-started', depth: 2, label: 'Getting Started', lines: 10 },
    { value: 'installation', depth: 2, label: 'Installation', lines: 8 },
    { value: 'usage', depth: 2, label: 'Usage', lines: 14 },
    { value: 'conclusion', depth: 2, label: 'Conclusion', lines: 10 },
  ]

  let contentEl: HTMLElement | null = $state(null)
</script>

<Toc.Root class={styles.Root} {items} getScrollEl={() => contentEl}>
  <Toc.Content bind:ref={contentEl} class={styles.Content}>
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
  </Toc.Content>
  <Toc.Nav class={styles.Nav}>
    <Toc.Title class={styles.Title}>On this page</Toc.Title>
    <Toc.List class={styles.List}>
      {#each items as item (item.value)}
        <Toc.Item class={styles.Item} {item}>
          <Toc.Link class={styles.Link} href={`#${item.value}`}>
            {item.label}
          </Toc.Link>
        </Toc.Item>
      {/each}
    </Toc.List>
  </Toc.Nav>
</Toc.Root>
