import { useInteractionModality } from '@ark-ui/solid/interaction'
import styles from 'styles/interaction.module.css'

export const InteractionModality = () => {
  const modality = useInteractionModality()

  return (
    <div class={styles.Container}>
      <span class={styles.Badge} data-modality={modality()}>
        {modality() ?? 'none'}
      </span>
      <p class={styles.Hint}>Try clicking, pressing a key, or using a screen reader.</p>
      <button type="button" class={styles.Button} data-focus-visible={modality() === 'keyboard' ? '' : undefined}>
        Click or Tab to me
      </button>
    </div>
  )
}
