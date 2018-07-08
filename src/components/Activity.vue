<template>
<form v-on:submit.prevent=post method=POST @keydown.esc="editmode=false" action=/api/activity>
  <h1 v-if=create>Create a new Activity</h1>
  <h1 v-if=update>My Activity</h1>
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
    <TagList v-if=edit :list=activity.tags class=tags placeholder="New Tag..." from="/api/activity" name="tags[]"></TagList>
    <ul v-else class=tags>
      <li v-for="t in activity.tags" :key=t>{{t}} </li>
    </ul>

    <label>Started</label>
    <input v-if=edit type=date name=from ref=start :value=activity.from required>
    <p v-else>{{activity.from}}</p>

    <label>Ended</label>
    <input v-if=edit type=date name=to :value=activity.to required>
    <p v-else>{{activity.to}}</p>
  </div>
  <datalist id=suggests></datalist>
  <div class=fab>
    <button v-if="!edit" v-on:click.prevent="print" title="Print 🖶">📄</button>
    <button v-if=create>✓</button>
    <button v-if="update&&edit" title="Update">✓</button>
    <button v-if="update&&edit" v-on:click.prevent="editmode=false" title="Cancel">✕</button>
    <button v-if="update&&!edit" v-on:click.prevent="editmode=true" title="Edit">✎</button>
  </div>
</form>
</template>

<script>
import TagList from "@/components/TagList";
export default {
  components: {TagList},
  props: ["id"],
  data: () => ({
    editmode: false,
    activity: {},
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
    print() {
      //Call the browser print dialog for PDF export
      //window.print()

      //Generate the raw PDF using JS
      var doc = new jsPDF();
      doc.fromHTML(this.$el);
      doc.save(`${this.id}.pdf`);
    },
    md(text) {
      return marked(text, { sanitize: true });
    },
    post($event) {
      if(document.activeElement instanceof HTMLInputElement){
        return $event.target[[].slice.call($event.target).findIndex(i=>i==document.activeElement)+1].focus()
      }

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
