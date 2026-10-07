<script lang="ts">
  import { Meter } from '../index.ts'

  const props: Meter.RootProps = $props()
</script>

<Meter.Root {...props}>
  <Meter.Label>Storage used</Meter.Label>
  <Meter.ValueText />
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>
