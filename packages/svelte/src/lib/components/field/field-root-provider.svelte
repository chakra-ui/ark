<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseFieldReturn } from './use-field.svelte.ts'

  export interface FieldRootProviderBaseProps extends PolymorphicProps<'div'> {
    value: UseFieldReturn
  }
  export interface FieldRootProviderProps extends Assign<HTMLProps<'div'>, FieldRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { FieldProvider } from './use-field-context.ts'

  const { value, ...props }: FieldRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  FieldProvider(() => value())
</script>

<Ark as="div" {...mergedProps} />
