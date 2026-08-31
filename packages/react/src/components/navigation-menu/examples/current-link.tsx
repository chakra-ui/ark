import { NavigationMenu } from '@ark-ui/react/navigation-menu'
import { ChevronDownIcon } from 'lucide-react'
import styles from 'styles/navigation-menu.module.css'

export const CurrentLink = () => (
  <NavigationMenu.Root className={styles.Root}>
    <NavigationMenu.List className={styles.List}>
      <NavigationMenu.Item className={styles.Item} value="home">
        <NavigationMenu.Link className={styles.Link} href="#home" current>
          Home
        </NavigationMenu.Link>
      </NavigationMenu.Item>

      <NavigationMenu.Item className={styles.Item} value="products">
        <NavigationMenu.Trigger className={styles.Trigger}>
          Products
          <span className={styles.TriggerIcon}>
            <ChevronDownIcon />
          </span>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content className={styles.Content}>
          <NavigationMenu.Link className={styles.ContentLink} href="#analytics">
            Analytics
          </NavigationMenu.Link>
          <NavigationMenu.Link className={styles.ContentLink} href="#commerce">
            Commerce
          </NavigationMenu.Link>
          <NavigationMenu.Link className={styles.ContentLink} href="#payments">
            Payments
          </NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item className={styles.Item} value="about">
        <NavigationMenu.Link className={styles.Link} href="#about">
          About
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
)
