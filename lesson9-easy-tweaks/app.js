'use strict';

Vue.component('tasks', {
    template: '#tasks-template',

    props: ['list'],

    computed: {
        remaining: function() {
            //var vm = this;
            // return this.list.filter(function(task) {
            //     return ! vm.isCompleted(task);
            // }).length;

            return this.list.filter(this.inProgress).length;
        }
    },

    methods: {
        isCompleted: function(task) {
            return task.completed;
        },

        inProgress: function(task) {
            return ! this.isCompleted(task);
        },

        deleteTask: function(task) {
            this.list.$remove(task);
        },

        clearCompleted: function() {
            this.list = this.list.filter(this.inProgress);
        }
    }
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