<template>
    <div id="app">
        <AppHeader></AppHeader>
        <main>
            <IdentifierList></IdentifierList>
            <MessageList></MessageList>
        </main>
    </div>
</template>

<script>
    import AppHeader from './app-header'
    import IdentifierList from './identifier-list'
    import MessageList from './message-list'

    export default {
        name: 'test',
        components: {
            AppHeader,
            IdentifierList,
            MessageList
        }
    }
</script>

<style lang="scss">
    @import '../styles/base';

    #app {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    main {
        display: flex;
        background: $bg-dark;
        flex-grow: 1;
    }
</style>
