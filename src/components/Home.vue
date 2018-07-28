<template>
	<div>
    <div class="head">
    <h1>RERU Experts lookup</h1>

<form method=GET action=/api/search v-on:submit.prevent=search>
		<fieldset>
		<input class=placeholder type=search name=keyword placeholder="ใส่ keyword สำหรับค้นหา และกด Enter ...">
		<select class=selection v-model="selected" name=type>
  		<option v-for="option in options" v-bind:value="option.value">
   		 {{ option.text }}
  	</option>
</select>
		<button class="search-button"><img src="/public/img/zoom-2.svg"></button>
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
    users: null,
    activities: null,
    selected: "any",
    options: [
      { text: "ทั้งหมด", value: "any" },

      { text: "ผู้เชี่ยวชาญ", value: "user" },
      { text: "กิจกรรม", value: "activity" }
    ]
  }),
  methods: {
    search($event) {
      this.users = this.activities = null;
      this.sfetch($event.target)
        .then(req => req.json())
        .then(([u, a]) => ([this.users, this.activities] = [u, a]))
        .catch(this.$root.$refs.toast);
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 200%;
  text-align: center;
  margin-bottom: 25px;
}

h2 {
  font-size: 150%;
  text-align: left;
}

h4 {
  margin-top: 5%;
  font-size: 125%;
  text-align: center;
  color: #a9a9a9;
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

.flex-space-between {
  padding: 0;
  display: flex;
  list-style: none;
  justify-content: space-between;
}


.placeholder{
	width:70%;
	display:inline-block;
}

.selection {
	
	position:relative;
	width:17%;
	display:inline-block;
	margin-left :1%;
}

button.search-button{

background-color: rgba(255, 255, 255, 0.85);
	display:inline-block;
	padding: 0;
	margin-left : 1%
}


button.search-button img{
	height:75%;
	width:auto;
}	

button.search-button:hover{
border-color:  rgba(255, 255, 255, 0.85);
}


</style>
