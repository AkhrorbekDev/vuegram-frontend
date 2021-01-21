<template>
  <q-page>
    <q-card flat>
      <q-item v-if="isLoadingUser" class="full-width">
        <q-item-section avatar class="q-mr-sm col-4">
          <q-skeleton type="QAvatar" size="6rem" />
        </q-item-section>

        <q-item-section class="col-8">
          <q-item-label class="q-mb-sm">
            <q-skeleton type="text" width="65%" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" width="20%" />
          </q-item-label>
        </q-item-section>
      </q-item>
      <user-profile v-else :profile-info="profileInfo" />
    </q-card>
    <q-card flat class="q-py-sm">
      <q-separator />
    </q-card>
    <q-card flat>
      <ul v-if="!isLoadingPosts" class="row q-col-gutter-sm q-py-sm">
        <li
          v-for="post in posts"
          :key="post.id"
          class="col-4"
        >
          <router-link to="#!">
            <q-img :src="post.photo" :ratio="4 / 3">
              <template v-slot:loading>
                <q-skeleton
                  width="100%"
                  height="500px"
                />
              </template>
            </q-img>
          </router-link>
        </li>
      </ul>
      <ul v-else class="row q-col-gutter-sm q-py-sm">
        <li v-for="n in skeletons" :key="n" class="col-4">
          <q-skeleton width="100%" height="185px" square animation="fade" />
        </li>
      </ul>
    </q-card>
  </q-page>
</template>

<script>
import UserProfile from '@/components/UserProfile';
import PostService from '@/services/Post';
import VueTypes from 'vue-types';
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
      profileInfo: {},
      isLoadingUser: true,
      isLoadingPosts: true,
      skeletons: 9,
    };
  },
  asyncComputed: {
    async userDetails() {
      const user = await User.get({
        query: { login: this.login },
      });
      if (user.data) {
        this.profileInfo.user = user.data;
        this.isLoadingUser = false;
        return user.data;
      }
      return [];
    },
    async posts() {
      const { data: posts } = await PostService.getPosts({
        query: {
          user: this.userDetails.id,
        },
      });
      if (posts) {
        this.profileInfo.postsCount = posts.length;
        this.isLoadingPosts = false;
        return posts;
      }
      return [];
    },
  },

};
</script>
