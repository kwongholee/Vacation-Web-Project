<template>
  <div>
    <div v-if="step == 0">
      <Post v-for="(a,i) in data" :key="i" :a="a" />
    </div>

    <div v-if="step == 1">
      <div :class="`upload-image ${imageFilter}`" :style="`background-image:url(${image})`"></div>
      <div class="filters">
        <FilterBox v-for="(a,i) in filter" :key="i" :filter="a" :image="image"><span>{{ a }}</span></FilterBox>
      </div>
    </div>

    <div v-if="step == 2">
      <div :class="`upload-image ${imageFilter}`" :style="`background-image: url(${image})`"></div>
      <div class="write">
        <textarea @input="$emit('postText', $event.target.value)" class="write-box">write!</textarea>
      </div>
    </div>

    <div v-if="step == 3">
      <MyPage />
    </div>
  </div>
</template>

<script>
import Post from './Post.vue'
import FilterBox from './FilterBox.vue'
import MyPage from './MyPage.vue'

export default {
  name: 'TheContainer',
  data() {
    return {
      filter: [ "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],
      imageFilter: '',
    }
  },
  components: {
    Post,
    FilterBox,
    MyPage,
  },
  props: {
    data: Array,
    step: Number,
    image: String,
  },
  mounted() {
    this.emitter.on('imageFilter', (a) => {
      this.imageFilter = a;
    })
  }
}
</script>

<style>
.upload-image{
width: 100%;
height: 450px;
background: cornflowerblue;
background-size : cover;
}
.filters{
overflow-x:scroll;
white-space: nowrap;
}
.filter-1 {
width: 100px;
height: 100px;
background-color: cornflowerblue;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
}
.filters::-webkit-scrollbar {
height: 5px;
}
.filters::-webkit-scrollbar-track {
background: #f1f1f1; 
}
.filters::-webkit-scrollbar-thumb {
background: #888; 
border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
background: #555; 
}
.write-box {
border: none;
width: 90%;
height: 100px;
padding: 15px;
margin: auto;
display: block;
outline: none;
}
</style>