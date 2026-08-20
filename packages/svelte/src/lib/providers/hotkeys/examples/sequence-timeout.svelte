<script lang="ts">
  import { HotkeysProvider } from '$lib/providers/hotkeys/index.ts'
  import SequenceTimeoutDemo from './sequence-timeout-demo.svelte'
</script>

<HotkeysProvider sequenceTimeoutMs={600}>
  <SequenceTimeoutDemo />
</HotkeysProvider>
