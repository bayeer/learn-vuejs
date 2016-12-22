'use strict';

import Vue from 'vue';
import Tasks from './components/Tasks.vue';

window.Vue = Vue;
Vue.use(require('vue-resource'));

Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector("meta[name='csrf-token']").getAttribute('content');

new Vue({
    el: '#app',
    
    components: { Tasks },

    data: {
        'title': 'My vue application'
    },

    ready() {
        console.log('ready to rock again!');
    }

});