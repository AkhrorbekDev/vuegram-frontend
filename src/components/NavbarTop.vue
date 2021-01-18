<template>
  <q-header bordered class="flex justify-between q-px-md items-center bg-white">
    <q-btn
      icon="camera_alt"
      :to="{ name: 'camera' }"
      class="q-pa-none text-black"
      flat
      round
      size="lg" />
    <router-link to="/home" class="q-mb-none text-h6 title">VueGram</router-link>
  </q-header>
</template>

<script>
export default {
  name: 'NavbarTop',
};
</script>
