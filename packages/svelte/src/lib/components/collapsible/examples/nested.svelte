<script lang="ts">
  import { Collapsible } from '@ark-ui/svelte/collapsible'
  import { ChevronRightIcon } from 'lucide-svelte'
  import styles from 'styles/collapsible.module.css'
</script>

<Collapsible.Root class={styles.Root}>
  <Collapsible.Trigger class={styles.Trigger}>
    Getting Started
    <Collapsible.Indicator class={styles.Indicator}>
      <ChevronRightIcon />
    </Collapsible.Indicator>
  </Collapsible.Trigger>
  <Collapsible.Content class={styles.Content}>
    <div class={styles.Body}>
      <p>Welcome to the Ark UI documentation. Here are some topics to explore:</p>

      <Collapsible.Root class={styles.Nested}>
        <Collapsible.Trigger class={styles.Trigger}>
          Installation
          <Collapsible.Indicator class={styles.Indicator}>
            <ChevronRightIcon />
          </Collapsible.Indicator>
        </Collapsible.Trigger>
        <Collapsible.Content class={styles.Content}>
          <div class={styles.Body}>
            <p>Install Ark UI using your preferred package manager:</p>
            <code>npm install @ark-ui/svelte</code>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>

      <Collapsible.Root class={styles.Nested}>
        <Collapsible.Trigger class={styles.Trigger}>
          Styling
          <Collapsible.Indicator class={styles.Indicator}>
            <ChevronRightIcon />
          </Collapsible.Indicator>
        </Collapsible.Trigger>
        <Collapsible.Content class={styles.Content}>
          <div class={styles.Body}>
            <p>Ark UI components are unstyled by default. Use CSS modules, Tailwind, or any styling solution.</p>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  </Collapsible.Content>
</Collapsible.Root>
