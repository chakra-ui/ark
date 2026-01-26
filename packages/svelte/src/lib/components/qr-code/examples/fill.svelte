<script lang="ts">
  import { QrCode } from '@ark-ui/svelte/qr-code'
  import styles from 'styles/qr-code.module.css'

  const fills = ['#5417D7', '#EC5D5E']
</script>

<div class="hstack">
  {#each fills as fill}
    <QrCode.Root class={styles.Root} defaultValue="http://ark-ui.com">
      <QrCode.Frame class={styles.Frame} style="fill: {fill}">
        <QrCode.Pattern class={styles.Pattern} />
      </QrCode.Frame>
    </QrCode.Root>
  {/each}
</div>
