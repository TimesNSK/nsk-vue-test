<script>
    import katex from 'katex'

    export default {
        props: ['expression'],
        name: 'vue-math',
        computed: {
            options() {
                return {
                    throwOnError: false
                }
            },
            html() {
                return katex.renderToString(this.expression, this.options)
            }
        },
        render(h) {
            return h('span', {
                domProps: {
                    innerHTML: this.html,
                },
            })
        },
    }
</script>

<style lang="scss">
    @import "../styles/variables";

    span {
        color: $math-color;
        font-weight: 300;
    }
</style>