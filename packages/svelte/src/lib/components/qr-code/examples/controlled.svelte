<script lang="ts">
  import { QrCode } from '@ark-ui/svelte/qr-code'
  import button from 'styles/button.module.css'
  import styles from 'styles/qr-code.module.css'

  let value = $state('http://ark-ui.com')
</script>

<div class="stack">
  <QrCode.Root class={styles.Root} bind:value>
    <QrCode.Frame class={styles.Frame}>
      <QrCode.Pattern class={styles.Pattern} />
    </QrCode.Frame>
  </QrCode.Root>
  <button class={button.Root} onclick={() => (value = 'https://chakra-ui.com')}>
    Set to chakra-ui.com
  </button>
</div>
