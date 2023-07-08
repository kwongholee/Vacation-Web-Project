<template>
  <div class="black-bg" v-if="modalOpen">
    <div class="white-bg">
      <img :src="onerooms[modalNum].image">
      <h4>{{onerooms[modalNum].title}}</h4>
      <p>{{onerooms[modalNum].content}}</p>
      <input v-model.number="month">
      <p>{{month}}개월 선택함 = {{onerooms[modalNum].price * month}}원</p>
      <button @click="$emit('closeModal')">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheModal',
  data() {
    return {
      month: 1,
    }
  },
  watch: {
    month(a) {
      if(a > 12) {
        alert('12개월 이내로만 신청 가능');
        this.month = 12;
      }
      else if(isNaN(a) == true) {
        alert('숫자만 입력하셈');
        this.month = 1;
      }
    }
  },
  props: {
    onerooms: Array,
    modalNum: Number,
    modalOpen: Boolean,
  }
}
</script>

<style>

</style>