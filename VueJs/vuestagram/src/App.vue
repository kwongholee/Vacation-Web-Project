<template>
  <div class="header">
    <ul class="header-button-left">
      <li v-if="step != 0" @click="step--">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">Post</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <Container @postText="text = $event" :data="data" :step="step" :image="image" />

  <button v-if="step == 0" @click="morePost()">더보기</button>

  <div v-if="step == 0" class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
 </div>

</template>

<script>
import Container from './components/Container.vue'
import data from './assets/Data'
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      data: data,
      count: 0,
      step: 0,
      image: '',
      text: '',
      imageFilter: '',
    }
  },
  components: {
    Container,
  },
  methods: {
    morePost() {
      axios.get(`https://codingapple1.github.io/vue/more${this.count}.json`)
      .then((result) => {
        this.data.push(result.data);
        this.count++;
      })
    },
    upload(e) {
      let picture = e.target.files;
      let url = URL.createObjectURL(picture[0]);
      this.image = url;
      this.step = 1;
    },
    publish() {
      var myPost = {
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.image,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.text,
        filter: this.imageFilter
      };
      this.data.unshift(myPost);
      this.step = 0;
    }
  },
  mounted() {
    this.emitter.on('imageFilter', (a) => {
      this.imageFilter = a;
    })
  }
}
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
