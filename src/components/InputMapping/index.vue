<template>
  <div
    class="input-mapping"
    v-infoView="{ title: iVTitle, body: iVBody, id: 'Input Mapping Panel' }"
  >
    <table>
      <thead>
        <tr>
          <th>Control</th>
          <th>Value</th>
          <th>Range min.</th>
          <th>Range max.</th>
          <th>Destination</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="link in $modV.store.state.inputs.inputLinks"
          :key="link.id"
          @click="highlightControl(link.id)"
        >
          <td>{{ link.location }}{{ link.args }}</td>
          <td>
            {{
              $modV.store.state.modules.active[
                $modV.store.state.inputs.inputs[link.id].data.moduleId
              ].props[
                $modV.store.state.inputs.inputs[link.id].data.prop
              ].toFixed(2)
            }}
          </td>
          <td>
            <input
              type="number"
              :value="link.min"
              @input="updateLink($event, link.id, 'min')"
            />
          </td>
          <td>
            <input
              type="number"
              :value="link.max"
              @input="updateLink($event, link.id, 'max')"
            />
          </td>
          <td>
            {{
              $modV.store.state.modules.active[
                $modV.store.state.inputs.inputs[link.id].data.moduleId
              ].meta.name
            }}/{{ $modV.store.state.inputs.inputs[link.id].data.prop }}
          </td>
          <td>
            <button @click="removeLink(link.id)">Remove link</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iVTitle: "Input Mapping",
      iVBody: "some info"
    };
  },

  methods: {
    highlightControl(linkId) {
      this.$modV.store.dispatch("inputs/setFocusedInput", {
        id: linkId,
        title: `${this.moduleName}: ${this.title}`
      });
    },

    removeLink(linkId) {
      this.$modV.store.dispatch("inputs/removeInputLink", {
        inputId: linkId
      });
    },

    updateLink(event, linkId, prop) {
      this.$modV.store.commit("inputs/UPDATE_INPUT_LINK", {
        inputId: linkId,
        key: prop,
        value: parseFloat(event.target.value)
      });
    }
  }
};
</script>

<style></style>
