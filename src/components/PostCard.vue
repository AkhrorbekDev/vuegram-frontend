<template>
  <q-card class="full-width" bordered flat>
    <div class="flex justify-between q-pa-sm">
      <router-link to="#!" tag="p" class="flex items-center q-mb-none">
        <q-avatar
          size="xl"
          class="bg-primary text-white q-mr-sm"
        >
          <img v-if="post.user.avatar" :src="post.user.avatar" alt="">
        </q-avatar>
        <div class="flex-center">
          <router-link
            :to="{ name: 'profile', params: { login: post.user.login }}"
            tag="b"
            class="q-mb-none cursor-pointer"
          >
            {{ post.user.login }}
          </router-link>
          <p
            v-if="post.location"
            class="q-mb-none location"
          >
            {{ post.location }}
          </p>
        </div>
      </router-link>
    </div>
    <q-img
      :src="post.photo"
      :alt="post.body"
      :ratio="4 / 3"
      contain
    >
      <template v-slot:loading>
        <q-skeleton
          width="100%"
          height="500px"
        />
      </template>
    </q-img>
    <div>
      <post-comment :body="post.comment" :user-name="post.user.login" :date="formattedDate" />
    </div>
  </q-card>
</template>

<script>
import VueTypes from 'vue-types';
import PostComment from '@/components/PostComment';
import { date } from 'quasar';

export default {
  name: 'PostCard',
  components: {
    PostComment,
  },
  props: {
    post: VueTypes.object.isRequired,
  },
  data() {
    return {
      isLoadImage: false,
    };
  },
  computed: {
    formattedDate() {
      return date.formatDate(this.post.date, 'dddd D MMMM');
    },
  },
};
</script>

<style scoped>
.location {
  font-size: 11px;
}
</style>
