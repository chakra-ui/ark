<script lang="ts">
  import { Format } from '@ark-ui/svelte/format'
  import styles from 'styles/format.module.css'
</script>

<span class={styles.Value}>
  <Format.Number value={0.145} style="percent" maximumFractionDigits={2} minimumFractionDigits={2} />
</span>
