<script lang="ts">
  import { HotkeysProvider } from '$lib/providers/hotkeys/index.ts'
  import ScopeDemo from './scope-demo.svelte'
</script>

<HotkeysProvider activeScopes={['editor']}>
  <ScopeDemo />
</HotkeysProvider>
