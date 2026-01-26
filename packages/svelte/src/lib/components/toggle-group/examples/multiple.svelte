<script lang="ts">
  import { ToggleGroup } from '@ark-ui/svelte/toggle-group'
  import BoldIcon from 'lucide-svelte/icons/bold'
  import ItalicIcon from 'lucide-svelte/icons/italic'
  import UnderlineIcon from 'lucide-svelte/icons/underline'
  import styles from 'styles/toggle-group.module.css'
</script>

<ToggleGroup.Root defaultValue={['bold']} multiple class={styles.Root}>
  <ToggleGroup.Item value="bold" class={styles.Item}>
    <BoldIcon />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="italic" class={styles.Item}>
    <ItalicIcon />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="underline" class={styles.Item}>
    <UnderlineIcon />
  </ToggleGroup.Item>
</ToggleGroup.Root>
