<script setup lang=ts>
import type { AppProps } from '@nuxt/ui';
import { ko } from '@nuxt/ui/locale';


const config: AppProps = {
  locale: ko,
  toaster: {
    position: 'bottom-center',
    max: 3,
  }
}
</script>

<template>
  <UApp v-bind="config">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>