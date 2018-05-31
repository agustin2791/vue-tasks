import Vue from 'vue';
const state = {
  subjects: [],
  selected: {}
};

const getters = {
  getSubjects (state) {
    return state.subjects;
  },
  getSubject (state) {
    return state.selected;
  },
  getSubjectDetails (state, subject) {
    const record = state.subjects.find(element => element.id == subject);
    if (record) {
      console.log(record);
      return record;
    }
  }
};

const mutations = {
  'LOAD_SUBJECTS'(state, subjects){
    state.subjects = subjects;
  },
  'SELECT_SUBJECT'(state, subject) {
    const record = state.subjects.find(element => element.id == subject);
    console.log(record);
    state.selected = record;
  },
  'NEW_SUBJECT_NAME'(state, name) {
    const record = state.subjects.find(element => element.name == name);
    console.log(name)
    if (record) {
      return false;
    } else {
      let ids = [];
      let newId;
      if (state.subjects.length > 0 ) {
        for (let i = 0; i < state.subjects.length; i++) {
          ids.push(state.subjects[i].id);
        }
        console.log(ids);
        newId = Math.max(...ids) + 1;
      } else {
        console.log('else');
        newId = 1;
      }
      state.subjects.push({ id: newId, name: name, categories: []})
      Vue.http.put('subjects.json', state.subjects);
    }
  },
  'DELETE_SUBJECT'(state, subject) {
    const record = state.subjects.find(element => element.id == subject);
    console.log(getters);
    if (record) {
      let index = state.subjects.indexOf(record);
      state.subjects.splice(index, 1);
      Vue.http.put('subjects.json', state.subjects);
    }
    if (state.subjects.length > 0) {
      state.selected = state.subjects[0]
    } else {
      state.selected = {};
    }
  },
  'NEW_CATEGORY'(state, {subjectId, name}) {
    let record = state.subjects.find(element => element.id == subjectId);
    if (record) {
      if (record.categories != null) {
        console.log('push');
        record.categories.push(name);
        Vue.http.put('subjects.json', state.subjects);
      } else {
        console.log('equals')
        record.categories = [name];
        Vue.http.put('subjects.json', state.subjects);
      }

    }
  },
  'REMOVE_CATEGORY'(state, {subjectId, index}) {
    let record = state.subjects.find(element => element.id == subjectId);
    if (record) {
      record.categories.splice(index, 1);
      Vue.http.put('subjects.json', state.subjects);
    }
  }
};

const actions = {
  selectSubject({commit}, subject) {
    commit('SELECT_SUBJECT', subject);
  },
  addSubject({commit}, name) {
    commit('NEW_SUBJECT_NAME', name);
  },
  deleteSubject({commit}, subject) {
    commit('DELETE_SUBJECT', subject);
  },
  addCategory({commit}, {subjectId, name}) {
    commit('NEW_CATEGORY', {subjectId, name});
  },
  removeCategory({commit}, {subjectId, index}) {
    commit('REMOVE_CATEGORY', {subjectId, index});
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
