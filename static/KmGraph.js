
import { transform, graph } from './graph.js';

export default {
	template: `
	<article>
	<div class=row v-if="!id && users">
		<select v-model="selected" class=col>
			<option v-for="o in options" :value=o.value>{{ o.text }}</option>
		</select>
		<button @click="$refs.graph.requestFullscreen()" class=col-1>⤡</button>
	</div>

	<svg class="card is-paddingless is-full-width" ref=graph></svg>
</article>
`,
	props: ["id"],
	data: () => ({
		users: null,
		selected: "B",
		options: [
			{ text: "บุคลากร/ความชำนาญ/หน่วยงาน", value: "A" },
			{ text: "บุคลากร/ความชำนาญ", value: "B" },
			{ text: "บุคลากร/หน่วยงาน", value: "C" },
			{ text: "ความชำนาญ/หน่วยงาน", value: "D" }
		]
	}),
	mounted() {
		this.load();
	},

	methods: {
		load(transopt) {
			const graphopt = {onclick: (node) => this.$emit('click', node)}
			this.rest("/user/")
				.then(users => this.users = users)
				.then(users => graph(this.$refs.graph, transform(users, transopt), graphopt));
		},
	},
	watch: {
		selected: function (value) {
			this.load(value);
		},
		id: function (id) {
			this.load(this.selected);
		}
	}
};
