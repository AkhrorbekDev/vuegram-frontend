<template>
  <q-page>
    <div v-if="isLoading">
      <div v-if="posts.length > 0">
        <post-card
          v-for="post in posts"
          :key="post.id"
          :post="post"
          class="q-my-sm"
        />
      </div>
      <div v-else class="absolute-center">
        <p>Post not found :(</p>
      </div>
    </div>
    <div v-else>
      <q-card
        v-for="n in skeletons"
        :key="n"
        class="q-mb-sm"
        flat
        bordered
      >
        <q-item>
          <q-item-section avatar>
            <q-skeleton type="QAvatar" animation="fade" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" animation="fade" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" animation="fade" />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-skeleton height="400px" square animation="fade" />

        <q-card-section>
          <q-skeleton type="text" class="text-subtitle2" animation="fade" />
          <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import PostCard from '@/components/PostCard';
import PostService from '@/services/Post';

export default {
  name: 'HomePage',
  components: {
    PostCard,
  },
  data() {
    return {
      netStatus: true,
      isLoading: false,
      skeletons: 3,
    };
  },
  mounted() {
    this.networkStatus();
  },
  asyncComputed: {
    async posts() {
      if (this.netStatus) {
        const response = await PostService.getPosts();
        if (response.status === 404) {
          this.isLoading = true;
          return [];
        }
        this.isLoading = true;
        return response.data;
      }
      this.isLoading = true;
      return [];
    },
  },
  methods: {
    networkStatus() {
      const networkStatus = window.navigator.onLine;
      if (networkStatus) {
        this.netStatus = true;
      } else {
        this.netStatus = false;
      }
    },
  },
};
</script>
