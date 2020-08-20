<template>
    <header>
        <div id="header">
            <tailedArrow
                @click="$emit('backAction')"
                class="back-btn"
                v-show="backBtn"
                rotation="180deg"
                v-tooltip="{...tooltip, content:'Back homepage'}"
            />
            <img v-show="logo" src="../assets/wrap20.svg" alt="website lettermark" class="lettermrk">
            
            <div v-show="contribute" id="contrib">
                <a href="https://github.com/matsukii/wrap20" class="link" target="blank">
                    <img src="../assets/icons/github.svg" class="git-icon" alt="Github icon">
                    Contribute
                </a>
            </div>
        </div>
    </header>
</template>

<script>
import tailedArrow from './tailed-arrow'
import Vue from 'vue'
import VTooltip from 'v-tooltip'


Vue.use(VTooltip)
export default {
    name:"headerbar",
    data(){
        return {
            tooltip:{
                content:'',
                classes:['tip'],
                offset:5,
                boundariesElement: 'body',
                placement:'top-end',
                delay:{
                    show:50,
                    hide:50
                }
            },
        }
    },
    components:{
        tailedArrow,
    },
    props:{
        backBtn:{
            backBtn: Boolean,
            default: false
        },
        logo:{
            logo: Boolean,
            default: true,
        },
        contribute:{
            contribute: Boolean,
            default: true
        }
    }
}
</script>


<style>
header{
    padding: 20px;
}

.git-icon{
    max-width: 25px;
    /* vertical-align: bottom; */
    margin-bottom: -5px;
}

.lettermrk{
    display: inline-block;
}


#contrib{
    width: fit-content;
    display: inline-block;
    float: right;
    margin-top: 3px;
    color: var(--text-dark);
}

.back-btn{
    transform: rotate(180deg);
    width: fit-content;
    height: fit-content;
    display: inline-block;
    vertical-align: top;
    margin-top: 5px;
    margin-right: 15px;
    cursor:pointer;
}
.back-btn .tailed-arrow{
    width: 25px;
    height: 25px;
}
.back-btn .tailed-arrow path{
    stroke-width: 40px;
}


</style>