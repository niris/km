<template>
	<div>
    <div class="head">
    <h1>RERU Experts lookup</h1>
  <div class="search-desc">
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px"
	 height="24px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
  <g id="Icons" style="opacity:0.75;">
	<g id="arched-arrow-rtl">
		<path id="arrow_8_" style="fill-rule:evenodd;clip-rule:evenodd;" d="M13.401,8.542c-2.814-0.027-4.549,0.978-5.513,1.823
			l-1.48-2.329l-2.391,6.901l6.782,0.009l-1.474-2.319c0.668-0.584,1.945-1.504,3.675-1.791c4.172-0.69,6.925,1.949,6.925,1.949
			S18.288,8.588,13.401,8.542z"/>
	</g>
</g>
<g id="Guides" style="display:none;">
</g>
</svg> ใส่ keyword สำหรับค้นหา และกด Enter
 </div>

<form method=GET action=/api/search v-on:submit.prevent=search>
		<fieldset>
		<input type=search name=keyword placeholder="Enter your keywords ...">
		<ul class=flex-space-between>
			<li><label><input type=radio name=type value=user> ผู้เชี่ยวชาญ</label></li>
			<li><label><input type=radio name=type value=activity> กิจกรรม</label></li>
			<li><label><input type=radio name=type value=any checked> ทั้งหมด</label></li>
			<button>Search</button>
		</ul>
		</fieldset>
		<h2 v-if="users && users.length"><img src="/public/img/single-01.svg"> ผู้เชี่ยวชาญ </h2>
		<ul v-if=users>
			<li v-for="u in users">
				<router-link :to="{name:'User', params:{id:u._id}}">{{ u.firstName }} {{ u.lastName }} - {{u.function}} {{u.department}}</router-link>
				{{user}}
			</li>
		</ul>
		<h2 v-if="activities && activities.length"><img src="/public/img/calendar-60.svg"> กิจกรรม </h2>
		<ul v-if=activities>
			<li v-for="a in activities"><router-link :to="{name:'Activity', params:{id:a._id}}">{{ a.type }} - {{ a.name }}</router-link> by <router-link :to="{name:'User', params:{id:a.u_id}}">{{ a.u_id }}</router-link></li>
		</ul>
		<h4 v-if="activities && users && !users.length && !activities.length">   ไม่พบข้อมูลสำหรับการค้นหา &#9785; </h4>
	</form>
</div>

<div class="grp">  
    <Graph v-if= "!users && !activities" id=""></Graph>
	</div>
  	</div>
</template>

<script>
import Graph from "@/components/Graph";
export default {
  components: { Graph },
  data: () => ({
    users:null,
    activities:null,
  }),
  methods: {
    search($event){
      this.users = this.activities = null;
      this.sfetch($event.target).then(req=>req.json())
      .then(([u,a]) => [this.users, this.activities] = [u, a])
      .catch(this.$root.$refs.toast)
    }
  },
};
</script>

<style scoped>
h1 {
  font-size: 200%;
  text-align: center;
  margin-bottom : 25px;
}

h2 {
  font-size: 150%;
  text-align: left;
}

h4 {

	margin-top : 5%;
	font-size: 125%;
	text-align:center;
  color: #A9A9A9;
}

.head {
  height: 25%;
}

.grp {
  height: 75%;
}

.search-desc {
  margin-top: 50px;
  margin-left: 50px;
}

.flex-space-between{
	padding: 0;
	display: flex;
	list-style: none;
	justify-content: space-between;
}
</style>
