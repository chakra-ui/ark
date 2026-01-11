import { Marquee } from '@ark-ui/react/marquee'
import styles from 'styles/marquee.module.css'

const items = [
  { name: 'Apple', logo: '🍎' },
  { name: 'Banana', logo: '🍌' },
  { name: 'Cherry', logo: '🍒' },
  { name: 'Grape', logo: '🍇' },
  { name: 'Watermelon', logo: '🍉' },
  { name: 'Strawberry', logo: '🍓' },
]

export const Speed = () => (
  <div className="stack">
    <div>
      <h3>Slow (25px/s)</h3>
      <Marquee.Root speed={25} className={styles.Root}>
        <Marquee.Viewport className={styles.Viewport}>
          <Marquee.Content className={styles.Content}>
            {items.map((item, i) => (
              <Marquee.Item key={i} className={styles.Item}>
                <span className={styles.ItemLogo}>{item.logo}</span>
                <span className={styles.ItemName}>{item.name}</span>
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </div>

    <div>
      <h3>Normal (50px/s)</h3>
      <Marquee.Root speed={50} className={styles.Root}>
        <Marquee.Viewport className={styles.Viewport}>
          <Marquee.Content className={styles.Content}>
            {items.map((item, i) => (
              <Marquee.Item key={i} className={styles.Item}>
                <span className={styles.ItemLogo}>{item.logo}</span>
                <span className={styles.ItemName}>{item.name}</span>
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </div>

    <div>
      <h3>Fast (100px/s)</h3>
      <Marquee.Root speed={100} className={styles.Root}>
        <Marquee.Viewport className={styles.Viewport}>
          <Marquee.Content className={styles.Content}>
            {items.map((item, i) => (
              <Marquee.Item key={i} className={styles.Item}>
                <span className={styles.ItemLogo}>{item.logo}</span>
                <span className={styles.ItemName}>{item.name}</span>
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </div>
  </div>
)
