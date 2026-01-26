<script lang="ts">
  import { Toggle } from '@ark-ui/svelte/toggle'
  import { BoldIcon } from 'lucide-svelte'
  import styles from 'styles/toggle.module.css'
</script>

<Toggle.Root class={styles.Root} disabled>
  <BoldIcon />
</Toggle.Root>
