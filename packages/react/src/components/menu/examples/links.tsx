import { Menu } from '@ark-ui/react/menu'
import { ChevronDownIcon } from 'lucide-react'
import styles from 'styles/menu.module.css'

export const Links = () => (
  <Menu.Root>
    <Menu.Trigger className={styles.Trigger}>
      Help
      <Menu.Indicator className={styles.Indicator}>
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content className={styles.Content}>
        <Menu.Item className={styles.Item} value="docs" render={<a href="https://ark-ui.com">Documentation</a>} />
        <Menu.Item
          className={styles.Item}
          value="github"
          render={<a href="https://github.com/chakra-ui/ark">GitHub</a>}
        />
        <Menu.Separator className={styles.Separator} />
        <Menu.Item
          className={styles.Item}
          value="changelog"
          render={<a href="https://github.com/chakra-ui/ark/releases">Changelog</a>}
        />
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
