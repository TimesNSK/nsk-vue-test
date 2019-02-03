<template>
    <div class="identifier-list">
        <div class="column-title">
            Identifiers
        </div>
        <div class="content">
            <div class="new-identifier">
                <input type="text" @keyup.enter="createIdentifier" @blur="err = null" placeholder="Add identifier">
                <div class="validate" v-if="err">{{err}}</div>
            </div>

            <div v-for="identifier in $store.getters.getIdentifiers"
                 class="identifier" :class="{selected: selected === identifier}">

                <div class="name" @click="$store.commit('selectIdentifier', identifier)">{{identifier.name}}</div>
                <button class="icon remove" @click="remove(identifier)"></button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'IdentifierList',
        data: function () {
            return {
                err: null
            }
        },
        computed: {
            selected() {
                return this.$store.getters.selectedIdentifier
            }
        },
        methods: {
            remove(identifier) {
                this.$store.commit('removeIdentifier', identifier)
            },
            createIdentifier(e) {
                const el = e.target
                const name = el.value
                this.err = null

                if (this.$store.getters.getIdentifierByName(name)) {
                    this.err = `Identifier ${name} already exist.`
                    return
                }

                el.value = ''
                this.$store.commit('createIdentifier', name)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    .identifier-list {
        flex-basis: 200px;
        flex-grow: 1;

        box-sizing: border-box;
        border-right: 1px solid $border-color;

        .validate {
            padding: $padding / 2;
            color: $warn-color;
        }

        .identifier {
            cursor: pointer;
            transition: $transition;
            display: flex;
            align-items: center;
            height: 32px;

            &.selected {
                background: $active-color;
            }

            &:active {
                background: $active-color;
            }

            &:hover {
                background: $btn-hover-color;

                button {
                    display: block;
                }
            }

            .name {
                flex-grow: 1;
                line-height: 20px;
                height: 20px;
                padding: $padding / 2;
            }

            button {
                display: none;
                padding: $padding / 2;

                &:hover:before {
                    color: $warn-color;
                }
            }
        }
    }

</style>