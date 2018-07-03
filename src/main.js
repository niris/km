import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
Vue.mixin({
  methods: {
    sfetch(form, query="") {
      var params = { headers: { authorization: localStorage.token }, method: ((form.attributes||{}).method||{}).value || 'GET', query};
      if (form instanceof HTMLFormElement) {
        if (params.method.match(/^POST$/i)) params.body = new FormData(form);
        else params.query = '?' + new URLSearchParams(new FormData(form));
        params.path = new URL(form.action).pathname;
      } else {
        params.path = form;
        params.query = '?'+Object.keys(params.query).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params.query[k])).join('&');
      }
      return fetch(params.path+params.query, params).then(r => {
        if (!r.ok) throw Error(r.statusText);
        if (r.headers.has('authorization')) {
          this.$root.token = r.headers.get('authorization');
        }
        return r;
      })
    }
  }
})

import App from '@/App'
import Home from '@/components/Home'
import Activity from '@/components/Activity'
import User from '@/components/User'

new Vue({
  el: '#app',
  render: h => h(App),
  data: function () {
    return {
      get token() { return localStorage.getItem('token') || ''; },
      set token(v) { localStorage.setItem('token', v) },
      get me() { return (localStorage.getItem('token') || '').split(' ')[0]; },
    };
  },

  router: new Router({
    mode: 'history',
    routes: [
      { path: '/', name: "Home", component: Home },
      { path: '/activity/:id?', name: "Activity", component: Activity, props: true },
      { path: '/user/:id?', name: "User", component: User, props: true },
    ]
  }),
})

