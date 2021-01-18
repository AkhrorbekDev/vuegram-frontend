<template>
  <q-page class="flex flex-center q-px-lg">
    <login-form
      @login="submit"
    />
  </q-page>
</template>

<script>
import LoginForm from '@/components/LoginForm';
import Auth from '@/services/Auth';

export default {
  name: 'LoginPage',
  components: { LoginForm },
  methods: {
    async submit(data) {
      const response = await Auth.login(data);
      if (response.status === 200) {
        await this.$store.dispatch('auth/login', response.data);
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
