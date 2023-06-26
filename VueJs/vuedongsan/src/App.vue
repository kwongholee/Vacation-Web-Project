<template>  
  <Discount />

  <div class="menu">
    <a v-for="abc in menus" :key="abc">{{abc}}</a>
  </div>

  <Modal @closeModal="modalOpen = false" :onerooms="onerooms" :modalNum="modalNum" :modalOpen="modalOpen" />

  <Products @openModal="modalOpen = true; modalNum=i" :i="i" :onerooms="onerooms" :declaration="declaration" v-for="(a, i) in onerooms" :key="i" />
  
</template>

<script>
import data from './oneroom';
import Discount from './Discount.vue';
import Modal from './Modal.vue';
import Products from './Products.vue';

export default {
  name: 'App',
  data() {
    return {
      modalOpen: false,
      // blueColor: 'color: blue',
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
    Discount,
    Modal, 
    Products, 
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