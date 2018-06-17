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
    <input v-if=edit name=type :value=activity.type>
    <p v-else>{{activity.type}}</p>

    <label>Name</label>
    <input v-if=edit name=name :value=activity.name>
    <p v-else>{{activity.name}}</p>

    <label>Description</label>
    <textarea v-if=edit name=description :value=activity.description rows=15 />
    <div v-else v-html="md(activity.description)"/>

    <label>Conclusion</label>
    <textarea v-if=edit name=conclusion :value=activity.conclusion rows=15 />
    <div v-else v-html="md(activity.description)"/>

    <label>Tags</label>
    <input v-if=edit name=tags :value=activity.tags>
    <p v-else>{{activity.tags}}</p>

    <label>Started</label>
    <input v-if=edit type=date name=from :value=activity.from :max="new Date().toJSON().split('T')[0]">
    <p v-else>{{activity.from}}</p>

    <label>Ended</label>
    <input v-if=edit type=date name=to :value=activity.to :min=activity.from :max="new Date().toJSON().split('T')[0]">
    <p v-else>{{activity.to}}</p>

    <br><hr>
  </div>
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
    activity: {}
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
    post($event) {
      this.sfetch($event.target).then(res=>res.json())
      .then(r => {
        this.$root.$refs.toast("Activity created. Let's go!");
        this.$router.push({ name: "Activity", params: { id: r.insertedIds[0] } });
      })
      .catch(this.$root.$refs.toast)
    },
    adapt(event) {
      var el = event.target;
      setTimeout(function() {
        el.style.cssText = "height:auto; padding:0";
        el.style.cssText = "height:" + (+el.scrollHeight + 20) + "px";
      }, 0);
    },
    load(id) {
      this.activity = {};
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
