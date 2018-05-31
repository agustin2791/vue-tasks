import Vue from 'vue';
const state = {
  tasks: [],
  completed: []
};

const mutations = {
  'ADD_NEW_TASK'(state, task) {
    let newId = 1,
        ids = [];

    if (state.tasks != null) {
      for (let i = 0; i < state.tasks.length; i++) {
        ids.push(state.tasks[i].id);
      }
      newId = Math.max(...ids) + 1
      state.tasks.push({
        id: newId,
        name: task.name,
        due: task.due,
        subject: task.subject,
        description: task.description,
        notes: [],
        category: task.category
      })
    } else {
      state.tasks = [
        {
          id: newId,
          name: task.name,
          due: task.due,
          subject: task.subject,
          description: task.description,
          notes: [],
          category: task.category
        }
      ]
    }
    Vue.http.put('tasks.json', state.tasks);
  },
  'ADD_TASK_NOTE'(state, {id, note, creator, date}) {
    const record = state.tasks.find(element => element.id == id);
    if (record) {
      if (record.notes) {
        record.notes.splice(0, 0, {
        date: date,
        note: note,
        creator: creator
        })
      } else {
        record.notes = [{
          date: date,
          note: note,
          creator: creator
        }]
      }
      Vue.http.put('tasks.json', state.tasks);
    }
  },
  'UPDATE_DESC'(state, {id, note}) {
    state.tasks.map(task => {
      if (task.id == id) {
        task.description = note
      }
    });
  },
  'LOAD_TASKS'(state, tasks) {
    state.tasks = tasks;
  },
  'DELETE_TASK'(state, index) {
    let record = state.tasks.find(element => element.id == index);
    let delIndex = state.tasks.indexOf(record);
    state.tasks.splice(delIndex, 1);
    // state.tasks.splice(index, 1);
    Vue.http.put('tasks.json', state.tasks);
  },
  'DELETE_TASKS'(state, name) {
    if (state.tasks.length > 0) {
      for (let i = state.tasks.length - 1; i > 0 ; i--) {
        if (state.tasks[i].subject == name) {
          state.tasks.splice(i, 1);
        }
      }
    }
  },
  'LOAD_COMPLETED'(state, tasks) {
    state.completed = tasks;
  },
  'COMPLETED_TASK'(state, task) {
    let date = new Date(),
        today = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
    let complete = state.tasks.find(element => element.id == task);
    if (state.completed != null) {
      complete.closedDate = today;
      state.completed.splice(0, 0, complete);
      let index = state.tasks.indexOf(complete);
      state.tasks.splice(index, 1)
    } else {
      complete.closedDate = today;
      state.completed = [complete];
      let index = state.tasks.indexOf(complete);
      state.tasks.splice(index, 1)
    }
    Vue.http.put('completed.json', state.completed);
    Vue.http.put('tasks.json', state.tasks);
  }
};

const actions = {
  addNote({commit}, note) {
    commit('ADD_TASK_NOTE', note);
  },
  addTask({commit}, task) {
    commit('ADD_NEW_TASK', task);

  },
  updateDescription({commit}, note) {
    commit('UPDATE_DESC', note);
  },
  deleteTask({commit}, index) {
    commit('DELETE_TASK', index);
  },
  deleteTasks({commit}, name) {
    commit('DELETE_TASKS', name);
  },
  completeTask({commit}, task) {
    commit('COMPLETED_TASK', task);
  }
};

const getters = {
  getTasks(state, getters) {
    let taskList = [];
    const currentSub = getters.getSubject.name;
    if (state.tasks) {
        for (let i = 0; i < state.tasks.length; i++) {
        console.log(state.tasks[i].subject);
        if (state.tasks[i].subject == currentSub) {
          taskList.push(state.tasks[i]);
        }
      }
    }
    console.log('Task List: ' + taskList)
    return taskList;
  },
  allTasks(state) {
    return state.tasks;
  },
  getCompletedTasks(state) {
    return state.completed;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
