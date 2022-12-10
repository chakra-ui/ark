import CodeBlock from '@theme/CodeBlock'
import type { createAnatomy } from '@zag-js/anatomy'
import React from 'react'
import styles from './anatomy-styling.module.css'

export type AnatomyStylingProps = {
  componentName?: string
  anatomy: ReturnType<typeof createAnatomy>
}

export const AnatomyStyling = (props: AnatomyStylingProps) => {
  const { componentName, anatomy } = props

  const parts = anatomy.build()
  const partEntries = Object.entries(parts)

  const listItems = partEntries.map(([partName, part]) => {
    const { selector } = part
    return (
      <li key={partName} className={styles.partListItem}>
        <p className={styles.partName}>
          Part <code>{partName}</code>
        </p>
        <CodeBlock language="css">{`${selector} {\n  /* add ${partName} styles */\n}`}</CodeBlock>
      </li>
    )
  })

  const cssSelectorList = <ul className={styles.partList}>{listItems}</ul>

  const finalComponentName = componentName ? (
    <>
      the <code>{componentName}</code> component
    </>
  ) : (
    'this component'
  )

  return (
    <section>
      <p>
        To set up {finalComponentName} correctly, you'll need to understand its anatomy and how we
        name its parts. Each part includes a <code>data-part</code> attribute to help identify it in
        the DOM.
      </p>
      {cssSelectorList}
    </section>
  )
}
