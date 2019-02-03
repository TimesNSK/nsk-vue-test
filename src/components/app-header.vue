<template>
    <header>
        <h1>Test Vue with Katex - <i>{{$store.state.fileName}}</i></h1>

        <div class="buttons">
            <button class="icon download" @click="download">Download file</button>
            <button class="icon upload" @click="upload">Upload file</button>
        </div>
    </header>
</template>

<script>
    import FileLoader from '../js/file-loader'
    import downloadHelper from '../js/download'

    export default {
        name: 'app-header',
        data() {
            return {
                fileLoader: new FileLoader(p => p.then(file => {
                    try {
                        const json = JSON.parse(file.data)
                        this.$store.commit('fileUpload', {name: file.name, json})
                    } catch (e) {
                        alert(`Can't upload file. "${file.name}" is not valid JSON format.`)
                    }
                }))
            }
        },
        methods: {
            download() {
                const {name, json} = this.$store.getters.fileDownload
                downloadHelper.downloadJSON(name, json)
            },
            upload() {
                this.fileLoader.load()
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    header {
        height: 40px;
        padding: 0 $padding;
        background: $bg-gray;

        flex-shrink: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        border-bottom: 1px solid $border-color;

        h1 {
            font-size: 16px;

            i {
                font-size: 14px;
                color: #ccc;
            }
        }

        button {
            padding: $padding / 2;
        }
    }
</style>
