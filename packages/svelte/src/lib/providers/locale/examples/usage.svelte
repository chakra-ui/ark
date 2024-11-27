<script lang="ts">
import { useLocaleContext } from '@ark-ui/svelte/locale'

const locale = useLocaleContext()
</script>

<pre>{JSON.stringify(locale, null, 2)}</pre>