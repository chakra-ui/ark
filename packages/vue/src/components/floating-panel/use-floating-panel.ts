import * as floatingPanel from '@zag-js/floating-panel'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, useId } from 'vue'
import { type EmitFn, type MaybeRef, computed, toValue } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './floating-panel.types'

export interface UseFloatingPanelProps extends Optional<Omit<floatingPanel.Props, 'getRootNode'>, 'id'> {}

export interface UseFloatingPanelReturn extends ComputedRef<floatingPanel.Api<PropTypes>> {}

export const useFloatingPanel = (
  props: MaybeRef<UseFloatingPanelProps> = {},
  emit?: EmitFn<RootEmits>,
): UseFloatingPanelReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const id = useId()

  const machineProps = computed((): floatingPanel.Props => {
    const localProps = toValue(props)
    return {
      id,
      dir: locale?.value.dir,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localProps),
      onOpenChange: (details) => {
        emit?.('openChange', details)
        emit?.('update:open', details.open)
        localProps.onOpenChange?.(details)
      },
      onSizeChange(details) {
        emit?.('sizeChange', details)
        emit?.('update:size', details.size)
        localProps.onSizeChange?.(details)
      },
      onPositionChange(details) {
        emit?.('positionChange', details)
        emit?.('update:position', details.position)
        localProps.onPositionChange?.(details)
      },
      onPositionChangeEnd(details) {
        emit?.('positionChangeEnd', details)
        localProps.onPositionChangeEnd?.(details)
      },
      onSizeChangeEnd(details) {
        emit?.('sizeChangeEnd', details)
        localProps.onSizeChangeEnd?.(details)
      },
      onStageChange(details) {
        emit?.('stageChange', details)
        localProps.onStageChange?.(details)
      },
    }
  })

  const service = useMachine(floatingPanel.machine, machineProps)

  return computed(() => floatingPanel.connect(service, normalizeProps))
}
