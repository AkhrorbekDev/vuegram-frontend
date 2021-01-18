<template>
  <q-footer bordered class="bg-white text-black">
    <q-list class="flex justify-evenly">
      <q-item
        v-ripple
        class="nav-link relative-position flex flex-center cursor-pointer"
        active-class="is-active"
        :to="{ name: 'home' }"
      >
        <q-icon size="md" name="home" />
      </q-item>
      <q-item
        v-ripple
        class="nav-link relative-position flex flex-center cursor-pointer"
        active-class="is-active"
      >
        <label class="">
          <q-icon
            size="md"
            name="add_circle_outline"
            class="cursor-pointer"
          />
          <q-file
            v-model="imageupload"
            class="d-none"
            accept="image/*"
            @input="uploadFile"
          />
        </label>
      </q-item>
      <q-item
        v-ripple
        class="nav-link relative-position flex flex-center cursor-pointer"
        active-class="is-active"
      >
        <q-icon
          size="md"
          name="account_circle"
          @click="getMe"
        />
      </q-item>
    </q-list>
  </q-footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NavbarBottom',
  data() {
    return {
      ...mapGetters({
        me: 'auth/me',
      }),
      imageupload: null,
    };
  },
  methods: {
    async getMe() {
      const me = this.$store.getters['auth/me'].login;
      await this.$router.push({
        name: 'profile',
        params: {
          login: me,
        },
      });
    },
    uploadFile(file) {
      window.file = file;
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataURI = event.target.result;
        this.$store.dispatch('posts/saveFile', dataURI);
        this.$router.push({
          name: 'poster',
        });
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style scoped lang="scss">
.nav-link {
  &.is-active {
    color: $primary;
  }
}

</style>
