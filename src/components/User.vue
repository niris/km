<template>
<form v-on:submit.prevent=post method=POST @keydown.esc="editmode=false" action=/api/users>
  <h1 v-if=create>Create a new account</h1>
  <h1 v-if=update>My Account</h1>
  <h1 v-if=search>Account detail</h1>
  <!-- create:{{create}} update:{{update}} search:{{search}} edit:{{edit}} -->

  <div class="grid-m-a" v-if=user>
    <label>First Name</label>
    <input v-if=edit name=firstName autocomplete=given-name :value=user.firstName>
    <p v-else>{{user.firstName}}</p>
    
    <label>Last Name</label>
    <input v-if=edit name=lastName autocomplete=family-name :value=user.lastName>
    <p v-else>{{user.lastName}}</p>
    
    <label>Email</label>
    <input v-if=edit name=email autocomplete=email :value=user.email>
    <p v-else><a :href="'mailto:'+user.email">{{user.email}}</a></p>
    
    <label>Department</label>
    <input v-if=edit name=department autocomplete=organization :value=user.department>
    <p v-else>{{user.department}}</p>
    
    <label>Working Since</label>
    <input v-if=edit name=startwork type=date :max="new Date().toISOString().split('T')[0]" :value=user.startwork>
    <p v-else>{{user.startwork}}</p>
    
    <label>Function</label>
    <input v-if=edit name=function placeholder="ex. Professor" autocomplete=organization-title :value=user.function list=suggests />
    <p v-else>{{user.function}}</p>
    
    <label>Telephone</label>
    <input v-if=edit name=phone type=tel autocomplete="tel-national" :value=user.phone>
    <p v-else>{{user.phone}}</p>
    
    <label>Address</label>
    <input v-if=edit name=address autocomplete=street-address :value=user.address>
    <p v-else>{{user.address}}</p>
    
    <label>Description</label>
    <textarea v-if=edit name=description placeholder="ex. Nobody suspect that I'm a robot" :value=user.description rows=15 />
    <p v-else v-html="md(user.description)"/>
    
    <label>Publications</label>
    <TagList v-if=edit :list=user.publications placeholder="New Publication..." from="/api/user" name="publications[]"></TagList>
    <ul v-else><li v-for="u in user.publications" :key=u>{{u}}</li></ul>
    
    <label>Major Expertises</label>
    <TagList v-if=edit :list=user.domain class=tags placeholder="New Domain..." from="/api/user" name="domain[]"></TagList>
    <ul v-else class=tags><li v-for="u in user.domain" :key=u>{{u}}</li></ul>
    
    <label>Other Knowledge</label>
    <TagList v-if=edit :list=user.knowledge class=tags placeholder="New knowledge..." from="/api/user" name="knowledge[]"></TagList>
    <ul v-else class=tags><li v-for="u in user.knowledge" :key=u>{{u}}</li></ul>

    <label v-if=create>Login</label>
    <input name=_id autocomplete=username required :value=user._id :type="create?'text':'hidden'">
    
    <label v-if=edit>Password</label>
    <input v-if=edit name=password type=password placeholder="unchanged" :value="''" autocomplete="current-password">
  </div>
	<datalist id=suggests></datalist>
  <h1>User's Activities</h1>
  <ul v-if="user.activities && user.activities.length">
    <li v-for="a in user.activities" :key=a._id>
      <router-link :to="{name:'Activity', params:{id:a._id}}">{{a.name}}</router-link>
      <form v-on:submit.prevent=activityDelete method=DELETE :action="'/api/activity/'+a._id" style="display:inline">
        <button title="delete" style="padding: 0;width: 2em;">❌</button>
      </form>
    </li>
  </ul>
  <p v-else>This user does not have any activities</p>
  <div class=fab>
    <button v-if="create" title="Create">✓</button>
    <button v-if="update&&!edit" v-on:click.prevent="editmode=true" title="Edit">✎</button>
    <button v-if="update&&edit" v-on:click.prevent="editmode=false" title="Cancel">✕</button>
    <button v-if="update&&edit" title="Update">✓</button>
  </div>
	<Graph v-if="!edit" :id=this.id ></Graph>
</form>
</template>
<script>
import Graph from "@/components/Graph";
import TagList from "@/components/TagList";
export default {
  components: { Graph, TagList},
  props: ["id"],
  data: () => ({
    editmode: false,
    user: {}
  }),
  computed: {
    edit: function() {
      return this.create || this.editmode;
    },
    create: function() {
      return !this.id;
    },
    update: function() {
      return this.id && this.$root.token.startsWith(this.id);
    },
    search: function() {
      return this.id && !this.$root.token.startsWith(this.id);
    }
  },
  created() {
    this.load(this.id);
  },
  methods: {
    md(text) {
      return text ? marked(text, { sanitize: true }) : "";
    },
    autocomplete(event) {
      var name = event.target.name.match(/\w+/)[0];
      var value = event.target.value;
      this.sfetch('/api/user',{[name]:value})
      .then(r=>r.json()).then(users => {
        var val = [...new Set([].concat(...users.map(u => u[name])))].filter(m => m.match(value) && value != m);
        var el = document.getElementById('suggests');
        el.innerHTML=val?val.map(s=>'<option>'+s+'</option>'):'';
        console.log(val, el.innerHTML)
      }).catch(console.error)
    },
    load(id) {
      this.user = {domain:[],publications:[],knowledge:[]};
      if (!id) return;
      this.sfetch(`/api/user/${id}`)
        .then(res => res.json())
        .then(json => (this.user = json))
        .catch(err => this.$root.$refs.toast);
    },
    post($event) {
      if(document.activeElement instanceof HTMLInputElement){
        return $event.target[[].slice.call($event.target).findIndex(i=>i==document.activeElement)+1].focus()
      }
      this.sfetch($event.target)
        .then(req => req.json())
        .then(r => {
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
        })
        .catch(this.$root.$refs.toast);
    },
    activityDelete($event) {
      this.sfetch($event.target)
        .then(req => req.json())
        .then(r => {
          this.$root.$refs.toast("Activity Deleted");
          this.load(this.id);
        })
        .catch(this.$root.$refs.toast);
    },
    graph({ nodes, links }) {
      var width = window.innerWidth,
        height = window.innerHeight;
      var circleWidth = 10;
      //TODO auto resize when change windows size
      var svg = d3
        .select("#graph")
        .attr("width", width)
        .attr("height", height);
      // simulation setup with all forces
      console.log(nodes, links);
    }
  },
  watch: {
    id: function(id) {
      this.load(id);
    }
  }
};
</script>
<style scoped>

</style>
