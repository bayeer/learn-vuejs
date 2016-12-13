'use strict';

new Vue({
    el: '#app',
    data: {
        tasks: [
            { name: 'task 1', completed: true },
            { name: 'task 2', completed: false },
            { name: 'task 3', completed: false },
        ]
    },
    methods: {
        toggleTaskState: function(task) {
            task.completed = !task.completed;
        }
    }
});