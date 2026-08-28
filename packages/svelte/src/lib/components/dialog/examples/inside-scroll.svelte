<script lang="ts">
  import { Dialog } from '@ark-ui/svelte/dialog'
  import { Portal } from '@ark-ui/svelte/portal'
  import { XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/dialog.module.css'

  const CONTENT_SECTIONS = [
    {
      title: '1. Acceptance of Terms',
      body: 'By accessing and using this service, you accept and agree to be bound by the terms and provisions of this agreement.',
    },
    {
      title: '2. Use License',
      body: 'Permission is granted to temporarily use this service for personal, non-commercial purposes only. This is the grant of a license, not a transfer of title.',
    },
    {
      title: '3. User Responsibilities',
      body: 'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.',
    },
    {
      title: '4. Privacy Policy',
      body: 'Your use of this service is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the site and informs users of our data collection practices.',
    },
    {
      title: '5. Limitations',
      body: 'In no event shall we be liable for any damages arising out of the use or inability to use the materials on this service.',
    },
    {
      title: '6. Revisions',
      body: 'We may revise these terms of service at any time without notice. By using this service you are agreeing to be bound by the then current version of these terms.',
    },
    {
      title: '7. Governing Law',
      body: 'These terms and conditions are governed by and construed in accordance with applicable laws and you irrevocably submit to the exclusive jurisdiction of the courts.',
    },
  ]
</script>

<Dialog.Root>
  <Dialog.Trigger class={button.Root}>Open Dialog</Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop class={styles.Backdrop} />
    <Dialog.Positioner class={styles.Positioner}>
      <Dialog.Content class={styles.Content} style="max-height: min(32rem, calc(100vh - 4rem))">
        <Dialog.CloseTrigger class={styles.CloseTrigger}>
          <XIcon />
        </Dialog.CloseTrigger>
        <Dialog.Title class={styles.Title}>Terms of Service</Dialog.Title>
        <Dialog.Description class={styles.Description}>Please review our terms before continuing.</Dialog.Description>
        <div class={styles.ScrollContainer}>
          {#each CONTENT_SECTIONS as item}
            <section class={styles.ScrollSection}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </section>
          {/each}
        </div>
        <div class={styles.Actions}>
          <Dialog.CloseTrigger class={button.Root}>Decline</Dialog.CloseTrigger>
          <Dialog.CloseTrigger class={button.Root} data-variant="solid">Accept</Dialog.CloseTrigger>
        </div>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
