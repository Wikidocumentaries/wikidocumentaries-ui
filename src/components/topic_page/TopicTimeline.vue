<template>
    <div class="timeline-component">
        <div class="toolbar">
            <div class="header-title">{{ header.title }}</div>
            <ToolbarMenu icon="wikiglyph-plus" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">Toiminnot</div>
            </ToolbarMenu>
        </div>
        <div ref="timelineBar" class="timeline">
            <div class="timeline-start"></div>
            <div class="timeline-start-year" :class="{ 'year-included': startYearIncluded }">{{ startYear }} -</div>
            <div ref="timelineCenturies" class="timeline-centuries">
                <div v-for="(century, index) in timelineCenturies" :key="century.year" class="timeline-century" :style="centuryStyle(index)">{{ getCenturyText(index) }}</div>
            </div>
            <div class="timeline-item" v-for="(item, index) in sortedTimelineItems" :key="item.id" :style="timelineItemStyle(index)"></div>
            <div class="timeline-end-year" :class="{ 'year-included': endYearIncluded, 'year-background-odd': oddCenturies, 'year-background-even': !oddCenturies }">- {{ endYear }}</div>
            <div class="timeline-end"></div>
        </div>
        <div ref="timelineExplanations" class="timeline-explanations">
            <div class="timeline-explanation" v-for="(item, index) in sortedTimelineItems" :key="item.id + item.title" :style="timelineItemExplanationStyle(index, item)">
                <div class="timeline-explanation-box" :style="timelineExplanationBoxStyle(index)">{{ getItemExplanation(index) }}</div>
            </div>
            <div :ref="'timelineExplanations' + index" v-for="(item, index) in sortedTimelineItems" :key="item.id" class="timeline-explanation-connector"></div>
        </div>
    </div>
</template>

<script>

import ToolbarMenu from '@/components/menu/ToolbarMenu'

const MENU_ACTIONS = {
    SHOW_EVENTS_ON_THE_TIMELINE: 0
}

