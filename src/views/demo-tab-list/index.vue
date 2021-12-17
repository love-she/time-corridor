<!-- 
   demo-tab-list
-->
<template>
    <div class="myMachine">
        <headerBar />
        <div class="page-main">
            <div class="tableWrap">
                <van-tabs v-model="actType" background="#E7EAF1" @click="onTabs" sticky :offset-top="offsetTop">
                    <van-tab :title="item.title" :name="item.name" v-for="(item, index) in tabList" :key="index">
                        <van-list
                            class="officList"
                            v-model="isMoreLoading"
                            :finished="isMoreFinished"
                            :error.sync="isMoreError"
                            finished-text="没有更多了"
                            :immediate-check="false"
                            @load="getMoreData"
                            :offset="30"
                            v-if="actType === item.name && !isNoData"
                        >
                            <ul class="listBox">
                                <li class="item" v-for="(item, index) in list" :key="index">
                                    <div class="top fx-align-center">
                                        <span class="icon"></span>
                                        <span class="name">{{ item.name }}</span>
                                    </div>
                                    <div class="desc" v-if="actType === 'mining'">
                                        {{ item.totalPower }}份 {{ item.totalQuota }}T算力挖矿中
                                    </div>
                                    <div class="desc" v-else>{{ item.totalPower }}份出售中</div>
                                    <span class="btn fx-center" @click="onSell(item)">{{ btnTxt }}</span>
                                </li>
                            </ul>
                        </van-list>
                        <noData v-else />
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import headerBar from '@/components/header-bar'
import noData from '@/components/no-data/index'
import { getMyMachineList } from '@/api/index'
export default {
    name: '',
    data() {
        return {
            actType: 'mining',
            currActType: 'mining',
            pageNo: 0,
            pageSize: 4,
            isMoreLoading: false,
            isMoreFinished: false,
            isMoreError: false,
            isNoData: false,
            list: [],
            totalList: [],
            totalsData: {},
            tabList: [
                { title: 'tab1', name: 'mining' },
                { title: 'tab2', name: 'sell' },
            ],
        }
    },
    computed: {
        offsetTop() {
            return 41
        },
        btnTxt() {
            return this.actType === 'mining' ? '转售' : '取消出售'
        },
    },
    components: { headerBar, noData },
    created() {
        this.getData()
    },
    mounted() {},
    methods: {
        onTabs(name, title) {
            if (this.currActType === name) return
            this.currActType = name

            const list = this.totalsData[name]
            if (list) {
                this.list = list
                this.isNoData = this.list.length === 0
                return
            }
            //TODO:接口好了该代码就可以删除
            if (name === 'sell') {
                this.list = []
                this.isNoData = true
                return
            }
            this.pageNo = 0
            this.isMoreFinished = false
            this.list = []
            this.getData()
        },
        onSell(item) {
            if (this.actType === 'mining') {
                this.$router.push({ name: 'Sell', query: item })
                return
            }
            this.$dialog
                .confirm({
                    title: '确认取消出售?',
                    message: '取消出售后，T+1日获得收益',
                    beforeClose: (action, done) => {
                        if (action !== 'confirm') {
                            done()
                            return
                        }
                        this.handleCancelSell(item, done)
                    },
                })
                .then(() => {})
                .catch(() => {})
        },
        handleCancelSell(item, done) {
            setTimeout(() => {
                this.$toast('取消出售成功!')
                done()
            }, 1000)
        },
        getData() {
            console.log('暂时没有数据!')
            this.list = []
            this.isNoData = true
        },
        // getSellData(){},
        getMoreData() {
            // console.log('加载中...')
            this.isMoreLoading = true
            setTimeout(() => {
                this.isMoreLoading = false
                this.list = [...this.list, ...this.setData(this.totalList)]
                console.log('-list-', this.list)
                if (this.list.length >= this.totalList.length) {
                    // console.log('全部加载完成...')
                    this.isMoreFinished = true
                }
            }, 1000)
        },
        setData(list) {
            let scliceArr = []
            let start = this.pageNo * this.pageSize
            let end = (this.pageNo + 1) * this.pageSize
            scliceArr = list.slice(start, end)
            this.pageNo++
            return scliceArr
        },
        // setDataList(obj) {
        //   const result = []
        //   let len = Math.ceil(Math.random() * 20)
        //   for (let i = 0; i < len; i++) {
        //     result.push(obj)
        //   }
        //   return result
        // }
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/other/';
.myMachine {
    width: 100%;
    height: 100%;
    background: #f5f6f9;
    font-size: 16px;
    color: #222;

    .main {
        width: 100%;
        background-color: #f5f6f9;
        padding-bottom: 20px;
    }
}

.tableWrap {
    width: 100%;
    // padding: 18px 20px 0 20px;

    /deep/ .van-tabs {
        .van-sticky {
            background-color: #f5f6f9;
            padding: 18px 20px;
        }
        .van-tabs__wrap {
            height: 44px;
            border-radius: 24px;

            .van-tab--active {
                background: #fff;
                border-radius: 22px;
            }

            .van-tabs__line {
                display: none;
            }
        }
        .van-tabs__content {
            padding: 0 20px;
        }
    }
}

.listBox {
    width: 100%;

    .item {
        width: 100%;
        background: #fff;
        border-radius: 12px;
        padding: 24px 15px;
        margin-bottom: 16px;

        &:last-child {
            margin-bottom: 0;
        }

        .top {
            .icon {
                width: 44px;
                height: 44px;
                background: url('@{imgUrl}icon-sign.png') no-repeat center / cover;
            }
            .name {
                color: #222;
                font-weight: 600;
                margin-left: 8px;
            }
        }
        .desc {
            font-size: 18px;
            padding: 16px 0;
        }
        .btn {
            width: 100%;
            height: 44px;
            background: #e1eeff;
            color: #0069ff;
            font-weight: 600;
            text-align: center;
            border-radius: 22px;
        }
    }
}
</style>
