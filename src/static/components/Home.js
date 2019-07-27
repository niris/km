const template = `
	<div class=home>
    <div class="head">
    <h1>RERU Experts lookup</h1>

<form method=GET action=/search v-on:submit.prevent=search>
		<fieldset>
		<input class=placeholder type=search name=keyword v-model="searchtext" placeholder="ใส่ keyword สำหรับค้นหา และกด Enter ...">
		<a v-if="searchtext || !seen" @click=flush()>&times;</a>
		<select class=selection v-model="selected" name=type>
  		<option v-for="option in options" v-bind:value="option.value">
   		 {{ option.text }}
  	</option>
</select>
		<button class="search-button">&#128269;&#xFE0E;</button>
		</fieldset>
		<div v-if="searchtext && !seen">
		<h2 v-if="users && users.length"><img src="https://icongr.am/material/account.svg"> บุคลากร </h2>
		<ul v-if=users>
			<li v-for="u in users">
				<router-link :to="{name:'User', params:{id:u._id}}">{{ u.firstName }} {{ u.lastName }} - {{u.function}} {{u.department}}</router-link>
				{{user}}
			</li>
		</ul>
		<h2 v-if="activities && activities.length"><img src="https://icongr.am/material/calendar.svg"> กิจกรรม </h2>
		<ul v-if=activities>
			<li v-for="a in activities"><router-link :to="{name:'Activity', params:{id:a._id}}">{{ a.type }} - {{ a.name }}</router-link> by <router-link :to="{name:'User', params:{id:a.u_id}}">{{ a.u_id }}</router-link></li>
		</ul>
</div>
	
	<div title="*ใส่คำค้นหาใหม่อีกครั้ง หรือ คลิกที่เครื่องหมาย x เพื่อกลับไปยังหน้าหลัก" v-if="activities && users && !users.length && !activities.length && !seen">  <h4>ไม่พบข้อมูลที่ค้นหา &#9785;&#xFE0E;</h4></div>

	</form>
</div>
<div class="grp">  
    <Graph v-if="seen" id=""></Graph>
	</div>
</div>
`

import Graph from "./Graph.js";
export default {
  template,
  components: { Graph },
  data: () => ({
    users: null,
    activities: null,
    selected: "any",
    seen: true,
    searchtext: "",
    options: [
      { text: "ทั้งหมด", value: "any" },
      { text: "บุคลากร", value: "user" },
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
      this.seen = false;
    },
    flush() {
      this.searchtext = "";
      this.seen = true;
    }
  }
};
