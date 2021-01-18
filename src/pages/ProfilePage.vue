<template>
  <q-page>
    <user-profile :profile-info="profileInfo" />
    <q-card flat class="q-py-sm">
      <q-separator />
    </q-card>
    <q-card flat>
      <ul class="row q-col-gutter-sm q-py-sm">
        <li
          v-for="post in posts"
          :key="post.id"
          class="col-4"
        >
          <router-link to="#!">
            <q-img :src="post.photo" :ratio="4 / 3" />
          </router-link>
        </li>
      </ul>
    </q-card>
  </q-page>
</template>

<script>
import UserProfile from '@/components/UserProfile';
import PostService from '@/services/Post';
import VueTypes from 'vue-types';
import { mapGetters } from 'vuex';
import User from '@/services/User';

export default {
  name: 'ProfilePage',
  components: {
    UserProfile,
  },
  props: {
    login: VueTypes.string,
  },
  data() {
    return {
      user: null,
      profileInfo: null,
    };
  },
  asyncComputed: {
    async userDetails() {
      if (this.login !== this.me.login) {
        const user = await User.get({
          login: this.login,
        });
        return user;
      }
      return this.me;
    },
    async posts() {
      const { data: posts } = await PostService.getPosts({
        user: this.userDetails.id,
      });
      this.profileInfo = {
        user: this.userDetails,
        postsCount: posts.length,
      };
      return posts;
    },
  },
  computed: {
    ...mapGetters({
      me: 'auth/me',
    }),
  },
};
</script>
