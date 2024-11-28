<script lang="ts">
  import { useEnvironmentContext } from '@ark-ui/svelte/environment'

  const environment = useEnvironmentContext()
</script>

<pre>{JSON.stringify(environment?.getRootNode(), null, 2)}</pre>
