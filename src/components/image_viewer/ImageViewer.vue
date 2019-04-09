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
          <div class="image-area">
            <img
              :src="element.imageURL"
              ref="viewer-image"
              v-on:load="onimageload"
              class="viewer-image"
            >
            <div class="viewer-contents">
              <div class="step-right">
                <i class="wikiglyph wikiglyph-caret-right step-glyph"></i>
              </div>
              <div class="step-left">
                <i class="wikiglyph wikiglyph-caret-left step-glyph"></i>
              </div>
              <div class="main-toolbar-over">
                <div class="absolute-right">
                  <div class="right-align">
                    <div class="toolbar-item">
                      <i class="wikiglyph wikiglyph-cog"></i>
                    </div>
                    <div class="toolbar-item">
                      <i class="wikiglyph wikiglyph-ellipses"></i>
                    </div>
                    <HeaderLink
                      v-if="element.infoURL != undefined"
                      class="toolbar-item"
                      :tooltip="$t('topic_page.TopicImages.imagesViewExternal')"
                      :link="element.infoURL"
                    ></HeaderLink>
                    <UILanguageMenu class="language-menu"></UILanguageMenu>
                    <div class="toolbar-item" @click="hide">
                      <i class="wikiglyph wikiglyph-cross"></i>
                      <span class="tooltip">{{ tooltip }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bottomshade">
                <div class="titlebox white">
                  <div class="titlebox-title">{{ element.title }}</div>
                  <div class="titlebox-subtitle white">{{ getCredits(element) }}</div>
                </div>
              </div>
            </div>
          </div>
          <!--div class="tool-area"></div-->
        </div>
        <div class="metadata-area">
          <div class="metadata-original">
            <div class="toolbar">
              <div class="header-title">{{ $t('imageViewer.imageMetadata.work') }}</div>
            </div>
            <div class="columns">
              <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-stripe-summary metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.caption') }}</div>
                  <div class="grid-body unedited">{{ element.title }}</div>
                </div>
              </div>
              <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-stripe-toc metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.description') }}</div>
                  <div
                    v-if="element.summary && element.summary.length>0"
                    class="grid-body unedited"
                  >{{ element.summary[0] }}</div>
                  <div
                    v-else
                    class="grid-body action"
                  >{{ $t('imageViewer.imageMetadata.addDescription') }}</div>
                </div>
              </div>
              <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-user-avatar metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.creator') }}</div>
                  <div v-if="element.authors" class="data-select">{{ element.authors }}</div>
                  <div class="data-select action">{{ $t('imageViewer.imageMetadata.addCreator') }}</div>
                </div>
              </div>
              <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-clock metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.dateCreated') }}</div>
                  <div v-if="element.year" class="data-select linked">{{ element.year }}</div>
                  <div
                    v-else
                    class="data-select action"
                  >{{ $t('imageViewer.imageMetadata.addDateCreated') }}</div>
                  <div
                    class="data-select action"
                  >{{ $t('imageViewer.imageMetadata.addDateDepicted') }}</div>
                </div>
              </div>
              <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-image metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.format') }}</div>
                  <div v-if="element.formats" class="data-select">{{ element.formats }}</div>
                  <div class="data-select action">{{ $t('imageViewer.imageMetadata.addFormat') }}</div>
                </div>
              </div>
              <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-image metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.genre') }}</div>
                  <div class="data-select unlinked">portrait</div>
                  <div class="data-select action">{{ $t('imageViewer.imageMetadata.addGenre') }}</div>
                </div>
              </div>
              <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-clip metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.depicts') }}</div>
                  <div v-for="subject in element.subjects" class="data-select" :key="subject.id">{{ subject[0] }}</div>
                  <div class="data-select action">{{ $t('imageViewer.imageMetadata.addTopic') }}</div>
                </div>
              </div>
              <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-map-pin metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.location') }}</div>
                  <div v-for="place in element.places" class="data-select" :key="place.id">{{ place}}</div>
                  <div class="data-select action">{{ $t('imageViewer.imageMetadata.addLocation') }}</div>
                  <div class="data-select action">{{ $t('imageViewer.imageMetadata.addAddress') }}</div>
                </div>
              </div>
              <div v-if="element.address" class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-map-pin metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.address') }}</div>
                  <div class="data-select">Kanavakatu (Helsinki)</div>
                </div>
              </div>
              <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-user-avatar metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.depictedPeople') }}</div>
                  <div v-for="actor in element.actors" class="data-select" :key="actor.id">{{ actor }}</div>
                  <div class="data-select action">{{ $t('imageViewer.imageMetadata.addPerson') }}</div>
                </div>
              </div>
              <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-bell-on metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.event') }}</div>
                  <div v-if="element.events" class="data-select">Elias Öhman's funeral</div>
                  <div class="data-select action">{{ $t('imageViewer.imageMetadata.addEvent') }}</div>
                </div>
              </div>
              <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-star-circle metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.institution') }}</div>
                  <div v-if="element.institutions" class="data-select">{{ element.institutions }}</div>
                </div>
              </div>
              <div v-if="element.collection" class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-star-circle metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.collection') }}</div>
                  <div class="data-select">{{ element.collection }}</div>
                </div>
              </div>
              <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-star-circle metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.inventoryNumber') }}</div>
                  <div class="data-text">12345</div>
                </div>
              </div>
              <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-public-domain metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.copyright') }}</div>
                  <a href="#">Public Domain</a>
                </div>
              </div>
              <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-plus metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="data-select linked">{{ $t('imageViewer.imageMetadata.addData') }}</div>
                </div>
              </div>
              <div v-if="element.geoLocations.length > 0" class="grid-row">
                <div class="metadata-map">
                  {{ $t('imageViewer.imageMetadata.locationMap') }}
                  <div id="imagemap" class="map-component"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="metadata-copy alert">
            <div class="header-title boxtitle">{{ $t('imageViewer.imageMetadata.photograph') }}</div>
            <div class="columns">
              <div class="grid-row">
                <div class="grid-icons"></div>
                <div class="grid-text">{{ $t('imageViewer.imageMetadata.copyrightNotePD') }}</div>
              </div>
              <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-plus metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <a href="#">{{ $t('imageViewer.imageMetadata.addPhotographData') }}</a>
                </div>
              </div>
            </div>
          </div>
          <div class="metadata-digital">
            <div class="toolbar">
              <div class="header-title">{{ $t('imageViewer.imageMetadata.digitalCopy') }}</div>
            </div>
            <div class="columns">
              <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-folder-placeholder metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.publishingPlatform') }}</div>
                  <div class="data-text">
                    <a href="#">{{ element.source }}</a>
                  </div>
                </div>
              </div>
              <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-list-numbered metadata-glyph"></i>
                </div>
                <div v-if="element.id" class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.platformId') }}</div>
                  <div class="data-text">{{ element.id }}</div>
                </div>
              </div>
              <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-cite metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.imageInfoPage') }}</div>
                  <div class="data-text limit"><a :href="element.infoURL">{{ element.infoURL }}</a></div>
                </div>
              </div>
              <div v-if="dimension.x > -1" class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-image metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.imageDimensions') }}</div>
                  <div class="data-text">{{ dimension.x }} X {{ dimension.y }} px</div>
                </div>
              </div>
              <!-- <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-cog metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.fileSize') }}</div>
                  <div class="data-text">2,1 MB</div>
                </div>
              </div>
              <div class="grid-row">
                <div class="grid-icons">
                  <i class="wikiglyph wikiglyph-cog metadata-glyph"></i>
                </div>
                <div class="grid-text">
                  <div class="grid-item">{{ $t('imageViewer.imageMetadata.fileFormat') }}</div>
                  <div class="data-text">jpg</div>
                </div>
              </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import HeaderLink from "@/components/HeaderLink";
import UILanguageMenu from "@/components/menu/UILanguageMenu";

export default {
  name: "ImageViewer",
  data() {
    return {
      showModal: false,
      element: {},
      dimension: { x: -1, y: -1 },
      map: null,
      topicFeature: null,
      topicVectorLayer: null
    };
  },
  components: {
    HeaderLink,
    UILanguageMenu
  },
  props: {
    shouldShowDialog: Boolean
  },
  methods: {
    handleCancel: function() {
      this.$emit("close");
    },
    show(element) {
      this.element = element;
      console.log("Element: ", element);
      this.showModal = true;
      this.$nextTick(function() {
        this.createMap();
      });
    },
    hide() {
      this.showModal = false;
    },
    onimageload() {
      this.$nextTick(function() {
        this.dimension.x = this.$refs["viewer-image"].naturalWidth;
        this.dimension.y = this.$refs["viewer-image"].naturalHeight;
      });
    },
    getCredits(item) {
      var newAuthors = item.authors != "" ? item.authors + ", " : "";
      var newYear = item.year != "" ? item.year + ". " : "";
      var newInstitutions =
        item.institutions != "" ? item.institutions + ", " : "";
      var newLicense = item.license != "" ? item.license + ", " : "";

      var credits = newAuthors + newYear + newInstitutions + newLicense;

      if (credits.length > 0 && credits.slice(-2) == ", ") {
        credits = credits.substr(0, credits.length - 2);
      }

      return credits;
    },
    createMap() {
      var ol = this.$ol;

      var view = null;

      if (this.getFirstGeoLocationAsPoint() != null) {
        view = new ol.View({
          center: ol.proj.fromLonLat(this.getFirstGeoLocationAsPoint()),
          zoom: 14
        });
      } else {
        view = new ol.View({
          center: ol.proj.fromLonLat([0, 0]),
          zoom: 1
        });
      }

      this.map = new ol.Map({
        target: "imagemap",
        layers: [
          new ol.layer.Tile({
            source: new this.$ol.source.OSM()
          })
        ],
        view: view
      });

      this.setTopicOnMap();
      this.map.on("click", this.handleMapClick);
    },
    setTopicOnMap() {
      var ol = this.$ol;

      if (this.getFirstGeoLocationAsPoint() != null) {
        this.topicFeature = new ol.Feature({
          geometry: new ol.geom.Point(
            ol.proj.fromLonLat(this.getFirstGeoLocationAsPoint())
          )
        });
        var iconStyle = new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 1],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            src: "/static/wikifont/svgs/mod/uniE851 - mapPin - red.svg",
            scale: 1.4
          })
        });
        this.topicFeature.setStyle(iconStyle);

        var vectorSource = new ol.source.Vector({
          features: [this.topicFeature]
        });

        if (this.topicVectorLayer != null) {
          this.map.removeLayer(this.topicVectorLayer);
          this.topicVectorLayer = null;
        }

        this.topicVectorLayer = new ol.layer.Vector({
          source: vectorSource,
          zIndex: 1000
        });

        this.map.addLayer(this.topicVectorLayer);
      }
    },
    handleMapClick(event) {
      console.log("Map clicked: ", event);
    },
    getFirstGeoLocationGeomType() {
      var type = null;

      if (this.element.geoLocations.length > 0) {
        var wkt = this.element.geoLocations[0];
        if (wkt.indexOf("POINT") != -1) {
          type = "point";
        } else if (wkt.indexOf("LINESTRING") != -1) {
          type = "linestring";
        } else if (wkt.indexOf("POLYGON") != -1) {
          type = "polygon";
        } else if (wkt.indexOf("ENVELOPE") != -1) {
          type = "polygon";
        }
      }
      return type;
    },
    getFirstGeoLocation() {
      var geoLocation = null;
      if (this.element.geoLocations.length > 0) {
        var wkt = this.element.geoLocations[0];
        if (wkt.indexOf("POINT") != -1) {
          // "POINT(24.9600002 60.1796223)"
          var coordPart = wkt.split("(")[1].split(")")[0];
          //console.log(coordPart);
          geoLocation = coordPart.split(" ").map(Number);
        } else if (wkt.indexOf("LINESTRING") != -1) {
          // "LINESTRING(24.9697848 60.1877939,24.9695072 60.1876021)"
          var coordPart = wkt.split("(")[1].split(")")[0];
          var pointParts = coordPart.split(",");
          geoLocation = [];
          for (var i = 0; i < pointParts.length; i++) {
            geoLocation.push(pointParts[i].split(" ").map(Number));
          }
        } else if (wkt.indexOf("POLYGON") != -1) {
          // "POLYGON((24.7828131 60.0999549, 24.8356577 60.130414, 24.8513844 60.2249765, 24.8419098 60.2212043, 24.8347825 60.2585099, 24.8677628 60.2523073, 24.9473908 60.2784652, 24.9731653 60.2643801, 25.0209862 60.2893227, 25.0882105 60.2713417, 25.0823359 60.2496391, 25.1358461 60.2372286, 25.1598757 60.2488133, 25.1425242 60.2697779, 25.2545116 60.2952274, 25.2509121 60.2734979, 25.2273451 60.2611057, 25.240926 60.246305, 25.2014099 60.2181613, 25.2204176 60.1997262, 25.1800446 60.0987408, 25.1693516 59.9434386, 24.9423061 59.922486, 24.7828131 60.0999549))"
          geoLocation = [];
          var parenthesisPart = wkt.substring(wkt.indexOf("("));
          //console.log(parenthesisPart);
          var parenthesisPartInner = parenthesisPart.substr(
            1,
            parenthesisPart.length - 2
          );
          //console.log(parenthesisPartInner);
          var polygonPartCount = parenthesisPartInner.match(/\(/g).length;
          //console.log(polygonPartCount);
          var parts = parenthesisPartInner.split("(").slice(1);
          //console.log(parts);
          var partsWithoutParenthesis = [];
          for (var i = 0; i < parts.length; i++) {
            var part = null;
            var trimmed = parts[i].trim();
            if (trimmed.substr(trimmed.length - 1, 1) == ",") {
              part = trimmed.substr(0, trimmed.length - 1);
            } else {
              part = parts[i];
            }
            partsWithoutParenthesis.push(part.slice(0, -1));
          }
          //console.log(partsWithoutParenthesis);

          for (var i = 0; i < partsWithoutParenthesis.length; i++) {
            var pointParts = partsWithoutParenthesis[i].split(",");
            var polygonPart = [];
            for (var j = 0; j < pointParts.length; j++) {
              polygonPart.push(
                pointParts[j]
                  .trim()
                  .split(" ")
                  .map(Number)
              );
            }
            geoLocation.push(polygonPart);
          }
          //console.log(geoLocation);
        } else if (wkt.indexOf("ENVELOPE") != -1) {
          // "ENVELOPE(24.9320989, 24.9512479, 60.1799755, 60.1677043)"
          var coordPart = wkt.split("(")[1].split(")")[0];
          var pointParts = coordPart.split(",").map(Number);
          //console.log(pointParts);
          var envelopePolygon = [
            [pointParts[0], pointParts[3]],
            [pointParts[0], pointParts[2]],
            [pointParts[1], pointParts[2]],
            [pointParts[1], pointParts[3]],
            [pointParts[0], pointParts[3]]
          ];
          //console.log(envelopePolygon);
          geoLocation = [envelopePolygon];
        }
      }
      return geoLocation;
    },
    getFirstGeoLocationAsPoint() {
      var geoLocation = this.getFirstGeoLocation();
      if (this.element.geoLocations.length > 0) {
        var wkt = this.element.geoLocations[0];
        if (wkt.indexOf("POINT") != -1) {
          // "POINT(24.9600002 60.1796223)"
          var coordPart = wkt.split("(")[1].split(")")[0];
          //console.log(coordPart);
          geoLocation = coordPart.split(" ").map(Number);
        } else if (wkt.indexOf("LINESTRING") != -1) {
          geoLocation = this.getCentroid(geoLocation);
        } else if (wkt.indexOf("POLYGON") != -1) {
          geoLocation = this.getCentroid(geoLocation[0]); // We do not care of the possible holes in the polygon
        } else if (wkt.indexOf("ENVELOPE") != -1) {
          // "ENVELOPE(24.9320989, 24.9512479, 60.1799755, 60.1677043)"
          var coordPart = wkt.split("(")[1].split(")")[0];
          var pointParts = coordPart.split(",").map(Number);
          //console.log(pointParts);
          var lng = (pointParts[0] + pointParts[1]) / 2;
          var lat = (pointParts[2] + pointParts[3]) / 2;
          //var envelopePolygon = [[pointParts[0], pointParts[3]], [pointParts[0], pointParts[2]], [pointParts[1], pointParts[2]], [pointParts[1], pointParts[3]], [pointParts[0], pointParts[3]]];
          //console.log(envelopePolygon);
          geoLocation = [lng, lat];
        }
      }

      return geoLocation;
    },
    getCentroid(coords) {
      var center = coords.reduce(
        function(x, y) {
          return [x[0] + y[0] / coords.length, x[1] + y[1] / coords.length];
        },
        [0, 0]
      );
      return center;
    }
  }
};
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
  overflow: overlay;
  transition: opacity 0.3s ease;
  background: white;
}

