import { Toc } from '@ark-ui/react/toc'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'setup', depth: 2 },
  { value: 'configuration', depth: 2 },
  { value: 'deployment', depth: 2 },
  { value: 'monitoring', depth: 2 },
]

export const Controlled = () => {
  const [step, setStep] = useState(0)

  return (
    <Toc.Root className={styles.Root} items={items} activeIds={[items[step].value]}>
      <Toc.Content className={styles.Content}>
        <div className={styles.Stepper}>
          <button className={button.Root} onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
            ← Prev
          </button>
          <span className={styles.StepCount}>
            {step + 1} / {items.length}
          </span>
          <button
            className={button.Root}
            onClick={() => setStep((s) => Math.min(items.length - 1, s + 1))}
            disabled={step === items.length - 1}
          >
            Next →
          </button>
        </div>

        <h2 id="setup">Setup</h2>
        <p>
          Configure your environment before beginning. You will need Node.js version 18 or higher and a package manager
          of your choice.
        </p>
        <h2 id="configuration">Configuration</h2>
        <p>
          Edit the configuration file to match your project requirements. Most defaults work well for typical use cases.
        </p>
        <h2 id="deployment">Deployment</h2>
        <p>
          Deploy to your hosting provider of choice. The build output is a standard static site that works on any CDN.
        </p>
        <h2 id="monitoring">Monitoring</h2>
        <p>
          After deploying, set up monitoring to track errors and performance. Connect your preferred observability
          platform.
        </p>
      </Toc.Content>

      <Toc.Nav className={styles.Nav}>
        <Toc.Title className={styles.Title}>On this page</Toc.Title>
        <Toc.Indicator className={styles.Indicator} />
        <Toc.List className={styles.List}>
          {items.map((item) => (
            <Toc.Item className={styles.Item} key={item.value} item={item}>
              <Toc.Link className={styles.Link}>{item.value.replace(/-/g, ' ')}</Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc.Root>
  )
}
