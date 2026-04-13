<script lang="ts">
  import { Toc } from '@ark-ui/svelte/toc'
  import { loremIpsum } from 'lorem-ipsum'
  import styles from 'styles/toc.module.css'

  const p = loremIpsum({ count: 6, units: 'paragraphs' })

  const items = [
    { value: 'overview', depth: 2, label: 'Overview' },
    { value: 'architecture', depth: 2, label: 'Architecture' },
    { value: 'state-machines', depth: 2, label: 'State Machines' },
    { value: 'components', depth: 2, label: 'Components' },
    { value: 'theming', depth: 2, label: 'Theming' },
    { value: 'accessibility', depth: 2, label: 'Accessibility' },
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
    <Toc.Title class={styles.Title}>On this page</Toc.Title>
    <Toc.Indicator class={styles.Indicator} />
    <Toc.List class={styles.List}>
      {#each items as item (item.value)}
        <Toc.Item class={styles.Item} {item}>
          <Toc.Link class={styles.Link}>{item.label}</Toc.Link>
        </Toc.Item>
      {/each}
    </Toc.List>
  </Toc.Nav>
</div>
