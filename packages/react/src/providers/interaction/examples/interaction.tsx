import { useInteractionModality } from '@ark-ui/react/interaction'
import styles from 'styles/interaction.module.css'

export const InteractionModality = () => {
  const modality = useInteractionModality()

  return (
    <div className={styles.Container}>
      <span className={styles.Badge} data-modality={modality}>
        {modality ?? 'none'}
      </span>
      <p className={styles.Hint}>Try clicking, pressing a key, or using a screen reader.</p>
      <button type="button" className={styles.Button} data-focus-visible={modality === 'keyboard' ? '' : undefined}>
        Click or Tab to me
      </button>
    </div>
  )
}
