<script lang="ts">
  import { Toc } from '@ark-ui/svelte/toc'
  import { loremIpsum } from 'lorem-ipsum'
  import styles from 'styles/toc.module.css'

  const p = loremIpsum({ count: 7, units: 'paragraphs' })

  const items = [
    { value: 'executive-summary', depth: 1, label: 'Executive Summary' },
    { value: 'methodology', depth: 1, label: 'Methodology' },
    { value: 'findings', depth: 1, label: 'Findings' },
    { value: 'recommendations', depth: 1, label: 'Recommendations' },
    { value: 'conclusion', depth: 1, label: 'Conclusion' },
  ]
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
  <Toc.Nav class={styles.Nav} {items}>
    <Toc.Title class={styles.Title}>Contents</Toc.Title>
    <Toc.List class={styles.List}>
      {#each items as item, index (item.value)}
        <Toc.Item class={styles.Item} {item}>
          <Toc.Link class={styles.LinkNumbered}>
            <span class={styles.Number}>{String(index + 1).padStart(2, '0')}</span>
            {item.label}
          </Toc.Link>
        </Toc.Item>
      {/each}
    </Toc.List>
  </Toc.Nav>
</div>
