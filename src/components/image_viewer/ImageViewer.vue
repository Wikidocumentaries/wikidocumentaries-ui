<template>
    <transition name="modal">
	<div v-if="showModal" class="image-viewport">
		<div id="modal" class="main-content">
			<div class="mw stripe">
				<div class="yellow stroke"></div>
				<div class="orange stroke"></div>
				<div class="red stroke"></div>
				<div class="purple stroke"></div>
				<div class="turquoise stroke"></div>
				<div class="green stroke"></div>
			</div>
			<div class="contentarea">
				<img src="https://finna.fi/Cover/Show?id=hkm.HKMS000005%3A0000083f&index=0&size=master" class="viewer-image"/>
				<div class="viewer-contents">
					<div class="step-right"><i class="wikiglyph wikiglyph-caret-right step-glyph"></i></div>
					<div class="step-left"><i class="wikiglyph wikiglyph-caret-left step-glyph"></i></div>
					<div class="main-toolbar-over">
						<div class="absolute-right">
							<div class="right-align">
								<div class="toolbaricon"><i class="wikiglyph wikiglyph-cog"></i></div>
								<div class="toolbaricon"><i class="wikiglyph wikiglyph-ellipses"></i></div>
								<div class="toolbaricon"><i class="wikiglyph wikiglyph-cross"></i></div>
							</div>
						</div>
					</div>
					<div class="bottomshade">
						<div class="titlebox">
							<div class="titlebox-title">Kunnallispormestari ja VPK:n puheenjohtaja Elias Öhmanin (s. 28.7.1845, k. 15.3.1908) hautajaissaattue Kanavakadulla 19.3.1908</div>
							<div class="titlebox-subtitle">Tuntematon, 1908, <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.fi">CC BY 4.0</a>. Helsingin kaupunginmuseo / <a href="https://finna.fi/Record/hkm.HKMS000005:0000083f">Finna</a></div>
						</div>
					</div>
				</div>
			</div>
			<div class="metadata-area">
				<div class="metadata-original">
					<div class="boxtitle">Photograph</div>
					<div class="columns">
						<div class="grid-row">
							<div class="grid-icons">
								<i class="wikiglyph wikiglyph-stripe-summary metadata-glyph"></i>
							</div>
							<div class="grid-text unedited">
								<div class="grid-item">Title</div>
								<div class="grid-body">Elias Öhman's cortege in Kanavakatu, Helsinki 19 March 1908</div>
							</div>
						</div>
						<div class="grid-row">
							<div class="grid-icons">
								<i class="wikiglyph wikiglyph-stripe-toc metadata-glyph"></i>
							</div>
							<div class="grid-text edited">
								<div class="grid-item">Description</div>
								<div class="grid-body">Mayor and Volunteer Fire Brigade chairman <span class="ner">Elias Öhman</span>'s cortege in <span class="ner">Kanavakatu</span>, Helsinki 19 March 1908. The man in a fur coat walking on the tram tracks is <span class="ner">Akseli Gallen-Kallela</span>.</div>
							</div>
						</div>
						<div class="grid-row">
							<div class="grid-icons">
								<i class="wikiglyph wikiglyph-user-avatar metadata-glyph"></i>
							</div>
							<div class="grid-text">
								<div class="grid-item">Photographer</div>
								<div class="grid-body">
									<div class="data-select linked">Anonymous</div>
								</div>
							</div>
						</div>
						<div class="grid-row">
							<div class="grid-icons"><i class="wikiglyph wikiglyph-clock metadata-glyph"></i></div>
							<div class="grid-text">
								<div class="grid-item">Date</div>
								<div class="grid-body">
									<div class="data-select">19 March 1908</div>
								</div>
							</div>
						</div>
						<div class="grid-row">
							<div class="grid-icons">
								<i class="wikiglyph wikiglyph-image metadata-glyph"></i>
							</div>
							<div class="grid-text">
								<div class="grid-item">Technique</div>
								<div class="grid-body">
									<div class="data-select linked">photograph</div>
								</div>
							</div>
						</div>
						<div class="grid-row"><div class="grid-icons"><i class="wikiglyph wikiglyph-clip metadata-glyph"></i></div>
											<div class="grid-text"><div class="grid-item">Image depicts</div> <div class="data-select">death</div> <div class="data-select">funeral</div> <div class="data-select">grave</div> <div class="data-select">coffin</div> <div class="data-select">Volunteer Fire Brigade</div> <div class="data-select">sorrow</div> <div class="data-select linked">Add topic</div></div></div>
						<div class="grid-row"><div class="grid-icons"><i class="wikiglyph wikiglyph-map-pin metadata-glyph"></i></div>
											<div class="grid-text"><div class="grid-item">Location</div> <div class="data-select linked">Kanavakatu (Helsinki)</div></div></div>
						<div class="grid-row"><div class="grid-icons"><i class="wikiglyph wikiglyph-user-avatar metadata-glyph"></i></div>
											<div class="grid-text"><div class="grid-item">Depicted people</div> <div class="data-select linked">Akseli Gallen-Kallela</div> <div class="data-select linked">Add person</div></div></div>
						<div class="grid-row"><div class="grid-icons"><i class="wikiglyph wikiglyph-bell-on metadata-glyph"></i></div>
											<div class="grid-text"><div class="grid-item">Event</div> <div class="data-select linked">Elias Öhman's funeral</div></div></div>
						<div class="grid-row"><div class="grid-icons"><i class="wikiglyph wikiglyph-star-circle metadata-glyph"></i></div>
											<div class="grid-text"><div class="grid-item">Institution</div> <a href="#">Helsinki City Museum</a></div></div>
						<div class="grid-row"><div class="grid-icons"><i class="wikiglyph wikiglyph-list-numbered metadata-glyph"></i></div>
											<div class="grid-text"><div class="grid-item">ID</div> hkm.HKMS000005:0000083f</div></div>
						<div class="grid-row"><div class="grid-icons"><i class="wikiglyph wikiglyph-public-domain metadata-glyph"></i></div>
											<div class="grid-text"><div class="grid-item">Copyright</div> <a href="#">Public Domain</a></div></div>
						<div class="grid-row"><div class="grid-icons"><i class="wikiglyph wikiglyph-plus metadata-glyph"></i></div>
											<div class="grid-text"><div class="data-select linked">Add data</div></div></div>
											<div class="grid-row"><div class="metadata-map">Location on the map</div></div>
					</div>
				</div>
				<div class="metadata-copy alert">
					<div class="boxtitle">Photographic copy</div>
					<div class="columns">
							<div class="grid-row"><div class="grid-icons"></div>
												<div class="grid-text">The image is licensed with CC BY, but based on the metadata the image is in Public Domain.</div></div>
							<div class="grid-row"><div class="grid-icons"><i class="wikiglyph wikiglyph-plus metadata-glyph"></i></div>
							<div class="grid-text"><a href="#">Add information about the photographic copy</a></div></div>
					</div>
				</div>
				<div class="metadata-digital">
					<div class="boxtitle">Digital copy</div>
					<div class="columns">
							<div class="grid-row">
								<div class="grid-icons"><i class="wikiglyph wikiglyph-folder-placeholder metadata-glyph"></i></div>
								<div class="grid-text"><div class="grid-item">Publishing platform</div> <a href="#">Finna</a></div>
							</div>
							<div class="grid-row">
								<div class="grid-icons"><i class="wikiglyph wikiglyph-cite metadata-glyph"></i></div>
								<div class="grid-text"><div class="grid-item">Image info page</div> <a href="https://finna.fi/Record/hkm.HKMS000005:0000083f">https://finna.fi/Record/hkm.HKMS000005:0000083f</a></div>
							</div>
							<div class="grid-row">
								<div class="grid-icons"><i class="wikiglyph wikiglyph-image metadata-glyph"></i></div>
								<div class="grid-text"><div class="grid-item">Largest size</div> 3554 X 2487 pixels</div>
							</div>
							<div class="grid-row">
								<div class="grid-icons"><i class="wikiglyph wikiglyph-cog metadata-glyph"></i></div>
								<div class="grid-text"><div class="grid-item">File size</div> 2,1 MB</div>
							</div>
							<div class="grid-row">
								<div class="grid-icons"><i class="wikiglyph wikiglyph-cog metadata-glyph"></i></div>
								<div class="grid-text"><div class="grid-item">Format</div> jpg</div>
							</div>
						</div>
					</div>
				</div>
        <button @click="hide">Close</button>
			</div>
		</div>
    </transition>
</template>

<script>
export default {
    name: 'ImageViewer',
    data() {
      return {
        showModal: false
      }
    },
    props: {
        shouldShowDialog: Boolean
    },
    computed: {
    },
    methods: {
        handleCancel: function () {
            this.$emit('close');
        },
        show() {
          this.showModal = true
        },
        hide() {
          this.showModal = false
        }
    }
}
</script>

<style scoped>

.image-viewport {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  transition: opacity .3s ease;
}

.main-content {
  background-color: white;
  margin-left: 5%;
  margin-right: 5%;
  padding: 5%;
}

.viewer-image {
  max-width: 100%;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
