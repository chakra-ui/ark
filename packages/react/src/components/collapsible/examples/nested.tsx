import { Collapsible } from '@ark-ui/react/collapsible'
import { ChevronRightIcon } from 'lucide-react'
import styles from 'styles/collapsible.module.css'

export const Nested = () => (
  <Collapsible.Root className={styles.Root}>
    <Collapsible.Trigger className={styles.Trigger}>
      Getting Started
      <Collapsible.Indicator className={styles.Indicator}>
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content className={styles.Content}>
      <div className={styles.Body}>
        <p>Welcome to the Ark UI documentation. Here are some topics to explore:</p>

        <Collapsible.Root className={styles.Nested}>
          <Collapsible.Trigger className={styles.Trigger}>
            Installation
            <Collapsible.Indicator className={styles.Indicator}>
              <ChevronRightIcon />
            </Collapsible.Indicator>
          </Collapsible.Trigger>
          <Collapsible.Content className={styles.Content}>
            <div className={styles.Body}>
              <p>Install Ark UI using your preferred package manager:</p>
              <code>npm install @ark-ui/react</code>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>

        <Collapsible.Root className={styles.Nested}>
          <Collapsible.Trigger className={styles.Trigger}>
            Styling
            <Collapsible.Indicator className={styles.Indicator}>
              <ChevronRightIcon />
            </Collapsible.Indicator>
          </Collapsible.Trigger>
          <Collapsible.Content className={styles.Content}>
            <div className={styles.Body}>
              <p>Ark UI components are unstyled by default. Use CSS modules, Tailwind, or any styling solution.</p>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </Collapsible.Content>
  </Collapsible.Root>
)
