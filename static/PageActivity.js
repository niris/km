import KmField from "./KmField.js";
export default {
	template: `
	<form @submit.prevent="(create?post:put)($event.target.json())" @keydown.esc="editmode=false">
		<h1 class="is-sticky hide-pr">
			<template v-if=create>เพิ่มกิจกรรมใหม่</template>
			<template v-if=update>My Activity</template>
			<template v-if=search>Activity detail</template>
			<button v-if="!edit" @click.prevent=print>🖶 Print</button>
			<button v-if=create>✓ create</button>
			<button v-if="update&&edit">✓ Update</button>
			<button v-if="update&&edit" @click.prevent="editmode=false">✕ Cancel</button>
			<button v-if="update&&!edit" @click.prevent="editmode=true">✎ Edit</button>
		</h1>
	
		<div class=grid-a-1 v-if=this.activity>
			<label v-if=!create>Owner</label>
			<p v-if=!create><router-link :to="{name:'User', params:{id:activity.u_id}}">{{activity.u_id}}</router-link></p>
			<template v-for="a in attrs">
				<label :for=a.name>{{a.label}}</label>
				<Km-Field :id=a.name :list=a.list :edit=edit :attr=a />
			</template>
			<input v-if=id type=hidden name=id :value=activity.id>
		</div>
	</form>
	`,
	components: { KmField },
	props: ["id"],
	data: () => ({
		editmode: false,
		datalist: {
			type: ['งานประชุมวิชาการ', 'ศึกษาดูงาน', 'ฝึกอบรม', 'วิจัย', 'บริการวิชาการ', 'ประกวด/แข่งขัน'],
			tagList: []
		},
		activity: {},
	}),
	computed: {
		edit: function () {
			return !this.id || this.editmode;
		},
		create: function () {
			return !this.id;
		},
		update: function () {
			return (
				this.activity.u_id && this.$auth.get.name == this.activity.u_id
			);
		},
		search: function () {
			return (
				this.activity.u_id && this.$auth.get.name != this.activity.u_id
			);
		},
		attrs: function() {
			const fields = [
				{ label: "ประเภทกิจกรรม", name: "type", required:true},
				{ label: "ชื่อกิจกรรม", name: "name", required:true},
				{ label: "สถานที่", name: "place", required:true},
				{ label: "วันที่เริ่ม", name: "start", type: "date", required:true},
				{ label: "วันที่สิ้นสุด", name: "end", type: "date", required:true},
				{ label: "Tags", name: "tagList", list:true},
				{ label: "คำอธิบาย", name: "description", rows: 15 },
				{ label: "สรุปผลการทำกิจกรรม", name: "conclusion", rows: 15 },
			]
			fields.forEach(f => f.datalist = this.datalist[f.name])
			fields.forEach(f => f.value = this.activity[f.name])
			return fields;
		}
	},
	created() {
		this.load(this.$route.params.id);
	},
	watch: {
		"$route.params.id": function (id) {
			this.load(id);
		}
	},
	methods: {
		print() {
			window.print() // print dialog for PDF export
		},
		post(form) {
			this.rest('/activity/', 'POST', form).then(id => {
				this.$root.$refs.toast("Activity saved");
				this.$router.push({ name: "Activity", params: { id } });
				this.editmode = false;
			})
		},
		put(form) {
			this.rest('/activity/'+form.id, 'PUT', form).then(id => {
				this.$root.$refs.toast("Activity saved");
				this.load(this.$route.params.id);
				this.editmode = false;
			})
		},
		load(id) {
			this.activity = {};
			this.rest(`/activity/`).then(activities => {
				for (let dl in this.datalist) this.datalist[dl] = new Set([].concat(...activities.map(a => a[dl])))
			})
			if (!id) return;
			this.rest(`/activity/${id}`).then(res => this.activity = res)
		}
	}
};
