<template>
<div>
<form v-on:submit.prevent=post method=POST action=/api/users>
  <h1 v-if=create>Create a new account</h1>
  <h1 v-if=update>My Account</h1>
  <h1 v-if=search>Account detail</h1>
  <!-- create:{{create}} update:{{update}} search:{{search}} edit:{{edit}} -->
  <div class="grid-m-a">
    <label>First Name</label>
    <input v-if=edit name=firstName autocomplete=given-name :value=user.firstName>
    <p v-else>{{user.firstName}}</p>
    
    <label>Last Name</label>
    <input v-if=edit name=lastName autocomplete=family-name :value=user.lastName>
    <p v-else>{{user.lastName}}</p>
    
    <label>Email</label>
    <input v-if=edit name=email autocomplete=email :value=user.email>
    <p v-else>{{user.email}}</p>
    
    <label>Department</label>
    <input v-if=edit name=department autocomplete=organization :value=user.department>
    <p v-else>{{user.department}}</p>
    
    <label>Working Since</label>
    <input v-if=edit name=startwork type=date :max="new Date().toISOString().split('T')[0]" :value=user.startwork>
    <p v-else>{{user.startwork}}</p>
    
    <label>Function</label>
    <input v-if=edit name=function placeholder="ex. Professor" autocomplete=organization-title :value=user.function>
    <p v-else>{{user.function}}</p>
    
    <label>Telephone</label>
    <input v-if=edit name=phone type=tel autocomplete=tel :value=user.phone>
    <p v-else>{{user.phone}}</p>
    
    <label>Address</label>
    <input v-if=edit name=address autocomplete=street-address :value=user.address>
    <p v-else>{{user.address}}</p>
    
    <label>Major Expertises<em v-if=edit> (one by line)</em></label>
    <textarea v-if=edit name=domain placeholder="ex. Real Time Embed Quantic Operating Systems" :value="(user.domain||[]).join('\n')" @keydown=adapt rows=10></textarea>
    <ul v-else><li v-for="u in user.domain" :key=u>{{u}}</li></ul>
    
    <label>Other Knowledge<em v-if=edit> (one by line)</em></label>
    <textarea v-if=edit name=knowledge placeholder="ex. Baseball Player" :value="(user.knowledge||[]).join('\n')" @keydown=adapt rows=10></textarea>
    <ul v-else><li v-for="u in user.knowledge" :key=u>{{u}}</li></ul>
    
    <label>Publications<em v-if=edit> (one by line)</em></label>
    <textarea v-if=edit name=publications placeholder="ex. Mezghani, Manel and On-At, Sirinya My Title, vol. 21 (n° 4). pp. 67-81. ISSN 1633-1311" :value="(user.publications||[]).join('\n')" @keydown=adapt rows=10></textarea>
    <ul v-else><li v-for="u in user.publications" :key=u>{{u}}</li></ul>
    
    <label>Description</label>
    <textarea v-if=edit name=description placeholder="ex. Nobody suspect that I'm a robot" :value=user.description @keydown=adapt rows=15 />
    <p v-else v-html="md(user.description)"/>
    
    <br><hr>
    
    <label v-if=create>Login</label>
    <input name=_id autocomplete=username required :value=user._id :type="create?'text':'hidden'">
    
    <label v-if=edit>Password</label>
    <input v-if=edit name=password type=password placeholder="unchanged" :value="''" autocomplete="current-password">
  </div>
  <template v-if=!create>
    <h4>Activities</h4>
    <ul v-if=user.activities.length>
      <li v-for="a in user.activities" :key=a._id>
        <router-link :to="{name:'Activity', params:{id:a._id}}">{{a.name}}</router-link>
        <form v-on:submit.prevent=activityDelete method=DELETE :action="'/api/activity/'+a._id" style="display:inline">
          <button title="delete" style="padding: 0;width: 2em;">❌</button>
        </form>
      </li>
    </ul>
    <p v-else>This user does not have any activities</p>
  </template>
  <div class=fab>
    <button v-if="create" title="Create">+</button>
    <button v-if="update&&edit" title="Update">✓</button>
    <button v-if="update&&edit" v-on:click.prevent="editmode=false" title="Cancel">✕</button>
    <button v-if="update&&!edit" v-on:click.prevent="editmode=true" title="Edit">✎</button>
  </div>
</form>
<Graph v-if="!create" :id=this.id ></Graph>
</div>
</template>
<script>
import Graph from "@/components/Graph";
export default {
  components: { Graph },
  props: ["id"],
  data: () => ({
    editmode: false,
    user: {}
  }),
  computed: {
    edit: function() {
      return !this.id || this.editmode;
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
    adapt(event) {
      var el = event.target;
      setTimeout(function() {
        el.style.cssText = "height:auto; padding:0";
        el.style.cssText = "height:" + (+el.scrollHeight + 20) + "px";
      }, 0);
    },
    md(text) {
      return text ? marked(text, { sanitize: true }) : "";
    },
    load(id) {
      this.user = {};
      if (!id) return;
      this.sfetch(`/api/user/${id}`)
        .then(res => res.json())
        .then(json => (this.user = json))
        .catch(err => this.$root.$refs.toast);
    },
    post($event) {
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
    post($event) {
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
            this.editmode = false;
          }
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
