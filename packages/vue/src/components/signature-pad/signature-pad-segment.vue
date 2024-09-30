<script lang="ts">
import type { SVGAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SignaturePadSegmentBaseProps extends PolymorphicProps {}
export interface SignaturePadSegmentProps
  extends SignaturePadSegmentBaseProps,
    /**
     * @vue-ignore
     */
    SVGAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'
import { useForwardExpose } from '../../utils'

defineProps<SignaturePadSegmentProps>()
const signaturePad = useSignaturePadContext()

useForwardExpose()
</script>

<template>
  <ark.svg v-bind="signaturePad.getSegmentProps()" :as-child="asChild">
    <title>Signature</title>
    <path
      v-for="(path, i) in signaturePad.paths"
      :key="i"
      v-bind="signaturePad.getSegmentPathProps({ path })"
    />
    <path
      v-if="signaturePad.currentPath"
      v-bind="signaturePad.getSegmentPathProps({ path: signaturePad.currentPath })"
    />
  </ark.svg>
</template>
