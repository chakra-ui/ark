<script lang="ts">
  import { EnvironmentProvider } from '@ark-ui/svelte/environment'
  import Usage from './usage.svelte'
</script>

<ifrmae title="IFrame Context">
  <EnvironmentProvider>
    <Usage />
  </EnvironmentProvider>
</ifrmae>
