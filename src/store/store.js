import Vue from 'vue';
import Vuex from 'vuex';

import categories from './modules/categories';
import tasks from './modules/tasks';
import * as actions from './actions';

Vue.use(Vuex);

export const store = new Vuex.Store({
  actions,
  modules: {
    categories,
    tasks
  }
})