i {
  font-size: 24px;
}

.main-content {
  height: 100vh;
}

.headline {
  font-family: "Roboto Condensed", sans-serif;
  color: #333;
  text-transform: uppercase;
}

.main-toolbar {
  display: -ms-flexbox;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
}

.main-toolbar-over {
  position: absolute;
  color: white;
  width: 100%;
  background: linear-gradient(
    360deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.25) 100%
  );
}

.tool {
  background: white;
  color: var(--main-txt-color);
}

.toolbartitle {
  font-size: 1.3em;
  color: white;
}

.toolbar-item {
  height: 100%;
  display: flex;
  align-items: center;
  width: 45px;
  transition: color 80ms ease-in, background 8ms ease-in;
  justify-content: center;
  cursor: pointer;
}

.toolbar-item-a {
  color: white;
}

.toolbar-item:hover > a {
  background: white;
  color: var(--main-txt-color);
}

.stripe {
  flex: 1 0 100%;
  height: 18px;
  display: flex;
  flex-wrap: nowrap;
}

.contentarea {
  height: calc(100vh - 18px);
  background: black;
  position: relative;
  display: flex;
  flex: 1 1 auto;
}

.absolute-right {
  text-align: right;
  height: 45px;
  box-sizing: border-box;
}

.left-align {
  display: flex;
}

