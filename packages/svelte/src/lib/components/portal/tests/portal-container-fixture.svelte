<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'

  let { container }: { container: HTMLElement } = $props()
</script>

<Portal {container}><span data-testid="portal-content">Portal content</span></Portal>
