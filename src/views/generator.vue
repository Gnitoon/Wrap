<template>
	<div class="light">

		<headerbar/>
		<div id="gen-container">
			<h2>Event JSON generator</h2>
			<a href="https://github.com/Matsukii/wrap20/tree/events" class="link link-blue">How to contribute</a>
			<br>
			<br>
			<div class="gen-input-container">
				<label for="g-title">Event title </label>
				<input
					type="text"
					id="g-title"
					class="inpt"
					v-model="togen.title"
					placeholder="event title"
					required
				>
				
				<label for="g-timestp">Timestamp</label>
				<input
					type="text"
					id="g-timestp"
					class="inpt"
					placeholder="event title"
					v-model="togen.date.timestamp"
					
				>
				
				<label for="g-monht">Month</label>
				<input 
					type="text"
					id="g-month"
					v-model="togen.month"
					class="inpt"
					placeholder="january, february..."
					v-tooltip="{
						content:'The event month, used for faster search',
						classes:['tip'],
						offset:5,
						delay:{
							show:50,
							hide:50
						}
					}"
					required
				>
				
				<label for="g-id">id suggestion</label>
				<input 
					type="text"
					v-model="togen.id"
					id="g-id"
					class="inpt"
					placeholder="event-agh4k65, evt-name_aug06"
					v-tooltip="{
						content:'(optional) A unique/random id for the event',
						classes:['tip'],
						offset:5,
						delay:{
							show:50,
							hide:50
						}
					}"
				>

				<label for="g-desc-short">Short description</label>
				<input 
					type="text"
					id="g-desc-short"
					class="inpt"
					placeholder="Event related to due something"
					v-model="togen.description.short"
				>

				<label for="g-desc-long">Long description</label>
				<textarea name="" id="" cols="30" rows="10"
					type="text"
					id="g-desc-long"
					class="inpt"
					placeholder="A longer description about the event"
					v-model="togen.description.long"
				
				></textarea>
	
				<br>
				<button class="btn btn-cta" style="width: 200px; height: 30px;" @click="genstart">Gen</button>

				<br>

				<label for="generated">Generated JSON</label>
				<textarea name="" id="" cols="30" rows="10"
					type="text"
					id="generated"
					class="inpt"
					v-model="generated"
				
				></textarea>
	
			</div>

		</div>
	</div>
</template>

<script>
	import headerbar from "@/components/header.vue"
	import Vue from 'vue'
	import VTooltip from 'v-tooltip'

	Vue.use(VTooltip)
	export default {
		name:"generator",
		components:{
			headerbar
		},
		data(){
			return {
				tags:'',
				links:'',
				images:'',
				generated:'',

				togen:{
					title:'',
					month:'',
					local:'',
					date:{
						from:'',
						to:'',
						timestamp:''
					},
					description:{
						short:'',
						long:''
					},
					tags:[],
					links:[],
					images:[]
				}
			}
		},
		methods:{
			genstart: function(){
				this.generated = JSON.stringify(this.togen,null,4)
			}
		}
	}
</script>

<style >
	#gen-container{
		padding: 10px;
		padding-left: 20px;
	}
	
	.gen-input-container{
		display: flex;
		flex-direction: column;
	}
	.gen-input-container input{
		max-width: 500px;
		margin-bottom: 15px;
	}
	.gen-input-container textarea{
		max-width: 500px;
		margin-bottom: 15px;
	}
	.gen-input-container label{
		max-width: 500px;
		padding-left: 2px;
		margin-bottom: 5px;
	}
	
	
	
	.tooltip .tooltip-inner {
		box-shadow: 0px 2px 5px rgba(100, 80, 80, 0.5);
		max-width: 250px;
		color: #191919 !important;
		background-color: #FFF !important;
		padding: 8px 10px;
		border-radius: 5px;
	}
</style>