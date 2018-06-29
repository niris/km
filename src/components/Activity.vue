<template>
<form v-on:submit.prevent=post method=POST  action=/api/activity>
  <h1 v-if=create>Create a new Activity</h1>
  <h1 v-if=update>Update my Activity</h1>
  <h1 v-if=search>Activity detail</h1>

  <div class="grid-m-a" v-if=this.activity>
    <input v-if=id type=hidden name=_id :value=activity._id>

    <label v-if=!create>Owner</label>
    <p v-if=!create><router-link :to="{name:'User', params:{id:activity.u_id}}">{{activity.u_id}}</router-link></p>
    
    <label>Type</label>
    <select v-if=edit name=type :value=activity.type required>
      <option>Conference/Workshop/Seminar</option>
      <option>Visit</option>
      <option>Research</option>
      <option>Contest</option>
    </select>
    <p v-else>{{activity.type}}</p>

    <label>Name</label>
    <input v-if=edit name=name :value=activity.name required>
    <p v-else>{{activity.name}}</p>

    <label>Description</label>
    <textarea v-if=edit name=description :value=activity.description rows=15 />
    <div v-else v-html="md(activity.description||'')"/>

    <label>Conclusion</label>
    <textarea v-if=edit name=conclusion :value=activity.conclusion rows=15 />
    <div v-else v-html="md(activity.conclusion||'')"/>

    <label>Tags</label>
    <ul v-if=edit class=tags>
      <li v-for="t in activity.tags.concat([''])"><input name=tags[] :value=t placeholder="new tag..." @keyup=autocomplete list=suggests></li>
      <button @click.prevent="activity.tags.push('');" title="Add Tag">+</button>
      <button @click.prevent="activity.tags.pop()" v-if="activity.tags.length" title="Delete Tag">✕</button>
    </ul>
    <ul v-else class=tags>
      <li v-for="t in activity.tags">{{t}} </li>
    </ul>

    <label>Started</label>
    <input v-if=edit type=date name=from :value=activity.from :max="new Date().toJSON().split('T')[0]" required>
    <p v-else>{{activity.from}}</p>

    <label>Ended</label>
    <input v-if=edit type=date name=to :value=activity.to :min=activity.from :max="new Date().toJSON().split('T')[0]" required>
    <p v-else>{{activity.to}}</p>
  </div>
  <datalist id=suggests></datalist>
  <div class=fab>
    <button v-if=create>+</button>
    <button v-if="update&&edit" title="Update">✓</button>
    <button v-if="update&&edit" v-on:click.prevent="editmode=false" title="Cancel">✕</button>
    <button v-if="update&&!edit" v-on:click.prevent="editmode=true" title="Edit">✎</button>
  </div>
</form>
</template>

<script>
export default {
  props: ["id"],
  data: () => ({
    editmode: false,
    activity: {tags:[]},
  }),
  computed: {
    edit: function() {
      return !this.id || this.editmode;
    },
    create: function() {
      return !this.id;
    },
    update: function() {
      return (
        this.activity.u_id && this.$root.token.startsWith(this.activity.u_id)
      );
    },
    search: function() {
      return (
        this.activity.u_id && !this.$root.token.startsWith(this.activity.u_id)
      );
    }
  },
  created() {
    this.load(this.$route.params.id);
  },
  watch: {
    "$route.params.id": function(id) {
      this.load(id);
    }
  },
  methods: {
    md(text) {
      return marked(text, { sanitize: true });
    },
    autocomplete(event) {
      var name = event.target.name.match(/\w+/)[0];
      var value = event.target.value;
      this.sfetch('/api/activity',{[name]:value})
      .then(r=>r.json()).then(users => {
        var val = [...new Set([].concat(...users.map(u => u[name])))].filter(m => m.match(value) && value != m);
        var el = document.getElementById('suggests');
        el.innerHTML=val?val.map(s=>'<option>'+s+'</option>'):'';
      }).catch(console.error)
    },
    post($event) {
      this.sfetch($event.target).then(res=>res.json())
      .then(r => {
        this.$root.$refs.toast("Activity saved");
        if(r.insertedIds)this.$router.push({ name: "Activity", params: { id: r.insertedIds[0] } });
        else this.load(this.$route.params.id);
        this.editmode = false;
      })
      .catch(this.$root.$refs.toast)
    },
    load(id) {
      if (!id) return;
      this.sfetch(`/api/activity/${id}`)
        .then(res => res.json())
        .then(json => {
          if (!json) throw new Error("no such template");
          this.activity = json;
        })
        .catch(this.$root.$refs.toast);
    }
  }
};
</script>
<style scoped>

</style>
