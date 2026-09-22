<template>
  <div class="images-action-menu">
    <IconMenu
      icon="wikiglyph-ellipses"
      :items="this.iconActionMenuItems"
      @doMenuItemAction="onDoMenuItemAction"
    >
      <div slot="menu-title">{{ $t('topic_page.TopicImages.imagesActionMenu.menuTitle') }}</div>
    </IconMenu>
    <PopUp ref="popup"></PopUp>
    <ImageViewer ref="imageviewer"></ImageViewer>
  </div>
</template>

<script>
import IconMenu from "@/components/menu/IconMenu";
import ImageViewer from "@/components/image_viewer/ImageViewer";
import PopUp from "@/components/upload/Popup";

const MENU_ACTIONS = {
  // GEOLOCATE: 0,
  // SELECT_HEADER: 0,
  // SHOW_IMAGE: 0,
  SHOW_IMAGE:0,
  UPLOAD:1,
};

export default {
  name: "ImagesActionMenu",
  props: {
    element: {}
  },
  data() {
    return {
      iconActionMenuItems: [
        // {
        //   id: MENU_ACTIONS.SHOW_IMAGE,
        //   text: "topic_page.TopicImages.imagesActionMenu.showImageText"
        // },
        {
          id: MENU_ACTIONS.UPLOAD,
          text: "topic_page.TopicImages.imagesActionMenu.upload"
        },
        // {
        //     id: MENU_ACTIONS.SELECT_HEADER,
        //     text: 'topic_page.TopicImages.imagesActionMenu.selectFeatured'
        // },
        // {
        //     id: MENU_ACTIONS.GEOLOCATE,
        //     text: 'topic_page.TopicImages.imagesActionMenu.doGeolocatingText'
        // },
      ],
      clickPopUp: false,
    };
  },
  components: {
    IconMenu,
    ImageViewer,
    PopUp,
  },
  methods: {
    onDoMenuItemAction(iconActionMenuItems) {
      switch (iconActionMenuItems.id) {
        case MENU_ACTIONS.SHOW_IMAGE:
          this.$refs.imageviewer.show(this.$props.element, 0);
          break;
        case MENU_ACTIONS.UPLOAD:
          this.showPopUp(this.$props.element);
          break;
      }
    },
    showPopUp(element) {
      this.$refs.popup.show(element);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
