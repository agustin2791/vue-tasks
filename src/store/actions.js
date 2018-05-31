import Vue from 'vue';

export const loadTasks = ({commit}) => {
  Vue.http.get('tasks.json')
          .then(response => response.json())
          .then(data => {
            commit('LOAD_TASKS', data);
          })
};
export const loadSubjects = ({commit}) => {
  Vue.http.get('subjects.json')
          .then(response => response.json())
          .then(data => {
            commit('LOAD_SUBJECTS', data);
            if (data.length > 0) {
              commit('SELECT_SUBJECT', 1);
            };
          })
};
export const loadCompleted = ({commit}) => {
  Vue.http.get('completed.json')
          .then(response => response.json())
          .then(data => {
            commit('LOAD_COMPLETED', data)
          })
};
