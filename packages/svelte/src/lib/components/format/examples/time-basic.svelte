<script lang="ts">
  import { Format } from '@ark-ui/svelte/format'
  import styles from 'styles/format.module.css'
</script>

<span class={styles.Value}>
  <Format.Time value="18:47:12" format="12h" />
</span>
