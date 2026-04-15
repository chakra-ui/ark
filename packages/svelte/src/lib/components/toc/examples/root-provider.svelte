<script lang="ts">
  import { Toc, useToc } from '@ark-ui/svelte/toc'
  import { loremIpsum } from 'lorem-ipsum'
  import styles from 'styles/toc.module.css'

  const p = loremIpsum({ count: 7, units: 'paragraphs' })

  const items = [
    { value: 'principles', depth: 2, label: 'Principles' },
    { value: 'patterns', depth: 2, label: 'Patterns' },
    { value: 'testing', depth: 2, label: 'Testing' },
    { value: 'performance', depth: 2, label: 'Performance' },
  ]

  const toc = useToc({ items })
</script>

<div class={styles.Root}>
  <article class={styles.Content}>
    {#each items as item (item.value)}
      <section>
        <h2 id={item.value}>{item.label}</h2>
        <p>{p}</p>
      </section>
    {/each}
  </article>
  <Toc.RootProvider class={styles.Nav} value={toc}>
    <Toc.Title class={styles.Title}>On this page</Toc.Title>
    <Toc.List class={styles.List}>
      {#each items as item (item.value)}
        <Toc.Item class={styles.Item} {item}>
          <Toc.Link class={styles.Link}>{item.label}</Toc.Link>
        </Toc.Item>
      {/each}
    </Toc.List>
  </Toc.RootProvider>
</div>
