<template>
<li class="evt-list-item" @click="$emit('click')">
    <div>
        <p class="evti-text evtit-date" >{{getDate(item.date.timestamp)}}</p>
        <p class="evti-text evtit-title">{{item.title}}</p>
        <p class="evti-text evtit-desc" >{{item.description.short}}</p>
    </div>
</li>
</template>

<script>
export default {
    name:"listItem",
    props:{
        item:{
            item:Object,
            default:{
                date:{
                    timestamp:1597343578651
                },
                title:"default",
                description:{
                    short:"default"
                }
            }
        }
    },
    methods: {
        getDate: function(timestamp){
            return new Date(timestamp).toDateString().substr(4, 7)
        },
    },
}
</script>

<style>
    .evtit-date{
        text-transform: uppercase;
        font-size: 1.2rem;
        font-family: monospace;
        
    }
    .evtit-title{
        margin-left: 4vw;
        max-width: 130px;
        width: 150px;
    }
    .evtit-desc{
        margin-top: 5px;
        margin-left: 8vw;
        width: fit-content;
        max-width: -webkit-fill-available;
    }
</style>