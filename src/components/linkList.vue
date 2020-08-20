<template>
    <div class="linkList-cont">
        <ul class="ll-sub-cont">
            <li v-for="(item, i) in items" class="ll-item" >
                <!-- <b>#{{i}}</b> -->
                <a class="lli-title">{{item.title}}</a>
                <a class="lli-url link link-blue" target="blank" :href="item.url">{{item.url}}</a>
                
                <plus 
                    close="true" 
                    @click="$emit('ritem', dataName, i)"
                    v-tooltip="{...tooltip, content: 'click to remove this item'}"
                    />
            </li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue'
import VTooltip from 'v-tooltip'
import plus from '@/components/plus.vue'


Vue.use(VTooltip)

export default {
    name:"link-list",
    components:{
        plus
    },
    props:{
        items:{
            items:Object
        },
        dataName:{
            dataName:String,
            default:'none'
        }
    },
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
    methods: {
        
    },
}
</script>

<style>
.linkList-cont{
    
}
.linkList-cont .ll-sub-cont{
    list-style: none;
    padding: 4px 0px;
    margin: 0;
}
.linkList-cont .ll-item{
    background: var(--bg-top);
    padding: 10px;
    max-width: 100%;
    margin: 5px 0;
    cursor: pointer;
}
.linkList-cont .ll-item .plusIcon-cont{
    width:  fit-content;
    height: fit-content;
    display: inline-block;
    float: right;
    margin-top: 4px;
}
.linkList-cont .ll-item .plus{
    width: 15px;
    height: 15px;
}
.ll-item:nth-child(even){
    background-color: var(--bg-top-darker);
}

.ll-item:hover{
    background-color: var(--bg-light);
}

.ll-item .lli-title{
    display: inline-block;
    max-width: 14vw;
    min-width: 14vw;
    margin-right: 15px;
    overflow: hidden;
}
.ll-item .lli-url{
    overflow: hidden;
    display: inline-block;
    max-width: -webkit-fill-available;
}
</style>