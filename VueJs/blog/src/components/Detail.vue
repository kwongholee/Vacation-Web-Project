<template>
  <h2>Detail Page</h2>
  <h3>{{blogData[$route.params.id].title}}</h3>
  <h5>{{blogData[$route.params.id].content}}</h5>
  <p>{{blogData[$route.params.id].date}}</p>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'TheDetail',
  props: {
    blogData: Array,
  }
}
</script>

<style>

</style>