.right-align {
  display: flex;
  float: right;
  clear: both;
  align-items: center;
}

.stroke {
  flex: 1 1 16.67%;
}

.mw .yellow {
  background: hsl(0, 0%, 100%);
}

.mw .orange {
  background: hsl(0, 0%, 80%);
}

.mw .red {
  background: hsl(0, 0%, 60%);
}

.mw .purple {
  background: hsl(0, 0%, 40%);
}

.mw .turquoise {
  background: hsl(0, 0%, 20%);
}

.mw .green {
  background: hsl(0, 0%, 0%);
}

.turquoisebar {
  height: 10px;
  background-color: var(--main-blue);
}

.redbar {
  height: 10px;
  background-color: var(--main-red);
}

.greenbar {
  height: 10px;
  background-color: var(--main-green);
}

.topshade {
  position: absolute;
  width: 100%;
  left: 0px;
  right: 0px;
  top: 0px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0) 100%
  );
}
.top-info {
  display: flex;
  margin: 15px;
  justify-content: space-between;
}

.neg {
  color: white;
}

.flex-col {
  flex-direction: column;
}

.info-title {
  font-size: 3vw;
  font-weight: bold;
  line-height: 1em;
  margin-bottom: 5px;
}

.info-subtitle {
  font-size: 1.7vw;
  font-weight: bold;
  line-height: 1.5em;
}

