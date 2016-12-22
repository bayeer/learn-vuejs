<script lang="babel">
import Vue from 'vue';

export default {
    props: ['tasks'],

    data() {
        return {
        };
    },

    methods: {
        updateTask(task) {
            //
        },

        editTask(task) {
            task.editing = !task.editing;

            console.log('trying to edit task:');
            console.log(task);
        },

        editDone(task) {

            this.$http.put('/api/tasks/'+task.id, task).then((response) => {
                var answer = response.body;

                if (answer.errCode == 0) {
                    console.log('task successfully updated:');
                    console.log(answer);
                    task.editing = false;
                }
            });
        },

        completeTask(task) {
            task.completed = !task.completed;
        },

        addTask(e) {
            console.log(e);
            var textBox = e.target;
            console.log(textBox.value);

            var task = {
                name: textBox.value,
                completed: false,
                editing: false
            };

            this.$http.post('/api/tasks', task).then((response) => {
                console.log(response.data);
                task = response.data.task;
                task.editing = false;

                // this.tasks.push(task); // add to end of array
                this.tasks.unshift(task); // add to beginning
                textBox.value = '';
            });
        },

        deleteTask: function(task) {
            var task_id = task.id;
            console.log('deleting task with id: ' + task_id);

            var vm = this;

            this.$http.delete('/api/tasks/' + task_id).then(function(response) {
                var answer = response.body;
                //console.log(response.body);


                if (answer.errCode == 0) {
                    vm.tasks.$remove(task);
                } 
            });
        },

        cancelEdit(task) {
            console.log('cancelling edit');
            console.log(task);

            task.editing = false;
        }

    },

    // a custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    // http://vuejs.org/guide/custom-directive.html
    directives: {
        'task-focus': function (el, value) {
            if (value) {
                el.focus()
            }
        }
    },

    computed: {
    },

    created() {
        console.log('Tasks component created...');
        var vm = this;

        this.$http.get('/api/tasks').then((response) => {
            var items = response.body;
            



            // could not fix the issue:

            // // adding extra property to every 'task' object
            // items.forEach(function(part, index, elems) {
            //     elems[index].editing = false;
            // });
            
            // // correctly initializing 'tasks' object
            // vm.tasks = Object.assign({}, vm.tasks, items);




            this.tasks = items;

            console.log('tasks loaded: ' + items.length);
        });

    }
}
</script>

<template>
    <ul class="list-group">
        <li v-for="task in tasks"
            class="list-group-item"
            :key="task.id"
            :class="{ edit: task.editing, completed: task.completed }"
        >
            <span class="view">{{ task.name }}</span>
            <input v-model="task.name"
                v-on:keyup.enter="editDone(task)"
                v-on:keyup.esc="cancelEdit(task)"
                v-task-focus="task"
            >

            <a href="#" class="btn btn-sm btn-default list-item-btn" @click="deleteTask(task)"><i class="glyphicon glyphicon-remove"></i></a>
            <a href="#" class="btn btn-sm btn-default list-item-btn" @click="editTask(task)"><i class="glyphicon glyphicon-edit"></i></a>
            <a href="#" class="btn btn-sm btn-default list-item-btn" @click="completeTask(task)"><i class="glyphicon glyphicon-check"></i></a>
        </li>
    </ul>

    <input type="text" class="form-control" placeholder="New task"
        v-on:keyup.enter="addTask"
    >
</template>

<style lang="stylus">
    li.completed
        text-decoration: line-through
        color: green
    li
        input
            display: none
        .view
            display: inline
    li.edit
        input
            display: inline
        .view
            display: none
</style>