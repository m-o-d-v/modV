<template>
  <div
    class="groups"
    v-infoView="{ title: iVTitle, body: iVBody, id: 'Groups Panel' }"
    v-searchTerms="{
      terms: ['groups', 'layers'],
      title: 'Groups',
      type: 'Panel'
    }"
  >
    <DropList
      :items="groups"
      @reorder="$event.apply(groups)"
      :no-animations="true"
      :column="true"
    >
      <template v-slot:item="{ item }" class="group-module-container">
        <drag class="item" :key="item">
          <Group :groupId="item.id" />
        </drag>
      </template>
    </DropList>

    <Button class="light" @click="createGroup">New Group</Button>
  </div>
</template>

<script>
import { Drag, DropList } from "vue-easy-dnd";
import Group from "./Group";

// const applyDrag = (arr, dragResult) => {
//   const { removedIndex, addedIndex, payload } = dragResult;
//   if (removedIndex === null && addedIndex === null) {
//     return arr;
//   }

//   const result = [...arr];
//   let itemToAdd = payload;

//   if (removedIndex !== null) {
//     itemToAdd = result.splice(removedIndex, 1)[0];
//   }

//   if (addedIndex !== null) {
//     result.splice(addedIndex, 0, itemToAdd);
//   }

//   return result;
// };

export default {
  components: {
    Drag,
    DropList,
    Group
  },

  data() {
    return {
      iVTitle: "Groups",
      iVBody:
        "Groups contain Modules. Modules within Groups can be rearranged to change the drawing order. Groups can also be rearranged by dragging their title bar.",
      module: "",
      group: ""
    };
  },

  computed: {
    groups: {
      get() {
        return this.$modV.store.state.groups.groups.filter(
          group => !group.hidden
        );
      },

      async set(value) {
        await this.$modV.store.dispatch("groups/orderByIds", {
          ids: value.map(group => group.id)
        });
      }
    },

    registeredModules() {
      return this.$modV.store.state.modules.registered;
    }
  },

  methods: {
    async createGroup() {
      this.$modV.store.dispatch("groups/createGroup");
    }

    // onDrop(e) {
    //   this.groups = applyDrag(this.groups, e);
    // }
  }
};
</script>

<style scoped>
div.groups {
  height: 100%;
  width: 100%;
}

div.group-container {
  overflow-y: auto;
  flex: 1;
}
</style>
