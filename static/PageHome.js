import KmGraph from "./KmGraph.js";

export default {
	template: `
<article>
	<h1>RERU Experts lookup</h1>
	<form @submit.prevent="search($event.target.json())" class=row>
		<input type=search name=q placeholder="ใส่ keyword สำหรับค้นหา" class=col>
		<button class=col-1>🔍</button>
	</form>
	<div class=row>
	<div class=col-6 v-if=user>
		<h2>👤 บุคลากร</h2>
		<ul v-if=user.length>
			<li v-for="u in user">
				<router-link :to="{name:'User', params:{id:u.id}}">{{ u.firstName }} {{ u.lastName }} - {{u.function}} {{u.department}}</router-link>
			</li>
		</ul>
		<h4 v-else>ไม่พบข้อมูลที่ค้นหา ☹</h4>
	</div>

	<div class=col-6 v-if=activity>
		<h2>📅 กิจกรรม</h2>
		<ul v-if=activity.length>
			<li v-for="a in activity">
				<router-link :to="{name:'Activity', params:{id:a.id}}">{{ a.type }} - {{ a.name }}</router-link>
				by
				<router-link :to="{name:'User', params:{id:a.u_id}}">{{ a.u_id }}</router-link>
			</li>
		</ul>
		<h4 v-else>ไม่พบข้อมูลที่ค้นหา ☹</h4>
	</div>
	</div>
	<h1>RERU Experts Graph</h1>
	<KmGraph @click=click />
</article>
`,
	components: { KmGraph },
	data: () => ({ user: null, activity: null }),
	methods: {
		search(params) {
			["user", "activity"].forEach(t => this.rest(`/${t}/`, 'GET', params).then(json => this[t] = json))
		},
		click(node) {
			if (node.avatar) {
				this.$router.push({ name: 'User', params: { id: node.id } })
			}
		},
	}
};
