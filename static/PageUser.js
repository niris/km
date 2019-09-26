import KmGraph from "./KmGraph.js";
import KmAvatar from "./KmAvatar.js";
import KmField from "./KmField.js";

export default {
	template: `
	<form @submit.prevent="(create?post:put)($event.target.json())">
		<h1 class=is-sticky v-if=!summary>
			<template v-if=create>สมัครสมาชิก</template>
			<template v-if=update>My Account</template>
			<template v-if=search>ข้อมูลสมาชิก </template>

			<button v-if="create">✓ Create</button>
			<button v-if="update&& edit">✓ Update</button>
			<button v-if="update&& edit" @click.prevent="editmode=false">✕ Cancel</button>
			<button v-if="update&&!edit" @click.prevent="editmode=true">✎ Edit</button>
		</h1>
		<Km-Avatar :value=user.avatar :edit=edit></Km-Avatar>
		<div class=grid-a-1 v-if=user>
			<template v-for='a in attrs.filter(a=>a.if!==false)'>
				<label :for=a.name>{{a.label}}</label>
				<Km-Field :id=a.name :list=a.list :listclass=a.listclass :edit=edit :attr=a />
			</template>
	
			<label>📅 รายการกิจกรรม</label>
			<ul v-if="(activities||[]).length">
				<li v-for="a in activities" :key=a.id>
					<div class=row>
						<router-link :to="{name:'Activity', params:{id:a.id}}" class=col>{{a.name}}</router-link>
						<button @click.prevent="activityDelete(a.id)" class=col-1 v-if=edit>❌</button>
					</div>
				</li>
			</ul>
			<p v-else>ไม่พบกิจกรรม</p>
		</div>
	</form>
	`,
	components: { KmGraph, KmAvatar, KmField },
	props: ["id", "summary"],

	data: () => ({
		editmode: false,
		user: {},
		activities: [],
		datalist: { domainList: [], knowledgeList: [], function: [], department: [] }
	}),

	computed: {
		edit: function () {
			return this.create || this.editmode;
		},
		create: function () {
			return !this.id;
		},
		update: function () {
			return this.id && this.$auth.get.name == this.id;
		},
		search: function () {
			return this.id && !this.$auth.get.name == this.id;
		},
		attrs: function () {
			const fields = [
				{ label: 'Login', name: 'id', autocomplete: 'username', required: true, disabled: !this.create },
				{ label: 'Password', name: '_password', autocomplete: "current-password", type: 'password', placeholder: "unchanged", value: "", if: this.edit },
				{ label: 'ชื่อ', name: 'firstName', autocomplete: 'given-name' },
				{ label: 'นามสกุล', name: 'lastName', autocomplete: 'family-name' },
				{ label: 'หน่วยงาน', name: 'department', autocomplete: 'organization' },
				{ label: 'ตำแหน่ง', name: 'function', autocomplete: 'organization-title' },
				{ label: 'วันที่เริ่มทำงาน', name: 'startwork', type: 'date', /*max: new Date().toISOString().split('T')[0]*/ },
				{ label: 'Email', name: 'email', autocomplete: 'email' },
				{ label: 'เบอร์โทรศัพท์', name: 'phone', autocomplete: 'tel-national' },
				{ label: 'ที่อยู่', name: 'address', autocomplete: 'street-address' },
				{ label: 'ผลงานวิชาการ', name: 'publicationList', list: true, placeholder: "publications" },
				{ label: 'ความชำนาญหลัก', name: 'domainList', listclass:'tag is-small', list: true },
				{ label: 'ความชำนาญรอง', name: 'knowledgeList', listclass:'tag is-small', list: true },
				{ label: 'ความรู้ที่อยากฝึกฝนเพิ่มเติม', name: 'additional', rows: 16 },
				{ label: 'คำอธิบายเพิ่มเติม', name: 'description', rows: 16 },
			]
			fields.forEach(f => f.datalist = this.datalist[f.name])
			fields.forEach(f => f.value = this.user[f.name])
			return fields;
		}
	},

	created() {
		this.load(this.id);
	},

	methods: {
		load(u_id) {
			if (!u_id) return;
			this.rest(`/km/user/${u_id}`+"_.json").then(res => this.user = res)
			this.rest(`/km/activity/`+"_.json", 'GET', {u_id}).then(res => this.activities = res)
			this.rest(`/km/user/`+"_.json").then(users => {
				for (let dl in this.datalist) this.datalist[dl] = new Set([].concat(...users.map(u => u[dl])))
			})
		},
		post(form) {
			this.rest('/km/user/'+"_.json", "POST", form).then(id => {
				this.$root.$refs.toast(`Profil Created ! You can Login`);
				this.$router.push({ name: "Sign" });
				this.editmode = false;
			})
		},
		put(form) {
			this.rest('/km/user/' + form.id+"_.json", "PUT", form).then(id => {
				this.$root.$refs.toast(`Profil Updated !`);
				this.load(this.id);
				this.editmode = false;
			});
		},
		activityDelete(id) {
			this.rest(`/km/activity/${id}`+"_.json", 'DELETE').then(r => {
				this.$root.$refs.toast("Activity Deleted");
				this.load(this.id);
			});
		},
	},
	watch: {
		id: function (id) {
			this.load(id);
		}
	}
};