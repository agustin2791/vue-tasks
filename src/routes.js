import Home from './components/Home.vue';
import Subjects from './components/subjects/Subjects.vue';
import CompletedTasks from './components/complete/CompletedTasks.vue';
import Tasks from './components/active/Tasks.vue';
import SubjectDetails from './components/subjects/SubjectDetails.vue';

export const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/tasks', name: 'tasks', component: Tasks },
  { path: '/subjects', name: 'subjects', component: Subjects },
  { path: '/subjects/details/:id', name: 'subject-details', component: SubjectDetails },
  { path: '/completed-tasks', name: 'completed', component: CompletedTasks }
]
