<template>
    <div class="message-list">
        <div class="row title" v-if="selected">
            <div class="column-title">
                Preview Message
            </div>
            <div class="column-title">
                Edit Message
            </div>
        </div>

        <div class="buttons" v-if="selected">
            <template v-if="selected.messages.length < 10">
                <button class="icon add" @click="$store.commit('addMessage')">Add message to {{selected.name}}</button>
            </template>
            <template v-else>
                Identifiers can contain max 10 messages.
            </template>
        </div>

        <div v-if="selected">
            <div v-for="(message, id) in selected.messages" :key="`${selected.name}#${id}`"
                 class="row message"
                 v-if="$store.getters.selectedIdentifier"
            >
                <button class="icon remove" @click="$store.commit('removeMessage', message)"></button>

                <MessageRender :message="message"></MessageRender>
                <MessageEdit :message="message"></MessageEdit>
            </div>
        </div>
    </div>
</template>

<script>
    import MessageEdit from './message-edit'
    import MessageRender from './message-render'

    export default {
        name: 'MessageList',
        computed: {
            selected() {
                return this.$store.getters.selectedIdentifier
            }
        },
        components: {MessageEdit, MessageRender}
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    .message-list {
        flex-grow: 6;
        flex-basis: 600px;

        display: flex;
        flex-direction: column;

        max-height: 100%;
        overflow: auto;

        .buttons {
            text-align: center;
            height: 32px;
            line-height: 32px;
            box-sizing: border-box;
            border-bottom: 1px solid $border-color * 1.5;

            flex-shrink: 0;
            flex-grow: 0;
        }

        .row {
            display: flex;

            > * {
                flex-grow: 1;
                flex-basis: 100px;
                max-width: 50%;
            }

            &.message {
                border-bottom: 1px solid $border-color;
                height: 120px;
                box-sizing: border-box;
                position: relative;

                p {
                    margin: 0;
                    padding: $padding / 2;
                    box-sizing: border-box;
                    background: $bg-gray;
                    word-wrap: break-word;
                    overflow: auto;
                    line-height: 22px;
                }

                .remove {
                    display: none;
                    height: 26px;
                    width: 32px;
                    position: absolute;
                    right: 31px;
                    top: -25px;
                    background: $bg-dark;
                    border-radius: 8px 8px 0 0;
                    border: 1px solid $border-color;
                    border-bottom: none;

                    &:hover:before {
                        color: $warn-color;
                    }
                }

                &:hover {
                    .remove {
                        display: block;
                    }
                }
            }

            &.title {
                flex-shrink: 0;
                flex-grow: 0;

                > *:last-child {
                    border-left: 1px solid $border-color;
                }
            }
        }

    }
</style>