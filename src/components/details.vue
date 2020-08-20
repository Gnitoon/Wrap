<template>
    <div id="details-cont" class="card-top float-card" >

    <div class="filter-header">
        <a>Event details</a>
        <button class="btn dw-event" >
            <a :href="genDownloadableData(event)" :download="'wrap20-export_'+event.title+'.json'" class="not-link">
                <img src="../assets/icons/download.svg" alt="download icon" class="down-icon ac-search-icons">
                Download JSON
            </a>
        </button>
        <plus close="true" @click="closeDetails"></plus>
    </div>

    <div class="details-sub-cont">

        <h1>{{event.title}}</h1>

        
        <div class="dit-cont">
            <p class="dit-request">Requested by {{event.creator}}</p>
        </div>

        <div class="dit-cont">
            <p class="dit-title">Date</p>
            <p>{{getFullDate(event.date.from)}}</p>
            
            <!-- change to work with timestamp -->
            <p class="dit-desc">(from: {{getFullDate(event.date.from)}} To: {{getFullDate(event.date.to)}})</p>
        </div>


        <div class="dit-cont">
            <p class="dit-title">Description</p>
            <p>{{event.description.long}}</p>
        </div>

        <div class="dit-cont">
            <p class="dit-title">Tags</p>
            <p>{{event.tags.toString()}}</p>
        </div>
        
        <div class="dit-cont">
            <p class="dit-title">Links</p>
            <ul>
                <li v-for="lk in event.links"><a class="link link-blue" :href="lk.url" target="blank">{{lk.title}}</a></li>
            </ul>
        </div>

        <div class="dit-cont">
            <p class="dit-title">Images</p>
            <ul>
                <li v-for="im in event.images"><a class="link link-blue" :href="im.url" target="blank">{{im.title}}</a></li>
            </ul>
        </div>


    </div>

</div>

</template>


<script>
import plus from '../components/plus'
export default {
    name: "detailsbox",
    props:{
        event:{
            event:Object,
            default:{
                id:"default",
                month:"non",
                title:"default",
                local:"NO",
                date:{
                    from:"",
                    to:"",
                    timestamp:1597249184536
                },
                description:{
                    short:"default",
                    long:"default"
                },
                tags:[
                    "none"
                ],
                links:[
                    {
                        url:"example.com",
                        title:"example"
                    }
                ],
                images:[
                    {
                        url:"example.com",
                        title:"example"
                    }
                ],
            }
        },
        floatbox:{
            floatbox:Object,
            default:{
                details: true
            }
        }
    },
    created(){
        history.pushState('', this.event.title, `/${this.event.id}`);
    },
    mounted(){
        
        window.addEventListener('popstate', this.closeDetails, false)
    },
    beforeDestroy(){
        window.removeEventListener('popstate', this.closeDetails)
        if(window.location.pathname != "/"){
            history.back()
        }
        //console.log("bye");
    },
    components:{
        plus
    },
    methods: {
        genDownloadableData:function(data){
            return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`
        },
        getFullDate: function(timestamp){
            let d = new Date(timestamp).toUTCString()
            return d == 'Invalid Date' ? 'unknown' : d
        },
        closeDetails:function(){
            console.log("closing");
            this.floatbox.details = false;
            //if(window.location.pathname != "/"){
            //    history.back()
            //}
        }
    },
}
</script>

<style>
    #details-cont{
        /* width: 83%;
        margin-top: 70px;
        height: 78%;
        position: fixed; */
        
        width: 100%;
        max-height: 700px;
        height: 95%;
    }
    
    #details-cont .plus{
        max-width:  25px;
        max-height: 25px;
    }
    #details-cont .filter-header{
        display: block;
        width: 100%;
    }
    #details-cont .filter-header b{
        margin: auto 0;
        position: absolute;
        font-size: 110%;
    }
    #details-cont .filter-header .plusIcon-cont{
        display: block;
        cursor: pointer;
        float: right;
    }

    .details-sub-cont{
        overflow: auto;
        margin-top: 10px;
        scrollbar-width: thin;

        max-height: calc(100% - 20px);
    }

    .details-sub-cont .dit-cont p{
        margin: 5px 0;
    }
    .details-sub-cont .dit-cont .dit-title{
        color: var(--text-light);
    }
    .details-sub-cont .dit-cont .dit-desc{
        font-size: 90%;
        color: var(--text-light);
    }
    .details-sub-cont .dit-cont{
        margin: 20px 0;
    }
    .details-sub-cont .dit-cont ul{
        list-style: none;
        padding: 0;
        margin-top: 7px;
    }
    .details-sub-cont .dit-cont li{

    }

    .dw-event{
        padding: 8px 13px;
        font-size: 85%;
        background-color: var(--bg-light);
        margin-bottom: -15px;
        margin-left: 5vw;
        font-size: 85%;
    }
    .dw-event .down-icon{
        height: 14px;
    }
</style>