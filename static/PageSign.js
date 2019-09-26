export default {
	template:`
		<form v-if=$auth.get.name @submit.prevent=logout>
			<button class="button error">Sign out</button>
		</form>
		<form v-else @submit.prevent="login($event.target.json())">
			<input placeholder=👤 name=username autocomplete="username">
			<input placeholder=🔑 name=password type=password autocomplete="current-password">
			<button>Sign In</button>
		</form>
	`,
	methods: {
		login(form) {
			this.rest('/km/auth/'+".json", 'POST', form).then(r => {
				this.$auth.login(this.$root.$refs.toast("Welcome !"))
				this.$router.push({ name: "Home" });
			})
		},
		logout() {
		  this.rest('/km/auth/'+".json", 'DELETE').then(this.$auth.logout)
		}
	}
}
