<svelte:options namespace="svg" />

<script lang="ts" generics="T extends keyof SvelteHTMLElements">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'
  import type { SvelteHTMLElements } from 'svelte/elements'

  type Props = HTMLProps<T> &
    PolymorphicProps<T> & {
      as: T
    }

  const { as, ...props }: Props = $props()
</script>

<svelte:element this={as} {...props} />
