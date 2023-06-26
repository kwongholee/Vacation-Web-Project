<template>
  <div class="black-bg" v-if="modalOpen">
    <div class="white-bg">
      <img :src="onerooms[modalNum].image">
      <h4>{{onerooms[modalNum].title}}</h4>
      <p>{{onerooms[modalNum].content}}</p>
      <p>{{onerooms[modalNum].price}}원</p>
      <button @click="$emit('closeModal')">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheModal',
  props: {
    onerooms: Array,
    modalNum: Number,
    modalOpen: Boolean,
  }
}
</script>

<style>

</style>