const ITEM_TYPES = {
    EVENT: 0,
    IMAGE: 1,
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
                    id: MENU_ACTIONS.SHOW_EVENTS_ON_THE_TIMELINE,
                    text: "Näytä tapahtumat aikajanalla",
                },
            ],
            endYear: (new Date()).getFullYear(),
            startYearIncluded: false,
            endYearIncluded: false,
            timelineImageItems: [],
            timelineEventItems: [],
            timelineCenturies: [],
            maxTitleLengthInChars: 55,
            oddCenturies: false
        }
    },
    components: {
        ToolbarMenu,
    },
    mounted: function () {
        window.addEventListener('resize', this.handleWindowsResize);
        this.calculateCenturies(this.startYear);
    },
    computed: {
        wikidocumentaries () {
            return this.$store.state.wikidocumentaries;
        },
        timelineImages () {
            return this.$store.state.timelineImages;
        },
        shouldShowStartYear () {
            return this.timelineCenturies.length > 0;
        },
        startYear () {
            return (this.$store.getters.topicStartYear < 0 ? 0 : this.$store.getters.topicStartYear);
        },
        sortedTimelineItems () {
            //console.log(temp);
            var timeLineItems = [];

            for(var i = 0; i < this.timelineEventItems.length; i++) {
                var eventItem = this.timelineEventItems[i];
                var timeLineItem = {
                    id: eventItem.dateItem.wikidata_property,
                    year: eventItem.year,
                    title: eventItem.dateItem.label,
                    pos: eventItem.pos,
                    type: ITEM_TYPES.EVENT
                }
                timeLineItems.push(timeLineItem);
            }

            for (var i = 0; i < this.timelineImageItems.length; i++) {
                var imageItem = this.timelineImageItems[i];
                var timeLineItem = {
                    id: imageItem.image.id,
                    year: imageItem.image.year,
                    title: imageItem.image.title,
                    pos: imageItem.pos,
                    type: ITEM_TYPES.IMAGE
                }
                timeLineItems.push(timeLineItem);
            }

            var timeLineItems = timeLineItems.sort(function(a, b) {
                return (a.year - b.year);
            });

            return timeLineItems;
        }
    },
    watch: {
        startYear: function(year, oldStartYear) {
            this.calculateCenturies(year);
        },
        timelineImages: function(images, oldImages) {

            // if (this.timelineImages.length > 0) {
            //     this.startYearIncluded = true;
            // } 

            // calculate and create backround division of the timeline images years on the UI

            var oldest = 3000;
            var newest = 0;

            for (var i = 0; i < images.length; i++) {
                oldest = oldest < images[i].year ? oldest : images[i].year;
                newest = newest > images[i].year ? newest : images[i].year;
            }

            //console.log(oldest, newest);

            if (newest == this.endYear) {
                this.endYearIncluded = true;
            }
            else {
                this.endYearIncluded = false;
            }

            this.timelineImageItems = [];

            // Calculate position for each image on the timeline

            var startYear = (this.startYear < 0 ? 0 : this.startYear);
            var timeSpan = this.endYear - startYear;    

            for (var i = 0; i < images.length; i++) {
                var image = images[i];

                if (image.year != null) {
                    var pos = -1;
                    if (this.endYear != startYear) {
                        pos = (image.year - startYear) / timeSpan;
                    }
                    else {
                        pos = 0;
                    }
                    if (pos >= 0) {
                        this.timelineImageItems.push({
                            pos: pos,
                            image: images[i]
                        });
                    }
                }
            }

            //console.log(this.timelineImageItems);
        },
        sortedTimelineItems: function(items, oldItems) {
            this.$nextTick(function () {
                //var height = this.$refs.timelineExplanations.clientHeight;
                //console.log(height);
                for (var i = 0; i < this.sortedTimelineItems.length; i++) {
                    var element = this.$refs["timelineExplanations" + i][0];
                    //console.log(element);
                    var style = this.timelineExplanationConnectorStyle(i);
                    //console.log(style);
                    element.style.cssText = style;
                }
            });
        }
    },
    methods: {
        onDoMenuItemAction (menuItem) {
            switch (menuItem.id) {
            case MENU_ACTIONS.SHOW_EVENTS_ON_THE_TIMELINE:
                this.createTimelineEventItems();
                break;
            }
        },
        createTimelineEventItems () {
            if (this.wikidocumentaries.wikidata != undefined) {
                var eventDates = this.wikidocumentaries.wikidata.dates;

                this.timelineEventItems = [];

                // Calculate position for event on the timeline

                var startYear = (this.startYear < 0 ? 0 : this.startYear);
                var timeSpan = this.endYear - startYear;    

                for (var i = 0; i < eventDates.length; i++) {
                    var eventDate = eventDates[i];
                    var year = this.createEventYearFromWikidata(eventDate);
                    if (year != null) {
                        var pos = -1;
                        if (this.endYear != startYear) {
                            pos = (year - startYear) / timeSpan;
                        }
                        else {
                            pos = 0;
                        }
                        this.timelineEventItems.push({
                            pos: pos,
                            year: year,
                            dateItem: eventDate
                        });
                    }
                }
            }
        },
        createEventYearFromWikidata(eventDate) {
            //console.log(eventDate);

            var year = null;
            var timeString = eventDate.value.time;
            var year = parseInt((timeString.indexOf('-') != 0 ? timeString.substring(1, timeString.indexOf('-')) : timeString.substring(0, timeString.indexOf('-', 1))), 10);

            return year;
        },     
        calculateCenturies(startYear) {
            this.timelineCenturies = [];
            //console.log("startYear", startYear);
            //console.log("endYear", this.endYear);

            if (startYear < 0) {
                startYear = 0;
            }

            var timeSpan = this.endYear - startYear;   

            var startCenturyNonStrict = Math.floor(startYear / 100);
            var endCenturyNonStrict = Math.floor(this.endYear / 100);
            for (var i = startCenturyNonStrict; i <= endCenturyNonStrict; i++) {
                var pos = (i * 100 - startYear) / timeSpan;
                this.timelineCenturies.push({
                    pos: pos,
                    year: i * 100
                });
            }

            //console.log("this.timelineCenturies", this.timelineCenturies);
            if (this.timelineCenturies.length % 2 != 0) {
                this.oddCenturies = true;
            }
            else {
                this.oddCenturies = false;
            }
            //console.log("this.oddCenturies", this.oddCenturies);

            //console.log(this.timelineCenturies);
        },
        centuryStyle(index) {

            var style = "";

            if (this.$refs.timelineCenturies != undefined) {

                var left = 0;
                if (this.timelineCenturies[index].pos > 0) {
                    left = this.$refs.timelineCenturies.clientWidth * this.timelineCenturies[index].pos;
                }
                var backgroundColor = index % 2  == 0 ? "black" : "#363636";
                if (index < this.timelineCenturies.length - 1) {
                    var nextLeft = this.$refs.timelineCenturies.clientWidth * this.timelineCenturies[index + 1].pos;
                    var width = nextLeft - left;

                    style = "left: " + left + "px; " +
                        "width: " + width + "px; " +
                        "background: " + backgroundColor + ";";
                }
                else { // last century
                    style = "left: " + left + "px; " +
                        "right: 0; " +
                        "background: " + backgroundColor + ";";
                }
                
                //console.log(style);

            }

            return style;
        },
        getCenturyText(index) {
            var text = "";
            if (index > 0 && index < this.timelineCenturies.length - 1) {
                return this.timelineCenturies[index].year + "-luku";
            }
            return text;
        },
        timelineItemStyle(index) {
            // this.$nextTick(function () {
            //     console.log(this.$refs.timelineBar.clientWidth);
            // });
            var item = this.sortedTimelineItems[index];

            var left = 0;
            if (item.pos > 0) {
                left = this.$refs.timelineBar.clientWidth * item.pos;
            }
            var style = "left: " + left + "px;";
            switch (item.type) {
            case ITEM_TYPES.IMAGE:
                style += "background: #0079a1;z-index: 10;"
                break;
            case ITEM_TYPES.EVENT:
                style += "background: #cf412d;z-index: 11;"
                break;
            }
            return style;
        },
        handleWindowsResize (event) {
            var tempTimelineCenturies = this.timelineCenturies;
            var tempTimeLineImageItems = this.timelineImageItems;
            var tempTimelineEventItems = this.timelineEventItems;
            this.timelineImageItems = [];
            this.timelineEventItems = [];
            this.timelineCenturies = [];
            this.$nextTick(function () {
                this.timelineCenturies = tempTimelineCenturies;
                this.timelineImageItems = tempTimeLineImageItems;
                this.timelineEventItems = tempTimelineEventItems;
            });
        },
        timelineItemExplanationStyle(index, item) {
            return "";
        },
        getItemExplanation(index) {
            var newTitle = this.sortedTimelineItems[index].title;
            if (newTitle.length > this.maxTitleLengthInChars) {
                newTitle = newTitle.substr(0, this.maxTitleLengthInChars - 3) + "...";
            }
            return newTitle;
        },
        timelineExplanationBoxStyle(index) {
            var style = "";

            //console.log(this.$refs.timelineExplanations.style.font);

            var textWidth = getTextWidth(this.getItemExplanation(index), "italic 11pt Arial");
            //console.log(textWidth);

            var left = 0;
            if (this.sortedTimelineItems[index].pos > 0) {
                left = this.$refs.timelineBar.clientWidth * this.sortedTimelineItems[index].pos;
            }
            var pos = left;
            if (left + textWidth > this.$refs.timelineBar.clientWidth) {
                pos = left - textWidth;
            }

            style = "padding-left: " + pos + "px;"

            //console.log(style);
            return style;
        },
        timelineExplanationConnectorStyle(index) {
             var item = this.sortedTimelineItems[index];

            var left = 0;
            if (item.pos > 0) {
                left = this.$refs.timelineBar.clientWidth * item.pos;
            }
            //console.log(left);
            var style = "left: " + left + "px;";

            var containerHeight = this.$refs.timelineExplanations.clientHeight;
            //console.log(containerHeight);

            var height = containerHeight / this.sortedTimelineItems.length * (index + 1) - 11;
            //console.log(height);
            style += "height: " + height + "px;";

            switch (item.type) {
            case ITEM_TYPES.IMAGE:
                style += "background: #c2dce4;z-index: 8;"
                break;
            case ITEM_TYPES.EVENT:
                style += "background: #dbc1be;z-index: 9;"
                break;
            }
            return style;
        }
    }
}

