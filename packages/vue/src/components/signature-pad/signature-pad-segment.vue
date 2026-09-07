<script lang="ts">
import type { SVGAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SignaturePadSegmentBaseProps extends PolymorphicProps {}
export interface SignaturePadSegmentProps
  extends
    SignaturePadSegmentBaseProps,
    /**
     * @vue-ignore
     */
    SVGAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSignaturePadContext } from './use-signature-pad-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SignaturePadSegmentProps>()
const signaturePad = useSignaturePadContext()

useForwardExpose()
</script>

<template>
  <ark.svg v-bind="signaturePad.getSegmentProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <title>Signature</title>
      <path v-for="(path, i) in signaturePad.paths" :key="i" v-bind="signaturePad.getSegmentPathProps({ path })" />
      <path
        v-if="signaturePad.currentPath"
        v-bind="signaturePad.getSegmentPathProps({ path: signaturePad.currentPath })"
      />
    </template>
  </ark.svg>
</template>
