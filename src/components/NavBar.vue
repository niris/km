<template>
	<nav>
		<a href=//km.reru.ac.th class=logo>
		<svg width="32px" height="32px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
			<defs><radialGradient id="svg_4" spreadMethod="pad"><stop stop-color="#ffff80" offset="0"/><stop stop-color="#00007f" offset="1"/></radialGradient></defs>
			<g>
			<ellipse fill="#007f3f" stroke-width="5" cx="128" cy="128.000001" id="svg_1" rx="96" ry="120" stroke="#bfbf00"/>
			<ellipse fill="url(#svg_4)" stroke-width="4" cx="128" cy="128" id="svg_2" rx="75" ry="100" stroke="#bfbf00"/>
			<ellipse fill="#007f00" stroke-width="4" cx="128" cy="128" id="svg_5" rx="32" ry="32" stroke="#bfbf00"/>
			<path fill="#ffffff" stroke-width="0" stroke-opacity="null" fill-opacity="null" d="m90.000002,191.863804l37.999954,-17.188427l38.000044,17.188427l-14.514659,27.811576l-46.970636,0l-14.514703,-27.811576z" id="svg_8" stroke="#bfbf00"/>
			<path fill="#ffffff" stroke-width="0" stroke-opacity="null" fill-opacity="null" d="m97,88.520624l31.000001,-55l31.000001,55l-62.000002,0z" id="svg_9" stroke="#bfbf00"/>
			</g>
			</svg>RERU
		</a>
		<router-link to=/>Experts lookup</router-link>
		<router-link v-if=this.$root.token to=/activity>New Activity</router-link>
		<template v-if=this.$root.token>
			<router-link :to="{name:'User', params:{id:this.$root.me}}">{{this.$root.me}}</router-link>
			<button v-on:click=logout title="Sign Out">

<svg xmlns="http://www.w3.org/2000/svg" width="22px" height="16px" viewBox="-4 0 32 32"><path d="m 18,24 0,4 -14,0 0,-24 14,0 0,4 4,0 0,-8 -22,0 0,32 22,0 0,-8 z m -6,-4.003 0,-8 12,0 0,-4 8,8 -8,8 0,-4 z" /></svg>

      </button>
		</template>
		<form v-else v-on:submit.prevent="login($event.target)" method=POST action=/api/token>
			<input placeholder=👤 name=_id autocomplete="username">
			<input placeholder=🔑 name=password type=password autocomplete="current-password">
			<button title="Sign In">⟶⃞</button>
		</form>
		<router-link v-if=!this.$root.token to=/user>Sign Up</router-link>
	</nav>
</template>

<script>
export default {
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
</script>
<style scoped>
@media only print{
  nav {
    display:none!important;
  }
}
nav {
  position: sticky;
  top: 0;
  z-index: 99;
  background: white;
  display: flex;
  justify-content: space-around;
  max-width:768px;
  align-items: center;
  box-shadow: 0 0.5em 0.5em -0.5em;
  padding: 0.5em 0;
  background: #1d3557;
  border-radius: 0 0 .5em .5em;
  margin: auto;
}
.logo {
  font-size: 0;
}
.logo svg {
  vertical-align: text-top;
}
@media only screen and (min-width: 760px) {
  .logo {
    font-size: 2em;
    font-family: serif;
  }
}
nav a,
nav a:hover {
  color: #fff;
  margin: 0 0.5em;
  text-align: center;
  text-transform: capitalize;
  line-height: 1em;
}
nav a.router-link-exact-active {
	text-decoration: underline;
}
nav form {
  display: inline-flex;
}
nav form input[placeholder] {
  width: 6em;
}
::-webkit-input-placeholder {
  text-align: right;
}
input:-moz-placeholder {
  text-align: right;
}
</style>