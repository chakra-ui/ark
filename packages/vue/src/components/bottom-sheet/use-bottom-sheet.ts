import * as bottomSheet from '@zag-js/bottom-sheet'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './bottom-sheet.types'

export interface UseBottomSheetProps extends Optional<Omit<bottomSheet.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseBottomSheetReturn extends ComputedRef<bottomSheet.Api<PropTypes>> {}

export const useBottomSheet = (
  props: MaybeRef<UseBottomSheetProps> = {},
  emit?: EmitFn<RootEmits>,
): UseBottomSheetReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<bottomSheet.Props>(() => {
    const localeProps = toValue<UseBottomSheetProps>(props)
    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localeProps),
      onOpenChange: (details) => {
        emit?.('openChange', details)
        localeProps.onOpenChange?.(details)
      },
      onActiveSnapPointChange: (details) => {
        emit?.('activeSnapPointChange', details)
        localeProps.onActiveSnapPointChange?.(details)
      },
    }
  })

  const service = useMachine(bottomSheet.machine, context)
  return computed(() => bottomSheet.connect(service, normalizeProps))
}