.bottomshade {
  position: absolute;
  width: 100%;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: linear-gradient(
    360deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0) 100%
  );
}

.titlebox {
  margin-left: 20px;
  padding: 30px 0 15px;
}

.white {
  color: white;
}

.titlebox-title {
  font-size: 2em;
  font-weight: bold;
  line-height: 1em;
  margin-bottom: 5px;
}

.titlebox-subtitle {
  line-height: 1.5em;
}

.titlebox-tool {
  margin: 30px 15px 15px;
}

.titlebox-tool-title {
  margin-bottom: 0.2em;
}

.titlebox-tool-subtitle {
}

.titlebox-subtitle:first-letter {
  text-transform: capitalize;
}

.titlebox-tool a {
  color: white;
  font-weight: bold;
}

.titlebox-tool a:hover {
  color: var(--main-link-color);
}

.viewer-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.viewer-contents {
  position: absolute;
  width: 100%;
  top: 0;
  height: calc(100vh - 18px);
  opacity: 0;
  transition: opacity 500ms;
}

.contentarea:hover .viewer-contents {
  opacity: 1;
}

.step-right {
  background: linear-gradient(
    270deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.step-left {
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.step-right:hover {
  opacity: 1;
  cursor: pointer;
}

.step-left:hover {
  opacity: 1;
  cursor: pointer;
}

.step-glyph {
  font-size: 60px;
  padding: 20px;
}

.titlebox-subtitle a {
  color: white;
}

.titlebox-subtitle a:hover {
  color: var(--main-link-color);
  box-shadow: none;
}

.columns {
  column-width: 373px;
  column-gap: 1.5em;
  padding: 10px 20px 15px 20px;
}

.metadata-glyph {
  color: var(--main-txt-color);
  font-size: 20px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 15fr;
  grid-gap: 0.5em;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

.boxtitle {
  padding: 15px 20px 0 20px;
}

.grid-row {
  display: flex;
  margin-bottom: 5px;
}

.grid-icons {
  flex: 0 0 auto;
  margin: 0.05em 0.8em 0 0;
}
.grid-item {
  font-weight: bold;
  display: inline;
  color: var(--main-txt-color);
}

.grid-text {
  padding-top: 2px;
}

.limit {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 350px;
}

.metadata-map {
  width: 100%;
  /* background: var(--main-blue); */
  height: 200px;
}

/* .map {
    width: 100%;
    height: 400px;
    position: relative;
} */

.alert {
  background-color: var(--main-yellow);
}

.alert a {
  color: var(--main-red);
}

.alert a:hover {
  color: var(--main-text-color);
}

.ner {
  display: inline;
  box-shadow: inset 0 0 0 rgba(0, 0, 0, 0), 0 3px 0 var(--main-red);
  cursor: pointer;
}

.data-text {
  display: inline-block;
}

.data-select {
  display: inline-block;
  background: var(--main-red);
  color: white;
  padding: 0 7px;
  border-radius: 1em;
  line-height: 1.25;
  cursor: pointer;
  margin-right: 3px;
  /* transition: background 80ms ease-in, color 80ms ease-in; */
}

.data-select::after {
  font-family: "WikiFont-Glyphs";
  font-weight: 400;
  content: " \e061";
  font-size: 0.7em;
}

.linked {
  color: var(--main-link-color);
  background: white;
}

.action {
  color: #999;
  background: white;
}

.data-select:hover,
.ner:hover {
  background: black;
  /* border-radius: 0;*/
  color: white;
  box-shadow: none;
}

.unedited {
  color: var(--main-red);
}

.unedited:hover {
  background: black;
  color: white;
}

/* .unedited::after, .edited::after {
  font-family: "WikiFont-Glyphs";
  font-weight: 400;
  content: " \e061";
  font-size: 0.7em;
} */

.tool-main {
  display: flex;
  height: calc(100vh - 40px);
}

.tool-menu {
  flex: 0 0 200px;
  background: var(--main-txt-color);
  padding-top: 10px;
}

.tool-menu-item {
  display: flex;
  height: 40px;
  padding-left: 12px;
  align-items: center;
  font-weight: bold;
  color: white;
  cursor: pointer;
}

.tool-menu-item:hover {
  background: white;
  color: var(--main-txt-color);
}

.tool-menu-item-text {
  padding: 0 15px;
}

.tool-content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
}

.tool-workarea {
  display: flex;
  flex: 1 1 auto;
}

.image-area {
  flex: 1 1 50%;
  background: black;
}

.tool-area {
  flex: 1 1 50%;
  background: var(--main-modal-color);
}

.tool-help {
  flex: 0 0 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 15px;
}

.help-text {
  font-weight: bold;
}

.button {
  font-weight: bold;
  min-width: 120px;
  background: var(--main-link-color);
  margin-left: 10px;
  min-height: 35px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  cursor: pointer;
  box-sizing: border-box;
}

.cancel {
  color: var(--main-blue);
  background: white;
}

.cancel:hover {
  border: 1px solid var(--main-blue);
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 */

.modal-enter {
  /*opacity: 0;*/
}

.modal-leave-active {
  /*opacity: 0;*/
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
