<template>
        			<div id="details-cont" class="card-top float-card" >

				<div class="filter-header">
					<a>Event details</a>
					<button class="btn dw-event" >
						<a :href="genDownloadableData(event)" :download="'wrap20-export_'+event.title" class="not-link">
							<img src="../assets/icons/download.svg" alt="download icon" class="down-icon ac-search-icons">
							Download JSON
						</a>
					</button>
					<plus close="true" @click="floatbox.details = !floatbox.details"></plus>
				</div>

				<div class="details-sub-cont">

					<h1>{{event.title}}</h1>

					<div class="dit-cont">
						<p class="dit-title">Date</p>
						<p>{{getFullDate(event.date.timestamp)}}</p>
						<p class="dit-desc">(from: {{event.date.from}} To: {{event.date.to}})</p>
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
    components:{
        plus
    },
    methods: {
        genDownloadableData:function(data){
            return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`
        },
        getFullDate: function(timestamp){
            return new Date(timestamp).toUTCString()
        },
    },
}
</script>

<style>
    
</style>