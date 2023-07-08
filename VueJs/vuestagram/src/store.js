import {createStore} from 'vuex'
import axios from 'axios'

const store = createStore({
  state () {
    return {
      likes: 30,
      likeCount: 0,
      more: {}
    }
  },
  mutations: {
    likeUp(state) {
      if(state.likeCount == 0) {
        state.likes++;
        state.likeCount = 1
      }
      else {
        state.likes--;
        state.likeCount = 0;
      }
    },
    setMore(state, data) {
      state.more = data
    }
  },
  actions: {
    getData(context) {
      axios.get(`https://codingapple1.github.io/vue/more0.json`)
      .then((a) => {
        context.commit('setMore', a.data);        
      })
    }
  }
})

export default store;