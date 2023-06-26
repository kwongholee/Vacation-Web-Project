<template>
  <div>
    <img :src="onerooms[i].image" class="room-img">
    <h4 @click="$emit('openModal')">{{ onerooms[i].title }}</h4>
    <p>{{onerooms[i].price}} 원</p>
    <!-- <button>허위매물신고</button> <span>신고 수: {{ declaration[i] }}</span> -->
  </div>
</template>

<script>
export default {
  name: 'TheProduct',
  props: {
    onerooms: Array,
    i: Number
  }
}
</script>

<style>

</style>