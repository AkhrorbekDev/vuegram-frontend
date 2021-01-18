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
        <div v-if="!isCaptured" class="full-width q-mt-md text-center">
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
        <div v-else class="flex justify-between q-mt-md">
          <q-btn @click="cancel" label="Отменить" color="negative" />
          <q-btn @click="submit" label="Опубликоват" color="primary" />
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

export default {
  name: 'CameraPage',
  data() {
    return {
      photo: null,
      isCaptured: false,
      hasCameraSupport: true,
    };
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
    async captureImage() {
      this.isCaptured = true;
      const { video, canvas } = this.$refs;
      canvas.width = video.getBoundingClientRect().width;
      canvas.height = video.getBoundingClientRect().height;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    },
    async submit() {
      const { canvas } = this.$refs;
      this.photo = canvas.toDataURL();
      await this.$store.dispatch('posts/saveFile', this.photo);
      await this.$router.push({
        name: 'poster',
      });
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
    cancel() {
      this.isCaptured = !this.isCaptured;
    },
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach((track) => {
        track.stop();
      });
    },

  },
  mounted() {
    this.initCamera();
  },
  beforeDestroy() {
    if (this.hasCameraSupport) {
      this.disableCamera();
    }
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
