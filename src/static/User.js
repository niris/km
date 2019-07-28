const template=`
<form class=user v-on:submit.prevent=post @keydown.esc="editmode=false">
  <template v-if=!summary>
    <h1 v-if=create>&#8853; สมัครสมาชิก</h1>
    <h1 v-if=update>My Account</h1>
    <h1 v-if=search>ข้อมูลสมาชิก </h1>
  </template>

  <div class=avatar v-if=user>
    <input name=avatar type=hidden :value="avatar||user.avatar||''">
    <img :src="avatar||user.avatar||'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='" :style="'background-image:url(data:image/gif;base64,R0lGODlhDgAOAIAAAICAgP///yH5BAEAAAEALAAAAAAOAA4AAAI'+(editmode?'XjI+py30AnIEyUAZzVlq364BfVJUmUwAAOw==':'bjI+JwKDX2otRUZkus3rSZ1TelWlbaGKpujoFADs=')+')'">
    <input type=file @change=thumb v-if=edit>
    <details v-if=edit hidden>
      <summary>Image Position</summary>
      <div class="grid-m-a imgedit">
      <label>Horizontal</label><input type=range @change=thumb id=leftcrop min=0 max=.5 step=.01 value=0 style="direction:rtl" />
      <label>Vertical</label><input type=range @change=thumb id=topcrop min=0 max=.5 step=.01 value=0 style="direction:rtl" />
      <label>Width</label><input type=range @change=thumb id=rightcrop min=.5 max=1 step=.01 value=1 style="direction:rtl" />
      <label>Height</label><input type=range @change=thumb id=bottomcrop min=.5 max=1 step=.01 value=1 style="direction:rtl" />
      </div>
    </details>
  </div>

  <div class="grid-m-a" v-if=user>
    <label>ชื่อ</label>
    <input v-if=edit name=firstName autocomplete=given-name v-model=user.firstName>
    <p v-else>{{user.firstName}}</p>
    
    <label>นามสกุล</label>
    <input v-if=edit name=lastName autocomplete=family-name v-model=user.lastName>
    <p v-else>{{user.lastName}}</p>
    
    <label>หน่วยงาน</label>
    <input v-if=edit name=department autocomplete=organization v-model=user.department>
    <p v-else>{{user.department}}</p>
  
    <!--
          <label>หน่วยงาน</label>

    <select v-if=edit name=department class=selection v-model="user.department">
  		<option v-for="option in options" v-bind:value="option.value">
   		 {{ option.text }}
  	</option>
    </select>
    <p v-else>{{user.department}}</p>
  -->

    <label>ตำแหน่ง</label>
    <input v-if=edit name=function placeholder="ex. Professor" autocomplete=organization-title v-model=user.function list=suggests />
    <p v-else>{{user.function}}</p>
    <template v-if="!summary">
    <label>วันที่เริ่มทำงาน</label>
    <input v-if=edit name=startwork type=date :max="new Date().toISOString().split('T')[0]" v-model=user.startwork>
    <p v-else>{{user.startwork}}</p>
    
    <label>Email</label>
    <input v-if=edit name=email autocomplete=email v-model=user.email>
    <p v-else><a :href="'mailto:'+user.email">{{user.email}}</a></p>
    
    <label>เบอร์โทรศัพท์</label>
    <input v-if=edit name=phone type=tel autocomplete="tel-national" v-model=user.phone>
    <p v-else>{{user.phone}}</p>
    
    <label>ที่อยู่</label>
    <input v-if=edit name=address autocomplete=street-address v-model=user.address>
    <p v-else>{{user.address}}</p>
    
    <label>ผลงานวิชาการ</label>
    <TagList v-if=edit :list=user.publications placeholder="New Publication..." from="/user" name="publications[]"></TagList>
    <ul v-else><li v-for="u in user.publications" :key=u>{{u}}</li></ul>
    </template>
    
    <label>ความชำนาญหลัก</label>
    <TagList v-if=edit :list=user.domain class=tags placeholder="New Domain..." from="/user" name="domain[]"></TagList>
    <ul v-else class=tags><li v-for="u in user.domain" :key=u>{{u}}</li></ul>
    
    <label>ความชำนาญรอง</label>
    <TagList v-if=edit :list=user.knowledge class=tags placeholder="New knowledge..." from="/user" name="knowledge[]"></TagList>
    <ul v-else class=tags><li v-for="u in user.knowledge" :key=u>{{u}}</li></ul>
    <label>ความรู้ที่อยากฝึกฝนเพิ่มเติม</label>
    <TagList v-if=edit :list=user.additional class=tags placeholder="New additional knowledge..." from="/user" name="addtional[]"></TagList>
    <ul v-else class=tags><li v-for="u in user.additional" :key=u>{{u}}</li></ul>

    <label>คำอธิบายเพิ่มเติม</label>
    <textarea v-if=edit name=description placeholder="ex. Nobody suspect that I'm a robot" v-model=user.description rows=15 />
    <p v-else v-html="md(user.description)"/>
  
    <label v-if=create>Login</label>
    <input name=_id autocomplete=username required :value=user._id :type="create?'text':'hidden'">
    
    <label v-if=edit>Password</label>
    <input v-if=edit name=password type=password placeholder="unchanged" :value="''" autocomplete="current-password">
  </div>
	<datalist id=suggests></datalist>
  <template v-if="!create && !summary">
    <h2><img src="https://icongr.am/material/calendar.svg"> รายการกิจกรรม</h2>
    <ul v-if="user.activities && user.activities.length">
      <li v-for="a in user.activities" :key=a._id>
        <router-link :to="{name:'Activity', params:{id:a._id}}">{{a.name}}</router-link>
        <form v-on:submit.prevent="activityDelete(a._id)" style="display:inline">
          <button title="delete" style="padding: 0;width: 2em;">❌</button>
        </form>
      </li>
    </ul>
    <p v-else>ไม่พบกิจกรรม</p>
  </template>
  <div class=fab v-if="!summary">
    <button v-if="create" title="Create">✓</button>
    <button v-if="update&&!edit" v-on:click.prevent="editmode=true" title="Edit">✎</button>
    <button v-if="update&&edit" v-on:click.prevent="editmode=avatar=false" title="Cancel">✕</button>
    <button v-if="update&&edit" title="Update">✓</button>
  </div>
  <template v-if="!edit&&!summary">
	<Graph :id=this.id></Graph>
	</template>
</form>
`

