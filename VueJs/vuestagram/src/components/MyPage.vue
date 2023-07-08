<template>
  <div style="padding : 10px">
    <h4>팔로워</h4>
    <input @input="inputFollower($event.target.value)" placeholder="?" />
    <div v-for="(a,i) in follower" :key="i" class="post-header">
      <div class="profile" :style="`background-image=url(${a.image})`"></div>
      <span class="profile-name">{{a.name}}</span>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';

export default {
  name: 'MyPage',
  setup() {
    let follower = ref([]);
    let followerOriginal = ref([]);

    onMounted(() => {
      axios.get('/follower.json')
      .then((a) => {
        follower.value = a.data;
        followerOriginal.value = [...a.data];
      })
    })

    function inputFollower(e) {
      let newFollower = followerOriginal.value.filter((a) => {
        return a.name.indexOf(e) != -1
      });
      follower.value = [...newFollower]
    }

    return {follower, inputFollower}
  },
  data() {
    return {

    }
  }
}
</script>

<style>

</style>