<script lang="ts">
  import { Toc } from '@ark-ui/svelte/toc'
  import { loremIpsum } from 'lorem-ipsum'
  import styles from 'styles/toc.module.css'

  const paragraphs = loremIpsum({ count: 6, units: 'paragraphs' })

  const items = [
    { value: 'introduction', depth: 2, label: 'Introduction' },
    { value: 'getting-started', depth: 2, label: 'Getting Started' },
    { value: 'installation', depth: 2, label: 'Installation' },
    { value: 'usage', depth: 2, label: 'Usage' },
    { value: 'configuration', depth: 2, label: 'Configuration' },
    { value: 'migration', depth: 2, label: 'Migration' },
    { value: 'faq', depth: 2, label: 'FAQ' },
    { value: 'troubleshooting', depth: 2, label: 'Troubleshooting' },
    { value: 'api-reference', depth: 2, label: 'API Reference' },
    { value: 'conclusion', depth: 2, label: 'Conclusion' },
  ]
</script>

<Toc.Root class={styles.Root} {items}>
  <Toc.Content class={styles.Content}>
    {#each items as item (item.value)}
      <section>
        <h2 id={item.value}>{item.label}</h2>
        <p>{paragraphs}</p>
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

