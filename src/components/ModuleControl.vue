<template>
  <Control
    @input="handleInput"
    :inputTitle="`${moduleName}: ${title}`"
    :activeProp="activeProp"
    :title="title"
    :value="value"
  />
</template>

<script>
import Control from "./Control";

export default {
  components: {
    Control
  },

  props: {
    prop: {
      type: String,
      required: true
    },

    id: {
      type: String,
      required: true
    }
  },

  computed: {
    activeProp() {
      const { id, prop } = this;
      return this.$modV.store.state.modules.active[id].$props[prop];
    },

    type() {
      return this.activeProp.type;
    },

    moduleName() {
      const { id } = this;
      return this.$modV.store.state.modules.active[id].meta.name;
    },

    title() {
      return this.activeProp.label || this.prop;
    },

    value() {
      const { id, prop, type } = this;
      const propData = this.$modV.store.state.modules.active[id].props[prop];

      if (type === "tween") {
        return this.$modV.store.state.tweens.tweens[propData.id];
      }

      return propData;
    }
  },

  methods: {
    async handleInput(e) {
      const { prop, id: moduleId } = this;
      const data = e;

      try {
        await this.$modV.store.dispatch("modules/updateProp", {
          moduleId,
          prop,
          data
        });
      } catch (e) {
        console.error(e.message);
      }
    }
  }
};
</script>
