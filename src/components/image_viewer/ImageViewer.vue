<template>
	<div class "image-viewport">
		<div class="stripe-bw"></div>
		<navbar></navbar>
		<imagearea>
			<img v-bind:src="wikidocumentaries.headerImageURL" class="header-image" :class="( isHumanTopic ? 'header-human' : 'header-nonhuman')"/>
		</imagearea>
		<zoom-controls></zoom-controls>
		<image-navigation></image-navigation>
		<div class="bottomshade">
          <div class="titlebox">
            <div class="title">{{ wikidocumentaries.title }}</div>
            <div class="attribution">{{ wikidocumentaries.attribution }}</div>
           </div>
        </div>
	</div>
</template>
