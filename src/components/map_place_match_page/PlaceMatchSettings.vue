<template>
    <div class="map-place-match-settings">
      <div class="toolbar">
            <div class="header-title">{{ header.title }}</div>
            <ToolbarMenu icon="wikiglyph-rocket" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">Toiminnot</div>
            </ToolbarMenu>
        </div>
    </div>
</template>

<script>
import ToolbarMenu from '@/components/menu/ToolbarMenu'

const MENU_ACTIONS = {
    NONE: 1
}


export default {
  name: 'PlaceMatchSettings',
  props: {
  },
  computed: {
    wikidocumentaries () {
          return this.$store.state.wikidocumentaries;
      },
  },
  data () {
    return {
      header: {
                title: 'Yhdistä paikannimien tietoja'
      },
      toolbarActionMenuItems: [
        {
            id: MENU_ACTIONS.NONE,
            text: "...",
        },
      ],
    }
  },
  components: {
      ToolbarMenu
  },
   methods: {
      onDoMenuItemAction (menuItem) {
          switch (menuItem.id) {
          }
      },
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
