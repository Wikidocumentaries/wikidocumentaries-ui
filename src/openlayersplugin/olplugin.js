
import olMap from 'ol/Map';
import View from 'ol/View';
import * as layer from 'ol/layer';
import * as source from 'ol/source';
//import OSM from 'ol/source/OSM';
//import XYZ from 'ol/source/XYZ';
import * as proj from 'ol/proj';
import Feature from 'ol/Feature';
import Overlay from 'ol/Overlay';
import VectorSource from 'ol/source/Vector';
import * as style from 'ol/style';
import * as geom from 'ol/geom';
import * as extent from 'ol/extent';

export default {
    install: function (Vue) {
        Vue.prototype.$ol = {
            Feature: Feature,
            Map: olMap,
            Overlay: Overlay,
            View: View,
            extent: extent,
            geom: geom,
            layer: layer,
            proj: proj,
            source: source,
            style: style
        }
    }
}
