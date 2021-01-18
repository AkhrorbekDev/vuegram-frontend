<template>
  <div id="q-app" style="max-width: 768px; margin: 0 auto">
    <template>
      <component :is="layout">
        <router-view :key="$route.fullPath" />
      </component>
    </template>
  </div>
</template>

<script>
import { findLast, has } from 'lodash-es';
import EmptyLayout from '@/layouts/EmptyLayout';

export default {
  name: 'App',
  data() {
    return {
      isLoading: true,
      layout: null,
    };
  },
  watch: {
    $route: {
      handler() {
        this.layout = findLast(this.$route.matched, (route) => has(route, 'meta.layout'))?.meta?.layout ?? EmptyLayout;
      },
      immediate: true,
    },
  },
};
</script>
