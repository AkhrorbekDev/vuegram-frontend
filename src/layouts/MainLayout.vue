<template>
  <q-layout view="hHh Lpr fFf">
    <navbar-top />
    <navbar-bottom />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import NavbarBottom from '@/components/NavbarBottom';
import NavbarTop from '@/components/NavbarTop';

export default {
  name: 'MainLayout',
  components: {
    NavbarTop,
    NavbarBottom,
  },
};
</script>
