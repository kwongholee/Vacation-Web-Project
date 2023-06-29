<template>
  <div>
    <Post v-for="(a,i) in data" :key="i" :a="a" />
  </div>
</template>

<script>
import Post from './Post.vue'
export default {
  name: 'TheContainer',
  components: {
    Post,
  },
  props: {
    data: Array
  }
}
</script>

<style>

</style>