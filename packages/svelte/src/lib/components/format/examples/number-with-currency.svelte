<script lang="ts">
  import { Format } from '@ark-ui/svelte/format'
  import styles from 'styles/format.module.css'
</script>

<span class={styles.Value}>
  <Format.Number value={1234.45} style="currency" currency="USD" />
</span>