function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

function getTextHeight(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.height;
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.dev-color {
    color: #c2dce4;
    background: #dbc1be;
}

.timeline {
    height: 40px;
    /* background: black; */
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    font-weight: bold;
    position: relative;
    background: #363636;
}

.timeline-start {
    flex: 1 0 0%;
    text-align: left;
    /* height: 100%; */
    padding: 9px 10px 9px 10px;
    background: black;
    color: #8e8e8e;
    opacity: 0;
    z-index: 5;
}

.timeline-start-year {
    position: absolute;
    left: 0;
    text-align: left;
    /* height: 100%; */
    padding: 9px 10px 9px 2px;
    background: transparent;
    color: #8e8e8e;
    z-index: 6;
}

.year-included {
    color: #e9544c;
}

.year-background-odd {
    background: black;
}

.year-background-even {
    background: #363636;
}


.timeline-end {
    flex: 1 0 0%;
    text-align: right;
    /* height: 100%; */
    padding: 9px 10px 9px 10px;
    color: #8e8e8e;
    opacity: 0;
    z-index: 5;
}

.timeline-end-year {
    position: absolute;
    right: 0;
    text-align: right;
    /* height: 100%; */
    padding: 9px 2px 9px 10px;
    background: transparent;
    color: #8e8e8e;
    z-index: 6;
}

.timeline-centuries {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    
    color: #8e8e8e;
}

.timeline-century {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 4;
    padding: 9px 0 9px 0;
}

.timeline-item {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 3px;
    /* border: 2px solid #e9544c; */
}

.timeline-explanations {
    display: flex;
    flex-wrap: wrap;
    font-family: 'Arial', sans-serif;
    font-size: 11pt;
    line-height: 1.5;
    color: #333;
    font-style: italic;
    position: relative;
}

.timeline-explanation {
    flex: 1 0 100%;
    position: relative;
    z-index: 10;
}

/* .timeline-explanation-box {
    top: 0;
    position: absolute;
} */

.timeline-explanation-connector {
    position: absolute;
    top: 0;
    width: 3px;
}

</style>
