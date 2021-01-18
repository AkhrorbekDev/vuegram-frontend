<template>
  <q-item class="q-pa-sm q-ma-none flex">
    <div class="flex">
      <router-link
        :to="{ name: 'profile', params: { login: userName }}"
        tag="b"
        class="q-mr-md cursor-pointer">
        {{ userName }}
      </router-link>
      <v-clamp v-if="!body || body !== 'null'" ellipsis="..." tag="p" :max-lines="2">{{ body }}</v-clamp>
    </div>
    <div>
      {{ date }}
    </div>
  </q-item>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'PostComment',
  props: {
    date: VueTypes.string.isRequired,
    userName: VueTypes.string.isRequired,
    body: VueTypes.string.isRequired,
  },
};
</script>

<style scoped>

</style>
