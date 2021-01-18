<template>
  <q-card class="row items-center justify-between q-px-md q-py-sm" flat>
    <div class="col-12 row ">
      <div class="col-4 row items-center">
        <q-avatar
          size="150px"
          class="bg-primary text-white q-mr-sm overflow-hidden"
        >
          <img
            v-if="!profileInfo.user.avatar && !profileInfo.user.avatar !== null"
            :src="profileInfo.user.avatar"
            alt=""
          >
        </q-avatar>
      </div>
      <div class="col-8">
        <div class="user-info row items-center justify-between">
          <h4 class="q-mb-sm">{{ profileInfo.user.login }}</h4>
        </div>
        <ul class="flex items-center">
          <li class="flex items-center">
            <b class="q-mr-sm">{{ profileInfo.postsCount || 0 }}</b>
            <span>posts</span>
          </li>
          <!--  <li class="flex column justify-center items-center">
              <span>10</span>
              <b>Posts</b>
            </li>
            <li class="flex column justify-center items-center">
              <span>10</span>
              <b>Posts</b>
            </li>-->
        </ul>
      </div>
    </div>
  </q-card>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'UserProfile',
  props: {
    profileInfo: VueTypes.object.isRequired,
  },
  data() {
    return {
      imageupload: null,
      openModel: false,
    };
  },
  methods: {
    uploadFile(event) {
      this.$emit('update-avatar', event);
    },
    showModel() {
      this.openModel = !this.openModel;
    },
  },
};
</script>

<style scoped>
.file-input {
  height: 35px;
  background-color: rgba(255, 255, 255, .7);
  z-index: 2;
}

.file-input-icon {
  z-index: 1;
}

.tool-tip {
  font-size: 14px;
}
</style>
