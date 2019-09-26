export default {
	template: `
	<ul>
	<li v-for="(v,i) in items" :key=v.i class=row>
		<input @keyup="i==values.length-1 && values.push('')" v-bind=v v-model:value=values[i] :list="'dl_'+attr.name" :name="v.value?attr.name+'[]':null" class=col>
		<button @click.prevent=values.splice(i,1) v-if="values.length>1" tabindex=-1 class=col-1>&times;</button>
	</li>
	<datalist :id="'dl_'+attr.name">
		<option v-for="d in attr.datalist" :key=d>{{d}}</option>
	</datalist>
	</ul>
	`,
	props: ["attr"],
	data(){ return {values: (this.attr.value || []).concat('')};},
	computed: {
		items() {
			return this.values.map((value, i) => Object.assign({}, this.attr, { value, i }))
		}
	},
}
