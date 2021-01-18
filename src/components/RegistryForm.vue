<template>
  <div class="full-width text-center">
    <q-form @submit.prevent.stop="onSubmit">
      <!--  <q-input
          v-model="model.name"
          ref="name"
          hint="Name"
          color="primary"
          :rules="[val => !!val || 'Name is missing']"
        />-->
      <q-input
        v-model="model.login"
        ref="login"
        hint="Login"
        color="primary"
        :rules="[val => !!val || 'Login is missing']"
      />
      <q-input
        v-model="model.email"
        ref="email"
        hint="E-mail"
        color="primary"
        :rules="[val => !!val || 'Email is missing', isValidEmail]"
      />
      <q-input
        v-model="model.password"
        ref="password"
        type="password"
        hint="Password"
        color="primary"
        :rules="[val => !!val && val.length >= 6 || 'Please use maximum 6 characters' ]"
      />
      <q-btn
        type="submit"
        class="q-mt-md text-capitalize"
        color="primary"
        label="Sign up"
      />
    </q-form>
    <q-btn
      :to="{ name: 'login' }"
      class="q-mt-md text-capitalize absolute-top-right"
      flat
      color="primary"
      label="Sign in"
    />
  </div>
</template>

<script>
export default {
  name: 'RegistryForm',
  data() {
    return {
      model: {
        login: null,
        email: null,
        password: null,
      },
    };
  },
  methods: {
    isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    },
    onSubmit() {
      this.$refs.email.validate();
      this.$refs.login.validate();
      this.$refs.password.validate();
      if (this.$refs.email.hasError
        || this.$refs.login.hasError
        || this.$refs.password.hasError) {
        this.formHasError = true;
      } else {
        this.$emit('registry', this.model);
      }
    },
  },
};
</script>

<style scoped>

</style>
