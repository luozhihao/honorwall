<template>
    <div class="honor-apply clearfix">
        <upload></upload>
    </div>
</template>

<script>
export default {
    components: {
        upload: require("./plugin/Upload.vue")
    }
}
</script>

<style scoped>
.honor-apply {
    padding: 60px 200px;
}
</style>