'use strict';

Vue.component('tasks', {
    template: '#tasks-template',
    props: ['list']
});

new Vue({
    el: '#app',
    data: {
        tasks: [
            { name: 'task 1', completed: true },
            { name: 'task 2', completed: false },
            { name: 'task 3', completed: false },
        ]
    }
})