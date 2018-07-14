<template>
    <div class="map-component">
        <div class="toolbar">
            <div class="header-title">{{ header.title }}</div>
            <ToolbarMenu icon="wikiglyph-plus" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">Toiminnot</div>
            </ToolbarMenu>
        </div>
        <div class="timeline">
            <div class="timeline-start year-included">{{ startYear }}</div>
            <div class="timeline-end" :class="{ 'year-included': endYearIncluded }">{{ endYear }}</div>
        </div>
    </div>
</template>

<script>

import ToolbarMenu from '@/components/menu/ToolbarMenu'

const MENU_ACTIONS = {
    NONE: 1
}

export default {
    name: 'TopicTimeline',
    props: {
    },
    data () {
        return {
            header: {
                title: 'Aikajana'
            },
            toolbarActionMenuItems: [
                {
                    id: MENU_ACTIONS.NONE,
                    text: "...",
                },
            ],
            startYear: null,
            endYear: (new Date()).getFullYear(),
            endYearIncluded: false,
            imageTimelinePositions: [],
            timelineCenturies: []
        }
    },
    components: {
        ToolbarMenu,
    },
    mounted: function () {
    },
    computed: {
        wikidocumentaries () {
            return this.$store.state.wikidocumentaries;
        },
        timelineImages () {
            return this.$store.state.timelineImages;
        },
    },
    watch: {
        timelineImages: function(images, oldImages) {
            // calculate and create backround division of the timeline images years on the UI

            var oldest = 3000;
            var newest = 0;

            for (var i = 0; i < images.length; i++) {
                oldest = oldest < images[i].year ? oldest : images[i].year;
                newest = newest > images[i].year ? newest : images[i].year;
            }

            console.log(oldest, newest);

            this.startYear = oldest;
            if (newest == this.endYear) {
                this.endYearIncluded = true;
            }
            else {
                this.endYearIncluded = false;
            }

            this.imageTimelinePositions = [];

            if (this.endYear != this.startYear) {

                // Calculate position for each image on the timeline

                for (var i = 0; i < images.length; i++) {
                    // #0079a1
                    var image = images[i];
                    var pos = -1;
                    
                    var timeSpan = this.endYear - this.startYear;
                    pos = (image.year - this.startYear) / timeSpan;
                    this.imageTimelinePositions.push(pos);
                }

                var startCenturyNonStrict = Math.floor(this.startYear / 100);
                var endCenturyNonStrict = Math.floor(this.endYear / 100);
                for (var i = startCenturyNonStrict; i <= endCenturyNonStrict; i++) {
                    this.timelineCenturies.push(i);
                }
            }
            else {
                this.imageTimelinePositions = [0];
            }

            console.log(this.imageTimelinePositions);
             console.log(this.timelineCenturies);
        }
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

.timeline {
    height: 40px;
    background: black;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    font-weight: bold;

}

.timeline-start {
    flex: 1 0 10%;
    text-align: left;
    padding: 10px;
    background: black;
}

.year-included {
    color: #e9544c;
}

.timeline-end {
    flex: 1 0 10%;
    text-align: right;
    background: #363636;
    padding: 10px;
    color: #8e8e8e;
}

</style>
