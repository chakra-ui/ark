<script lang="ts">
  import { Toc } from '@ark-ui/svelte/toc'
  import { loremIpsum } from 'lorem-ipsum'
  import styles from 'styles/toc.module.css'

  const p = loremIpsum({ count: 7, units: 'paragraphs' })

  const groups = [
    {
      label: 'Getting Started',
      items: [
        { value: 'overview', depth: 1, label: 'Overview' },
        { value: 'installation', depth: 1, label: 'Installation' },
      ],
    },
    {
      label: 'Advanced',
      items: [
        { value: 'configuration', depth: 1, label: 'Configuration' },
        { value: 'plugins', depth: 1, label: 'Plugins' },
      ],
    },
    {
      label: 'Reference',
      items: [
        { value: 'api', depth: 1, label: 'API' },
        { value: 'changelog', depth: 1, label: 'Changelog' },
      ],
    },
  ]

  const allItems = groups.flatMap((g) => g.items)
</script>

<div class={styles.Root}>
  <article class={styles.Content}>
    {#each groups as group (group.label)}
      <div>
        <h2>{group.label}</h2>
        {#each group.items as item (item.value)}
          <section>
            <h3 id={item.value}>{item.label}</h3>
            <p>{p}</p>
          </section>
        {/each}
      </div>
    {/each}
  </article>
  <Toc.Nav class={styles.Nav} items={allItems}>
    {#each groups as group (group.label)}
      <div class={styles.Group}>
        <span class={styles.GroupLabel}>{group.label}</span>
        <Toc.List class={styles.List}>
          {#each group.items as item (item.value)}
            <Toc.Item class={styles.Item} {item}>
              <Toc.Link class={styles.Link}>{item.label}</Toc.Link>
            </Toc.Item>
          {/each}
        </Toc.List>
      </div>
    {/each}
  </Toc.Nav>
</div>
