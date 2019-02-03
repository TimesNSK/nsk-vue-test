<template>
    <div class="text-edit">
        <textarea v-model="messageModel"></textarea>
    </div>
</template>

<script>
    export default {
        props: ['message'],
        name: 'MessageEdit',
        computed: {
            messageModel: {
                get: function () {
                    return this.message.text
                },
                set: function (value) {
                    this.$store.commit('changeMessage', {
                        message: this.message,
                        text: value
                    })
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    .text-edit {
        flex-grow: 3;
        flex-basis: 300px;
        display: flex;

        textarea {
            background: $bg-dark;
            border: 1px solid $border-color;
            flex-grow: 1;
            padding: $padding / 2;
            box-sizing: border-box;
            resize: none;
            font-size: 14px;
            line-height: 16px;
            color: $text-color;
            word-wrap: break-word;
        }
    }
</style>