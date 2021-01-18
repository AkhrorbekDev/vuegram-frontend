<template>
  <q-page>
    <div class="camera-frame q-pa-md">
      <q-img
        ref="img"
        class="full-width"
        :src="file"
        contain
        alt=""
      />
    </div>
    <div class="q-pa-sm form">
      <q-input
        v-model="post.comment"
        outlined
        bg-color="grey-4"
        placeholder="Комментария"
        class="q-mb-md"
      />
      <q-input
        v-model="post.location"
        outlined
        bg-color="grey-4"
        placeholder="Location"
      >

        <template v-slot:append>
          <q-icon
            class="cursor-pointer"
            name="search"
            @click="getLocation"
          />
        </template>
      </q-input>
      <q-btn
        label="Сохранить"
        color="primary"
        @click="createPost"
      />
    </div>

  </q-page>
</template>

<script>
import { uid } from 'quasar';
import { mapGetters } from 'vuex';
import PostService from '@/services/Post';

export default {
  name: 'PosterPage',
  props: {},
  data() {
    return {
      post: {
        id: uid(),
        comment: null,
        photo: null,
        date: null,
        user: null,
        location: null,
      },
    };
  },
  computed: {
    ...mapGetters({
      file: 'posts/file',
      me: 'auth/me',
    }),
  },
  methods: {
    async createPost() {
      const { post } = this;
      const formData = new FormData();

      post.date = Number(new Date());
      post.photo = this.dataURItoBlob(this.file);
      post.user = this.me.id;

      formData.append('comment', post.comment);
      formData.append('date', post.date);
      formData.append('user', post.user);
      formData.append('location', post.location);
      formData.append('file', post.photo, `${post.id}.png`);
      await PostService.createPost(formData).then((response) => {
        if (response.status === 201) {
          this.$router.push({
            name: 'home',
          });
        }
      }).catch((e) => {
        const { data: ErrorMessage } = e.response;
        if (ErrorMessage.status === 504) {
          this.$q.notify({
            message: 'Please check network connection',
            position: 'top',
            type: 'negative',
          });
        }
      });
    },
    getLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.getCityAndCountry(position.coords);
      }, () => {
        this.$q.notify({
          message: 'Can not get location. Please check network connection',
          position: 'top',
          color: 'danger',
        });
      }, { timeout: 7000 });
    },
    getCityAndCountry(position) {
      const url = `https://geocode.xyz/${position.latitude},${position.longitude}?json=1`;
      this.$axios.get(url).then((result) => {
        this.successLocation(result);
      }).catch((e) => {
        console.log(e);
      });
    },
    successLocation(result) {
      this.post.location = result.data.city;
      if (result.data.country) {
        this.post.location += `, ${result.data.country} `;
      }
    },
    dataURItoBlob(dataURI) {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      // eslint-disable-next-line no-plusplus
      return blob;
    },
  },
};

</script>

<style scoped lang="sass">
.camera-frame
  border: 2px solid $grey-10
  border-radius: 10px
  position: relative
  width: 455px
  height: 345px
  margin: 0 auto

  .video-frame
    width: 100%
    height: 100%

.form
  width: 455px
  margin: 0 auto
</style>
