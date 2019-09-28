import KmFieldList from "./KmFieldList.js";
export default {
	components: { KmFieldList },
	props: ["attr", "edit", "list", 'id', 'listclass'],
	template: `
	<div v-if=list>
		<KmFieldList v-if=edit :attr=attr></KmFieldList>
		<ul v-else><li v-for="u in attr.value" :class=listclass :key=u>{{u}}</li></ul>
	</div>
	<div v-else>
		<component v-if=edit :id=id :list="'dl_'+attr.name" :is="attr.rows?'textarea':'input'" v-bind=attr>{{attr.rows?attr.value:''}}</component>
		<div v-else v-html="md(attr.value||'')"></div>
		<datalist :id="'dl_'+attr.name">
			<option v-for="d in attr.datalist">{{d}}</option>
		</datalist>
	</div>
`,
	methods: {
		md(text) {
			return marked(text.replace(/</g, '&lt;').replace(/"/g,'&quote;') || "");
		},
	}
}