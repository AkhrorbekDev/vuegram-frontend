<template>
  <q-page class="flex flex-center q-px-lg">
    <registry-form
      @registry="submit"
    />
  </q-page>
</template>

<script>
import RegistryForm from '@/components/RegistryForm';
import UserService from '@/services/User';

export default {
  name: 'RegistryPage',
  components: { RegistryForm },
  methods: {
    async submit(data) {
      const response = await UserService.create(data);
      if (response.status === 201) {
        await this.$store.dispatch('auth/registry', response.data);
        await this.$router.push({
          name: 'home',
        });
      } else {
        this.$q.notify({
          message: response.message,
          position: 'top',
          type: 'warning',
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
