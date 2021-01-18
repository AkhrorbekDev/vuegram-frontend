<template>
  <q-pull-to-refresh
    @refresh="refresh"
    color="primary"
    bg-color="white"
    icon="autorenew"
  >
    <div class="column flex-center">
      <q-img src="images/no-net-connection.jpg" :ratio="16 / 9" />
      <div :class="titleClass">
        {{ title }}
      </div>
      <div v-if="title === 'No Internet Connection'" class="body text-caption q-mx-auto q-mt-md">
        Please check your internet connection and pull to refresh
      </div>
    </div>
  </q-pull-to-refresh>
</template>

<script>
export default {
  name: 'EmptyPage',
  data() {
    return {
      title: 'No Internet Connection',
      titleClass: 'title q-mx-auto q-mt-lg text-caption',
    };
  },
  methods: {
    refresh(done) {
      if (window.navigator.onLine) {
        this.title = 'Connected';
        this.titleClass = 'title q-mx-auto q-mt-lg text-caption text-positive';
        setTimeout(async () => {
          done();
          await this.$router.push({
            name: 'home',
          });
        }, 3000);
      } else {
        this.titleClass = 'title q-mx-auto q-mt-lg text-caption  text-negative';
        setTimeout(() => {
          this.titleClass = 'title q-mx-auto q-mt-lg text-caption';
          done();
        }, 3000);
      }
    },
  },
};
</script>

<style scoped>
.body {
  font-weight: 500;
  font-size: 18px;
  line-height: 1.16;
  color: #575757;
  text-align: center;
}

.title {
  font-weight: 500;
  font-size: 26px;
  line-height: 1.16;
  text-align: center;
  color: #575757;
}
</style>
