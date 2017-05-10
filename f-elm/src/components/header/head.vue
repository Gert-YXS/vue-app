<template>
    <header id='head_top'>
        <slot name='logo'></slot>
        <slot name='search'></slot>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2" />
            </svg>
        </section>
        <router-link :to="userInfo? '/profile':'/login'" v-if='signinUp' class="head_login">
          
            <svg class="user_avatar" v-if="userInfo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
            </svg>
            <span class="login_span" v-else>登录|注册</span>
        </router-link>
    
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </section>
        <slot name="edit"></slot>
        <slot name="msite-title"></slot>
        <slot name="changecity"></slot>
        <slot name="changeLogin"></slot>
    </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
            // userInfo: ''
        }
    },
    mounted() {
        this.getUserInfo();
    },
    props: ['signinUp', 'headTitle', 'goBack'],
    computed: {
        // 1.原始的写法
        // count() {
        //     return this.$store.state.count
        // },

        // 2.当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。
        // 为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：
        //   mapState({
        //       // 箭头函数可使代码更简练
        //       count: state => state.count,

        //       // 传字符串参数 'count' 等同于 `state => state.count`
        //       countAlias: 'count',

        //       // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        //       countPlusLocalState (state) {
        //           return state.count + this.localCount
        //       }
        //   }) ,

        // 3. 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组
        //    mapState([
        //    //映射 this.count 为 store.state.count
        //    'count'
        //    ])

        //4. 使用对象展开运算符将此对象混入到外部对象中
        ...mapState([
            'userInfo'
        ]),
    },
    methods: {
        // Action 类似于 mutation，不同在于：
        //     Action 提交的是 mutation，而不是直接变更状态。
        //     Action 可以包含任意异步操作。

        // 1.原始的写法 this.$store.dispatch('xxx')
        ...mapActions([
            // 2.映射 this.getUserInfo() 为 this.$store.dispatch('getUserInfo')
            'getUserInfo'

        ]),
        // 3. // 映射 this.add() 为 this.$store.dispatch('increment')
        //  ...mapActions({
        //   add: 'increment' 
        // })
    },

}

</script>

<style lang="scss" scoped>
@import '../../style/mixin';
#head_top {
    background-color: $blue;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    @include wh(100%, 1.95rem);
}

.head_goback {
    left: 0.4rem;
    @include wh(0.6rem, 0.8rem);
    line-height: 2.2rem;
    margin-left: .4rem;
}

.head_login {
    right: 0.55rem;
    @include sc(0.65rem, #fff);
    @include ct;
    .login_span {
        color: #fff;
    }
    .user_avatar {
        fill: #fff;
        @include wh(.8rem, .8rem);
    }
}

.title_head {
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    .title_text {
        @include sc(0.8rem, #fff);
        text-align: center;
        font-weight: bold;
    }
}
</style>
