<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseTagsInputProps } from './use-tags-input.svelte'

  export interface TagsInputRootBaseProps extends UseTagsInputProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface TagsInputRootProps extends Assign<HTMLProps<'div'>, TagsInputRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { Ark } from '../factory'
  import { TagsInputProvider } from './use-tags-input-context'
  import { useTagsInput } from './use-tags-input.svelte'

  let {
    ref = $bindable(null),
    value = $bindable<string[]>(),
    inputValue = $bindable<string>(),
    ...props
  }: TagsInputRootProps = $props()

  const [useTagsInputProps, localProps] = $derived(
    createSplitProps<UseTagsInputProps>()(props, [
      'addOnPaste',
      'allowOverflow',
      'autoFocus',
      'blurBehavior',
      'defaultInputValue',
      'defaultValue',
      'delimiter',
      'disabled',
      'editable',
      'form',
      'id',
      'ids',
      'inputValue',
      'invalid',
      'max',
      'maxLength',
      'name',
      'onFocusOutside',
      'onHighlightChange',
      'onInputValueChange',
      'onInteractOutside',
      'onPointerDownOutside',
      'onValueChange',
      'onValueInvalid',
      'placeholder',
      'readOnly',
      'required',
      'translations',
      'validate',
      'value',
    ]),
  )

  const providedId = $props.id()

  const machineProps = $derived.by<UseTagsInputProps>(() => {
    return {
      ...useTagsInputProps,
      id: useTagsInputProps.id ?? providedId,
      value,
      inputValue,
      onValueChange: (details) => {
        useTagsInputProps.onValueChange?.(details)
        value = details.value
      },
      onInputValueChange: (details) => {
        useTagsInputProps.onInputValueChange?.(details)
        inputValue = details.inputValue
      },
    }
  })

  const tagsInput = useTagsInput(() => machineProps)
  const mergedProps = $derived(mergeProps(tagsInput().getRootProps(), localProps))

  TagsInputProvider(tagsInput)
</script>

<Ark as="div" bind:ref {...mergedProps} />
