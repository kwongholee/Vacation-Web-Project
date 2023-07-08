<template>
  <div v-for="(a,i) in blogData" :key="i">
    <h5 @click="$router.push('/detail/' + i)">{{ a.title }}</h5>
    <p>{{ a.date }}</p>
  </div>
</template>

<script>
export default {
  name: 'TheList',
  props: {
    blogData: Array,
  }
}
</script>

<style>

</style>