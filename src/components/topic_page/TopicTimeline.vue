<template>
    <div class="timeline-component">
        <div class="toolbar">
            <div class="header-title">{{ header.title }}</div>
            <ToolbarMenu icon="wikiglyph-plus" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">Toiminnot</div>
            </ToolbarMenu>
        </div>
        <div ref="timelineBar" class="timeline">
            <div class="timeline-start" :class="{ 'year-included': startYearIncluded }">{{ (startYear < 0 ? 0 : startYear) }}</div>
            <div ref="timelineCenturies" class="timeline-centuries">
                <div v-for="(century, index) in timelineCenturies" :key="century.year" class="timeline-century" :style="centuryStyle(index)">{{ getCenturyText(index) }}</div>
            </div>
            <div class="timeline-image" v-for="(item, index) in timelineImageItems" :key="item.image.id" :style="timelineImageStyle(index)"></div>
            <div class="timeline-end" :class="{ 'year-included': endYearIncluded, 'year-background-odd': oddCenturies, 'year-background-even': !oddCenturies }">{{ endYear }}</div>
        </div>
        <div ref="timelineExplanations" class="timeline-explanations">
            <div class="timeline-explanation" v-for="(item, index) in sortedTimelineImageItems" :key="item.image.id" :style="timelineItemExplanationStyle(index, item)">
                <div class="timeline-explanation-box" :style="timelineExplanationBoxStyle(index)">{{ getItemExplanation(index) }}</div>
            </div>
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
            endYear: (new Date()).getFullYear(),
            startYearIncluded: false,
            endYearIncluded: false,
            timelineImageItems: [],
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
            return this.$store.getters.topicStartYear;
        },
        sortedTimelineImageItems () {
            var temp = this.timelineImageItems;
            var temp = temp.sort(function(a, b) {
                return (a.image.year - b.image.year);
            });
            //console.log(temp);
            return temp;
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
                    this.timelineImageItems.push({
                        pos: pos,
                        image: images[i]
                    });
                }
            }

            //console.log(this.timelineImageItems);
        }
    },
    methods: {
        onDoMenuItemAction (menuItem) {
            switch (menuItem.id) {
            }
        },
        calculateCenturies(startYear) {
            this.timelineCenturies = [];
            console.log("startYear", startYear);
            console.log("endYear", this.endYear);

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

            console.log("this.timelineCenturies", this.timelineCenturies);
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
        timelineImageStyle(index) {
            // this.$nextTick(function () {
            //     console.log(this.$refs.timelineBar.clientWidth);
            // });
            var left = 0;
            if (this.timelineImageItems[index].pos > 0) {
                left = this.$refs.timelineBar.clientWidth * this.timelineImageItems[index].pos;
            }
            var style = "left: " + left + "px";
            return style;
        },
        handleWindowsResize (event) {
            var tempTimelineCenturies = this.timelineCenturies;
            var tempTimeLineImageItems = this.timelineImageItems;
            this.timelineImageItems = [];
            this.timelineCenturies = [];
            this.$nextTick(function () {
                this.timelineCenturies = tempTimelineCenturies;
                this.timelineImageItems = tempTimeLineImageItems;
            });
        },
        timelineItemExplanationStyle(index, item) {
            return "";
        },
        getItemExplanation(index) {
            var newTitle = this.timelineImageItems[index].image.title;
            if (newTitle.length > this.maxTitleLengthInChars) {
                newTitle = newTitle.substr(0, this.maxTitleLengthInChars - 3) + "...";
            }
            return newTitle;
        },
        timelineExplanationBoxStyle(index) {
            var style = "";

            //console.log(this.$refs.timelineExplanations.style.font);

            var textWidth = getTextWidth(this.getItemExplanation(index), "italic 11pt Arial");
            console.log(textWidth);

            var left = 0;
            if (this.timelineImageItems[index].pos > 0) {
                left = this.$refs.timelineBar.clientWidth * this.timelineImageItems[index].pos;
            }
            var pos = left;
            if (left + textWidth > this.$refs.timelineBar.clientWidth) {
                pos = left - textWidth;
            }

            style = "padding-left: " + pos + "px;"

            console.log(style);
            return style;
        },
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

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
    z-index: 5;
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
    z-index: 5;
}

.timeline-centuries {
    flex: 8 2 80%;
    height: 100%;
    text-align: center;
    position: relative;
    color: #8e8e8e;
}

.timeline-century {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 4;
    padding: 9px 0 9px 0;
}

.timeline-image {
    position: absolute;
    background: #0079a1;
    top: 0;
    bottom: 0;
    width: 3px;
    /* border: 2px solid #e9544c; */
    z-index: 10;
}

.timeline-explanations {
    display: flex;
    flex-wrap: wrap;
    font-family: 'Arial', sans-serif;
    font-size: 11pt;
    line-height: 1.5;
    color: #333;
    font-style: italic;
}

.timeline-explanation {
    flex: 1 0 100%;
    position: relative;
}

/* .timeline-explanation-box {
    top: 0;
    position: absolute;
} */

</style>
