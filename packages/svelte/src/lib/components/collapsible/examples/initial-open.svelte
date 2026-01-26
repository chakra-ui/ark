<script lang="ts">
  import { Collapsible } from '@ark-ui/svelte/collapsible'
  import { ChevronRightIcon } from 'lucide-svelte'
  import styles from 'styles/collapsible.module.css'
</script>

<Collapsible.Root class={styles.Root} defaultOpen>
  <Collapsible.Trigger class={styles.Trigger}>
    Welcome Message
    <Collapsible.Indicator class={styles.Indicator}>
      <ChevronRightIcon />
    </Collapsible.Indicator>
  </Collapsible.Trigger>
  <Collapsible.Content class={styles.Content}>
    <div class={styles.Body}>This content is visible by default when the component first renders.</div>
  </Collapsible.Content>
</Collapsible.Root>
