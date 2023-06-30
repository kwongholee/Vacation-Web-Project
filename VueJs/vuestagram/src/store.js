import {createStore} from 'vuex'

const store = createStore({
  state () {
    return {
      likes: 30,
      likeCount: 0,
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
    }
  }
})

export default store;