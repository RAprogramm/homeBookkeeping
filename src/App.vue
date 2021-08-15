<template>
  <toast-notification />
  <component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import ToastNotification from '@/components/ui/ToastNotification.vue';

export default {
  components: { MainLayout, AuthLayout, ToastNotification },
  setup() {
    const route = useRoute();

    return {
      layout: computed(() => route.meta.layout),
    };
  },
};
</script>

<style></style>
