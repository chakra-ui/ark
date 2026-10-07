import { Meter } from '@ark-ui/react/meter'
import styles from 'styles/meter.module.css'

const servers = [
  { name: 'api-1', load: 32 },
  { name: 'api-2', load: 68 },
  { name: 'api-3', load: 91 },
]

export const ValueState = () => (
  <div className={styles.Stack}>
    {servers.map((server) => (
      <Meter.Root
        key={server.name}
        className={`${styles.Root} ${styles.Graded}`}
        defaultValue={server.load}
        low={50}
        high={80}
        optimum={0}
      >
        <Meter.Label className={styles.Label}>{server.name}</Meter.Label>
        <Meter.ValueText className={styles.ValueText} />
        <Meter.Track className={styles.Track}>
          <Meter.Indicator className={styles.Indicator} />
        </Meter.Track>
      </Meter.Root>
    ))}
  </div>
)
