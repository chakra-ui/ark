<script lang="ts">
  import { Format } from '@ark-ui/svelte/format'
  import styles from 'styles/format.module.css'
</script>

<span class={styles.Value}>
  <Format.Number value={384.4} style="unit" unit="kilometer" />
</span>
