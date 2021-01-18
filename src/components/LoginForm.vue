<template>
  <div class="full-width text-center">
    <q-form @submit.prevent.stop="onSubmit">
      <q-input
        v-model="model.login"
        ref="login"
        hint="Login"
        color="primary"
        label-color="primary"
        :rules="[val => !!val || 'Login is missing']"
      />
      <q-input
        v-model="model.password"
        ref="password"
        type="password"
        hint="Password"
        color="primary"
        :rules="[ val => !!val && val.length >= 6 || 'Please use maximum 6 characters']"
        label-color="primary"
      />
      <q-btn
        type="submit"
        class="q-mt-md text-capitalize"
        color="primary"
        label="Sign in"
      />
    </q-form>
    <q-btn
      :to="{ name: 'registry'}"
      class="q-mt-md text-capitalize absolute-top-right"
      flat
      color="primary"
      label="Sign up"
    />
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      model: {
        login: null,
        password: null,
      },
    };
  },
  methods: {
    /*    isValidEmail(val) {
          const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
          return emailPattern.test(val) || 'Invalid email';
        }, */
    onSubmit() {
      this.$refs.login.validate();
      this.$refs.password.validate();
      if (this.$refs.login.hasError || this.$refs.password.hasError) {
        this.formHasError = true;
      } else {
        this.$emit('login', this.model);
      }
    },
  },
};
</script>

<style scoped>

</style>
