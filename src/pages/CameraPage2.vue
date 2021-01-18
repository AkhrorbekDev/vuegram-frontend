<template>
  <q-page>
    <div v-if="hasCameraSupport" class="canvas">
      <div
        class="camera-frame q-pa-md"
      >
        <video
          v-show="!isCaptured"
          autoplay
          ref="video"
          class="video-frame"
          playsinline
        />
        <canvas
          v-show="isCaptured"
          ref="canvas"
          class="full-width"
        />
      </div>
      <div
        class="form"
      >
        <div class="full-width q-mt-md text-center">
          <q-btn
            round
            outline
            color="red"
            class="q-pa-xs"
            @click="captureImage"
          >
            <q-btn
              color="red"
              round
            />
          </q-btn>
        </div>
        <div
          v-show="isCaptured"
        >
          <div class="q-pa-sm">
            <q-file
              v-model="post.test"
              outlined
              bg-color="grey-4"
              placeholder="Комментария"
              class="q-mb-md"
              @input="upload"
            />
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
          </div>
          <q-btn
            color="primary"
            rounded
            label="Опубликовать"
            class="text-center"
            @click="createPost"
          />
        </div>
      </div>
    </div>
    <div v-else class="bg-dark absolute-full">
      <q-btn
        flat
        fab-mini
        class="absolute-center"
        text-color="white"
        label="Разрешите использовать камеру"
        @click="getAccess"
      />
    </div>
  </q-page>
</template>

<script>
import { uid } from 'quasar';

export default {
  name: 'CameraPage',
  data() {
    return {
      post: {
        id: uid(),
        comment: '',
        date: null,
        location: null,
      },
      photo: null,
      isCaptured: false,
      hasCameraSupport: true,
      test: null,
    };
  },
  mounted() {
    this.initCamera();
  },
  beforeDestroy() {
    if (this.hasCameraSupport) {
      this.disableCamera();
    }
  },
  methods: {
    upload(file) {
      this.photo = file;
      const { canvas } = this.$refs;
      const context = canvas.getContext('2d');
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
        };
        img.src = event.target.result;
      };
      this.$store.dispatch('posts/saveFile', this.photo);
      reader.readAsDataURL(file);
    },
    initCamera() {
      navigator.mediaDevices.getUserMedia({
        video: true,
      }).then((stream) => {
        this.$refs.video.srcObject = stream;
      }).catch(() => {
        this.hasCameraSupport = false;
      });
    },
    captureImage() {
      this.isCaptured = true;
      const { video, canvas } = this.$refs;
      canvas.width = video.getBoundingClientRect().width;
      canvas.height = video.getBoundingClientRect().height;
      const context = canvas.getContext('2d');
      this.photo = this.dataURItoBlob(canvas.toDataURL());
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.$store.dispatch('posts/saveFile', this.photo);
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
    async createPost() {
      await this.$router.push({
        name: 'poster',
      });
      // const formData = new FormData();
      // const { post } = this;
      // formData.append('id', post.id);
      // formData.append('comment', post.comment);
      // formData.append('photo', post.photo);
      // formData.append('date', post.date);
      // formData.append('location', post.location);
      // formData.append('file', `${post.id}.png`);
    },
    getLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.getCityAndCountry(position.coords);
      }, () => {
        this.$q.notify({
          message: 'Can not get location. Please check network connection',
          position: 'top',
          type: 'danger',
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
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach((track) => {
        track.stop();
      });
    },
    getAccess() {
      this.initCamera();
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
    position: inherit
    width: 100%
    height: 100%

.form
  width: 455px
  margin: 0 auto

</style>
