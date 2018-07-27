<template>
	<div>
		<NavBar/>
		<main>
			<router-view/>
		</main>
		<Toaster/>
	</div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Toaster from "@/components/Toaster";

export default {
  components: { NavBar, Toaster }
};
</script>

<style>
body {
  background: #ededed;
}
@media only screen{
  main {
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid #ccc;
    border-radius: 0.4em;
    padding: 1em 2em 2em 2em;
    margin: 2em auto;
  }
}

button {
  cursor: pointer;
}
@media (min-width: 500px) {
  .grid-m-a label {
    line-height: 2.5;
    text-align: right;
  }
  .grid-m-a p, .grid-m-a ul{
    line-height: 2.5;
    margin:0
  }
  .grid-m-a {
    display: grid;
    grid-gap: 0.5em 1em;
    grid-template-columns: auto 1fr;
  }
  .grid-m-a label > em {
    display: block;
    clear: both;
    line-height: 0;
    font-size: smaller;
  }

}
@media print{
  .fab{
    display:none !important;
  }
}
.fab {
  position: fixed;
  bottom: 0.5em;
  right: calc(50% - 480px);
  z-index: 99;
}
@media (max-width: 960px) {
	.fab {
		right: 0.5em;
	}
}
.fab button {
  border-radius: 10em;
  font-size: xx-large;
  display: block;
  margin: 0.5em;
  width: 2em;
}
.tags {
  margin:0;
  padding:0;
}
.tags li{
  display: inline-block;
  border-radius: 1em;
  padding: 0 .5em;
  line-height: 1.5em;
  margin-right: .5em;
  box-shadow: 0.05em 0.05em 0.1em;
}

.tags li.tag2{
  /*background: #F8F8F8;*/
  font-size:small;
}

.tags input{
	background:none!important;
	border:none!important;
	box-shadow:none!important;
	-webkit-box-shadow:none!important;
	padding:0;
	width:9em;
}
.tags button{
	margin:0;
	padding:0;
	min-width:1.5em;
	min-height:1.5em;
}
</style>
