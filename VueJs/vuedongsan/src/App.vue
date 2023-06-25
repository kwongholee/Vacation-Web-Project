<template>  
  <div class="black-bg" v-if="modalOpen">
    <div class="white-bg">
      <img :src="onerooms[modalNum].image">
      <h4>{{onerooms[modalNum].title}}</h4>
      <p>{{onerooms[modalNum].content}}</p>
      <p>{{onerooms[modalNum].price}}원</p>
      <button @click="modalOpen=false">닫기</button>
    </div>
  </div>

  <div class="menu">
    <a v-for="abc in menus" :key="abc">{{abc}}</a>
  </div>

  <div v-for="(a, i) in onerooms" :key="i">
    <img :src="onerooms[i].image" class="room-img">
    <h4 :style="blueColor" @click="modalOpen=true; modalNum=i">{{ onerooms[i].title }}</h4>
    <p>{{onerooms[i].price}} 원</p>
    <button @click="increase(i)">허위매물신고</button> <span>신고 수: {{ declaration[i] }}</span>
  </div>
</template>

<script>
import data from './oneroom';

export default {
  name: 'App',
  data() {
    return {
      modalOpen: false,
      blueColor: 'color: blue',
      menus: ['Home', 'Shop', 'About'],
      products: ['역삼동 원룸', '천호동 원룸', '마포구 원룸'],
      onerooms: data,
      declaration: [0,0,0,0,0,0],
      modalNum: 0
    }
  }, 
  methods: {
    increase(i) {
      this.declaration[i] += 1;
    }
  },
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menu {
  background-color: darkslateblue;
  padding: 15px;
  border-radius: 5px;
}

.menu a{
  color: white;
  padding: 10px;
}

.room-img {
  width: 100%;
  margin-top: 40px;
}

body {
  margin: 0;
}

div {
  box-sizing: border-box;
}

.black-bg {
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  padding: 20px;
}

.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}
</style>