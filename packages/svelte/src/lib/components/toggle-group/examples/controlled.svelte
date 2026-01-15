<script lang="ts">
  import { ToggleGroup } from '@ark-ui/svelte/toggle-group'
  import AlignCenterIcon from 'lucide-svelte/icons/align-center'
  import AlignJustifyIcon from 'lucide-svelte/icons/align-justify'
  import AlignLeftIcon from 'lucide-svelte/icons/align-left'
  import AlignRightIcon from 'lucide-svelte/icons/align-right'
  import styles from 'styles/toggle-group.module.css'

  let value = $state(['left'])
</script>

<ToggleGroup.Root bind:value class={styles.Root}>
  <ToggleGroup.Item value="left" class={styles.Item}>
    <AlignLeftIcon />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="center" class={styles.Item}>
    <AlignCenterIcon />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="right" class={styles.Item}>
    <AlignRightIcon />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="justify" class={styles.Item}>
    <AlignJustifyIcon />
  </ToggleGroup.Item>
</ToggleGroup.Root>
