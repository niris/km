const template = `
	<nav>
		<a href=//km.reru.ac.th class=logo>
		<svg width="48px" height="48px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
			<defs><radialGradient id="svg_4" spreadMethod="pad"><stop stop-color="#ffff80" offset="0"/><stop stop-color="#00007f" offset="1"/></radialGradient></defs>
			<g>
			<ellipse fill="#007f3f" stroke-width="5" cx="128" cy="128.000001" id="svg_1" rx="96" ry="120" stroke="#bfbf00"/>
			<ellipse fill="url(#svg_4)" stroke-width="4" cx="128" cy="128" id="svg_2" rx="75" ry="100" stroke="#bfbf00"/>
			<ellipse fill="#007f00" stroke-width="4" cx="128" cy="128" id="svg_5" rx="32" ry="32" stroke="#bfbf00"/>
			<path fill="#ffffff" stroke-width="0" stroke-opacity="null" fill-opacity="null" d="m90.000002,191.863804l37.999954,-17.188427l38.000044,17.188427l-14.514659,27.811576l-46.970636,0l-14.514703,-27.811576z" id="svg_8" stroke="#bfbf00"/>
			<path fill="#ffffff" stroke-width="0" stroke-opacity="null" fill-opacity="null" d="m97,88.520624l31.000001,-55l31.000001,55l-62.000002,0z" id="svg_9" stroke="#bfbf00"/>
			</g>
			</svg> <span class="km">KM</span>
		</a>
		<router-link to=/> Experts lookup</router-link>
		<router-link title="เพิ่มกิจกรรมใหม่" v-if=this.$root.token to=/activity> Activity</router-link>
		<router-link v-if=!this.$root.token to=/user>Sign Up</router-link>
		<template v-if=this.$root.token>
			<router-link :to="{name:'User', params:{id:this.$root.me}}">My profile</router-link>
			<button v-on:click=logout title="Sign Out"><svg xmlns="http://www.w3.org/2000/svg" width="22px" height="16px" viewBox="-4 0 32 32"><path d="m 18,24 0,4 -14,0 0,-24 14,0 0,4 4,0 0,-8 -22,0 0,32 22,0 0,-8 z m -6,-4.003 0,-8 12,0 0,-4 8,8 -8,8 0,-4 z" /></svg></button>
		</template>
		<form v-else v-on:submit.prevent="login($event.target)" method=POST action=/token>
			<input placeholder=👤 name=_id autocomplete="username">
			<input placeholder=🔑 name=password type=password autocomplete="current-password">
			<button title="Sign In"><svg xmlns="http://www.w3.org/2000/svg" width="22px" height="16px" viewBox="-4 0 32 32"><path d="m 14,24 v 4 H 28 V 4 H 14 V 8 H 10 V 0 H 32 V 32 H 10 V 24 Z M 6,20 V 12 H 18 V 8 l 8,8 -8,8 v -4 z" /></svg></button>
		</form>
	</nav>
`

export default {
  template,
  methods: {
    login(form) {
      this.sfetch(form)
        .then(r => this.$root.$refs.toast("Sign In Successful. Welcome !"))
        .catch(r => this.$root.$refs.toast(r));
    },
    logout() {
      this.$root.token = "";
    }
  }
};
