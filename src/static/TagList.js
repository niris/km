const template = `
<ul>
<li v-for="elem in values" :key=elem.id style="position:relative">
	<input @keyup=inflate @focusout=deflate v-model=elem.title :placeholder=placeholder :list=datalistId :name=name >
	<a v-if="values&&values.length" @click=remove(elem) style="position:absolute;right:.2em;top:0;">&times;</a>
</li>
<datalist :id=datalistId>
	<option v-for="d in datalist" :key=d>{{d}}</option>
</datalist>
</ul>
`

export default {
	template,
	props: ["list", "placeholder", "name", "from"],
	data: () => ({
		nextId:0,
		nextTitle:'',
		values:["data"],
		datalist:[],
	}),
	computed: {
		datalistId () {
			return `datalist-${this.name}`
		}
	},
	methods: {
		remove(elem){
			elem.title='';
			this.deflate();
		},
		deflate() {
			let l = this.values;
			let inputs = this.$el.querySelectorAll('input');
			let empty = l.findIndex((e,i) => e.title=='');
			if(empty >= 0 && empty!=l.length-1)
				l.splice(empty, 1)
		},
		inflate(event) {
			let l = this.values;
			if(!l.length || l[l.length-1].title)
				l.push({title:this.nextTitle, id:this.nextId++});
			this.autocomplete(event);
		},
		autocomplete(event) {
			if(!this.name||!this.from||!event)return;
			var name = this.name.match(/\w+/)[0];
			var value = event.target.value;
			this.rest(this.from, 'GET',{[name]:value}).then(res => {
				this.datalist = [...new Set([].concat(...res.map(u => u[name])))].filter(m => m.match(value));
			})
		},
		value() {
			return this.values.map(e=>e.title).filter(e=>e!=='');
		}
	},
	created() {
		this.values = (this._props.list||[]).map(title=>({title, id:this.nextId++}));
		this.inflate();
  },
};