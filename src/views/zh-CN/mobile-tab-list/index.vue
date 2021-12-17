<!-- 
   Mobile-tab-list
-->
<template>
    <div class="sg-page">
        <headerBar />
        <div class="page-main">
            <div class="table-wrap">
                <van-tabs v-model="actType" background="#E7EAF1" @click="onTabs" sticky :offset-top="offsetTop">
                    <van-tab :title="item.title" :name="item.name" v-for="(item, index) in tabList" :key="index">
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/header-bar'
export default {
    name: '',
    data() {
        return {
            actType: 'mining',
            tabList: [
                { title: 'tab1', name: 'mining' },
                { title: 'tab2', name: 'sell' },
            ],
            list: [],
            totalList: [],
            totalsData: {},
        }
    },
    computed: {
        offsetTop() {
            return 41
        },
    },
    components: { HeaderBar },
    created() {
        this.getData()
    },
    mounted() {},
    methods: {
        onTabs(name, title) {
            console.log('name :>> ', name)
            console.log('title :>> ', title)
        },

        getData() {
            console.log('暂时没有数据!')
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
