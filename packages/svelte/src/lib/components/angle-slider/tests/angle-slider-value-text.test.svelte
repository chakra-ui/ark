<script lang="ts">
  import { AngleSlider } from '@ark-ui/svelte/angle-slider'
</script>

<AngleSlider.Root defaultValue={45}>
  <AngleSlider.ValueText data-testid="value-text" />
</AngleSlider.Root>
