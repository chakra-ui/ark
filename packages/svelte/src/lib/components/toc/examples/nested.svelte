<script lang="ts">
  import { Toc } from '@ark-ui/svelte/toc'
  import { loremIpsum } from 'lorem-ipsum'
  import styles from 'styles/toc.module.css'

  const p = loremIpsum({ count: 7, units: 'paragraphs' })

  const items = [
    { value: 'introduction', depth: 2, label: 'Introduction' },
    { value: 'getting-started', depth: 2, label: 'Getting Started' },
    { value: 'installation', depth: 3, label: 'Installation' },
    { value: 'configuration', depth: 3, label: 'Configuration' },
    { value: 'api-reference', depth: 2, label: 'API Reference' },
    { value: 'hooks', depth: 3, label: 'Hooks' },
    { value: 'components', depth: 3, label: 'Components' },
    { value: 'examples', depth: 2, label: 'Examples' },
  ]
</script>

<div class={styles.Root}>
  <article class={styles.Content}>
    {#each items as item (item.value)}
      <section>
        <svelte:element this={({ 2: 'h2', 3: 'h3', 4: 'h4' } as const)[item.depth as 2 | 3 | 4] ?? 'h2'} id={item.value}>
          {item.label}
        </svelte:element>
        <p>{p}</p>
      </section>
    {/each}
  </article>
  <Toc.Nav class={styles.Nav} {items}>
    <Toc.Title class={styles.Title}>On this page</Toc.Title>
    <Toc.List class={styles.List}>
      {#each items as item (item.value)}
        <Toc.Item class={styles.ItemNested} {item}>
          <Toc.Link class={styles.Link}>{item.label}</Toc.Link>
        </Toc.Item>
      {/each}
    </Toc.List>
  </Toc.Nav>
</div>
