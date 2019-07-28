const template = `
	<nav>
		<a href=//km.reru.ac.th class=logo>
		<img src=/static/logo.svg>
		<span class="km" style=vertical-align:super>KM</span>
		</a>
		<router-link to=/> Experts lookup</router-link>
		<router-link title="เพิ่มกิจกรรมใหม่" v-if=$auth.get.name to=/activity> Activity</router-link>
		<router-link v-if=!$auth.get.name to=/user>Sign Up</router-link>
		<template v-if=$auth.get.name>
			<router-link :to="{name:'User', params:{id:this.$root.me}}">My profile</router-link>
			<button v-on:click=logout title="Sign Out" style="line-height:0"><img src="https://icongr.am/material/logout.svg?size=24&color=FFFFFF"></button>
		</template>
		<form v-else v-on:submit.prevent="login($event.target)">
			<input placeholder=👤 name=username autocomplete="username">
			<input placeholder=🔑 name=password type=password autocomplete="current-password">
			<button title="Sign In" style="line-height:0"><img src="https://icongr.am/material/login.svg?size=24&color=FFFFFF"></button>
		</form>
	</nav>
`

export default {
  template,
  methods: {
    login(form) {
      this.rest('/auth/', 'POST', form.json()).then(r => this.$auth.logout(this.$root.$refs.toast("Welcome !")))
    },
    logout() {
      this.rest('/auth/', 'DELETE').then(this.$auth.logout)
    }
  }
};
