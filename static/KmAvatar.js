const img = document.createElement("img")
const canvas = document.createElement("canvas");
export default {
	props: {
		edit:Boolean,
		value:{default: ''},
		name:{default: "avatar"},
		size:{default: 420},
		zoom:{default: 0.5},
		compress:{default: 20}
	},
	template:`<div>
		<input :name=name type=hidden :value="newval||value">
		<input :id=name type=file @change=load($event.target.files) v-if=edit class=is-hidden>
		
		<label :for=name>
			<img :class="{'is-pointer':edit}" class="card is-paddingless is-block-auto is-round" :width=size*zoom :height=size*zoom
					 :src="newval||value||'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='"
					 :style="'background-size:contain;background-image:url(data:image/gif;base64,R0lGODlhDgAOAIAAAICAgP///yH5BAEAAAEALAAAAAAOAA4AAAI'+(edit?'XjI+py30AnIEyUAZzVlq364BfVJUmUwAAOw==':'bjI+JwKDX2otRUZkus3rSZ1TelWlbaGKpujoFADs=')+')'">
		</label>
		<details v-if=edit>
			<summary class=is-center>Image Position</summary>
			<div class=grid-a-1>
				<label>Horizontal</label><input type=range @input=paint @change=paint v-model=shiftw min=-1 max=1 step=.01 />
				<label>Vertical</label>  <input type=range @input=paint @change=paint v-model=shifth min=-1 max=1 step=.01 />
				<label>Zooming</label>   <input type=range @input=paint @change=paint v-model=zoomin min=.1 max=5 step=.01 />
			</div>
		</details>
	</div>`,
	data: () => ({
		newval: null,
		shiftw: 0,
		shifth: 0,
		zoomin: 1
	}),
	watch:{
		edit(enabled) {
			Object.assign(this.$data, this.$options.data())
			img.src=enabled?this.value:this.newval
		}
	},
	methods: {
		load(files) {
			if(!files.length)return;
			Object.assign(this.$data, this.$options.data())
			img.onload = this.paint
			img.src = window.URL.createObjectURL(files[0]);
		},
		paint() {
			canvas.width = canvas.height = this.size;
			canvas.getContext("2d").drawImage(img, ...[
				canvas.width * this.shiftw,
				canvas.height * this.shifth,
				canvas.width * Math.max(img.width/img.height,1),
				canvas.height * Math.max(img.height/img.width,1)
			].map(c => c*this.zoomin));
			this.newval = canvas.toDataURL("image/jpeg", this.compress/100);
		},
	}
}