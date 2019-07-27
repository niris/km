const template = `
  <div id=toaster hidden style="position: fixed;	right: 1em;	top:1em;	background: #333;	border: 1px solid black;	color: white;	border-radius: .2em;	padding: 1em;	box-shadow: .15em .15em .2em black;	z-index: 999;"></div>
</template>
`

export default {
	template,
	mounted() {
		this.$root.$refs.toast=function (text) {
			toaster.innerHTML = text;
			toaster.hidden=false;
			setTimeout(() => toaster.hidden=true, 5000);
		}
	},
}
