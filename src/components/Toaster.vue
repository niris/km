<template>
  <div id=toaster hidden></div>
</template>
<script>

export default {
	mounted() {
		this.$root.$refs.toast=function (text) {
			toaster.innerHTML = text;
			toaster.hidden=false;
			setTimeout(() => toaster.hidden=true, 5000);
		}
	},
}

</script>
<style scoped>
#toaster {
	position: fixed;
	left: 1em;
	bottom: 1em;
	background: #333;
	border: 1px solid black;
	color: white;
	border-radius: .2em;
	padding: 1em;
	box-shadow: .15em .15em .2em black;
}
</style>