import Graph from "./Graph.js";
import TagList from "./TagList.js";

export default {
  template,
  components: { Graph, TagList },
  props: ["id", "summary"],
  
  data: () => ({
    editmode: false,
    img: null,
    avatar: null,
    user: {},
    /*options: [
      { text: "คณะเทคโนโลยีสารสนเทศ", value: "any" },
      { text: "คณะ", value: "user" },
      { text: "กิจกรรม", value: "activity" }
    ]*/
  }),
  
  computed: {
    edit: function() {
      return this.create || this.editmode;
    },
    create: function() {
      return !this.id;
    },
    update: function() {
      return this.id && this.$auth.get.name.startsWith(this.id);
    },
    search: function() {
      return this.id && !this.$auth.get.name.startsWith(this.id);
    }
  },
  
  created() {
    this.load(this.id);
    this.img = document.createElement("img");
    this.img.onload = () => {
      this.$el.querySelector("details").hidden = false;
      let canvas = document.createElement("canvas");
      canvas.width = canvas.height = 420;
      canvas
        .getContext("2d")
        .drawImage(
          this.img,
          this.img.width * leftcrop.value,
          this.img.height * topcrop.value,
          this.img.width * rightcrop.value,
          this.img.height * bottomcrop.value,
          0,
          0,
          canvas.width,
          canvas.height
        );
      this.avatar = canvas.toDataURL("image/jpeg", 0.2);
    };
  },
  
  methods: {
    thumb($event) {
      let input = this.$el.querySelector(".avatar [type=file]");
      if (input.files.length)
        this.img.src = window.URL.createObjectURL(input.files[0]);
      else if (this.img.src) this.img.onload();
    },
    md(text) {
      return text ? marked(text, { sanitize: true }) : "";
    },
    autocomplete($event) {
      var name = $event.target.name.match(/\w+/)[0];
      var value = $event.target.value;
      this.rest("/user", 'GET', {[name]: value}).then(users => {
        var val = [...new Set([].concat(...users.map(u => u[name])))].filter(
          m => m.match(value) && value != m
        );
        var el = document.getElementById("suggests");
        el.innerHTML = val ? val.map(s => "<option>" + s + "</option>") : "";
      })
    },
    load(id) {
      this.user = { domain: [], publications: [], knowledge: [] };
      if (!id) return;
      this.rest(`/user/${id}`).then(json => (this.user = json))
      scrollTo(0,0);
    },
    post($event) {
      if (document.activeElement instanceof HTMLInputElement) {
        return $event.target[
          [].slice
            .call($event.target)
            .findIndex(i => i == document.activeElement) + 1
        ].focus();
      }
      this.rest('/users', "POST",$event.target.json()).then(r => {
        if (this.create) {
          this.$root.$refs.toast(
            `Profil Created ! You are now connected as ${r._id}`
          );
          this.$router.push({ name: "User", params: { id: r._id } });
        } else {
          this.$root.$refs.toast("Profil Updated");
          this.load(this.id);
          this.editmode = false;
        }
      });
    },
    activityDelete(id) {
      this.rest(`/activity/${id}`, 'DELETE').then(r => {
        this.$root.$refs.toast("Activity Deleted");
        this.load(this.id);
      });
    }
  },
  watch: {
    id: function(id) {
      this.load(id);
    }
  }
};
