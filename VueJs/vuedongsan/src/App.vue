<template>  
  <div class="menu">
    <a v-for="abc in menus" :key="abc">{{abc}}</a>
  </div>

  <!-- <Discount v-if="showDiscount" /> -->

  <h4>지금 구매하면 {{ percent }}% 할인 ㄷㄷ</h4>

  <transition name="fade">
    <Modal @closeModal="modalOpen = false" :onerooms="onerooms" :modalNum="modalNum" :modalOpen="modalOpen" />  
  </transition>

  <Products @openModal="modalOpen = true; modalNum=i" :i="i" :onerooms="onerooms" :declaration="declaration" v-for="(a, i) in onerooms" :key="i" />

  <button @click="sortBack()">되돌리기</button>
  <button @click="priceSort()">가격순 정렬</button>
  <button @click="priceSortReverse()">가격 역순 정렬</button>
</template>

<script>
import data from './oneroom';
// import Discount from './Discount.vue';
import Modal from './Modal.vue';
import Products from './Products.vue';

export default {
  name: 'App',
  data() {
    return {
      oneroomsOriginal: [...data],
      modalOpen: false,
      // blueColor: 'color: blue',
      menus: ['Home', 'Shop', 'About'],
      products: ['역삼동 원룸', '천호동 원룸', '마포구 원룸'],
      onerooms: data,
      declaration: [0,0,0,0,0,0],
      modalNum: 0,
      showDiscount: true,
      percent: 30,
    }
  }, 
  methods: {
    increase(i) {
      this.declaration[i] += 1;
    },
    sortBack() {
      this.onerooms = [...this.oneroomsOriginal];
    },
    priceSort() {
      this.onerooms.sort(function(a,b) {return a.price - b.price})
    },
    priceSortReverse() {
      this.onerooms.sort(function(a,b) {return b.price - a.price})
    }
  },
  components: {
    // Discount,
    Modal, 
    Products, 
  },
  mounted() {
    while(this.percent > 0) {
        setInterval(() => {
        this.percent--;
      }, 1000);
    }
  },
  beforeUpdate() {
    if(this.month == 2) {
      alert('2개월 너무 짧지 않음? 안팜 ㅅㄱ')
    }
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

.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  transform: translateY(0px);
}

.fade-leave-active {
  transition: all 1s;
}

.fade-leave-to {
  transform: translateY(-2000px);
}
</style>