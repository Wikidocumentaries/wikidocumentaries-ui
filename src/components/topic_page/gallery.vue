<template>
	<div class="newspapers-component">
		<div class="toolbar">
            <div class="header-title">{{ $t('topic_page.TopicNewspapers.headerTitle') }}</div>
            <ToolbarMenu icon="wikiglyph-plus" :items="toolbarActionMenuItems" @doMenuItemAction="onDoMenuItemAction">
                <div slot="menu-title">{{ $t('general.menus.actionMenuTitle') }}</div>
            </ToolbarMenu>
        </div>
        <div class="gallery">
        </div>
	</div>
</template>
