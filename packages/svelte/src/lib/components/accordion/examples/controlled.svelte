<script lang="ts">
  import { Accordion } from '@ark-ui/svelte/accordion'
  import { ChevronDownIcon } from 'lucide-svelte'
  import styles from 'styles/accordion.module.css'

  let value = $state<string[]>([])

  const items = [
    {
      value: 'ark-ui',
      title: 'What is Ark UI?',
      content: 'A headless component library for building accessible web apps.',
    },
    {
      value: 'getting-started',
      title: 'How to get started?',
      content: 'Install the package and import the components you need.',
    },
    {
      value: 'maintainers',
      title: 'Who maintains this project?',
      content: 'Ark UI is maintained by the Chakra UI team.',
    },
  ]
</script>

<Accordion.Root class={styles.Root} bind:value>
  {#each items as item (item.value)}
    <Accordion.Item class={styles.Item} value={item.value}>
      <Accordion.ItemTrigger class={styles.ItemTrigger}>
        {item.title}
        <Accordion.ItemIndicator class={styles.ItemIndicator}>
          <ChevronDownIcon />
        </Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent class={styles.ItemContent}>
        <div class={styles.ItemBody}>{item.content}</div>
      </Accordion.ItemContent>
    </Accordion.Item>
  {/each}
</Accordion.Root>
