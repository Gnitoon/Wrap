<template>
	<div class="light">
		<div id="floatbox-container" v-show="floatbox.picker" >
			<div id="sort-box" class="card-top float-card" v-show="floatbox.picker">
				<div class="filter-header">
					<b>Date picker</b>
					<plus close="true" @click="floatbox.picker = !floatbox.picker"></plus>
					<br>
					<br>
					<br>
					<div class="picker-content">
						<label for="timepick">Date </label>
						<input
							type="datetime-local"
							class="inpt inpt-lighter"
							v-model="datepicker.date"
							id="timepick"
							placeholder="2020/08/20 15:20"
						>
						<button class="btn btn-cta" @click="setDate('picker')">pick</button>
					</div>
				</div>
			</div>
		</div>

		<headerbar/>
		<div id="gen-container">
			<router-link class="link link-blue" to="/">Back to Home</router-link>
			<br>
			<h2>Event JSON generator</h2>
			<a href="https://github.com/Matsukii/wrap20/tree/events" class="link link-blue">How to contribute</a>
			<br>
			<br>
			<i>Fields with * are required</i>
			<br>
			<br>
			<div class="gen-input-container">
				<label for="g-title" v-if="togen.title != ''">Event title *</label>
				<input
					type="text"
					id="g-title"
					class="inpt"
					v-model="togen.title"
					placeholder="event title *"
					required
				>
				

				<div id="g-date-container">

					<div>
						<label for="g-timestp">Date *</label><br>
						<input
							type="text"
							id="g-timestp"
							class="inpt"
							placeholder="timestamp"
							v-model="togen.date.from"
							v-tooltip="tooltip"
							
						> <br>
						<button class="btn" @click="setDate('now', 'from')">now</button>
						<button class="btn spaced-gbtn" @click="openDatePicker('from')">use date picker</button>
					</div>
					
					<div id="g-optional-date">
						<label for="g-date-to">End date</label><br>
						<input
							type="text"
							id="g-date-to"
							class="inpt"
							placeholder="timestamp"
							v-model="togen.date.to"
							v-tooltip="tooltip"
							
						> <br>
						<button class="btn" @click="setDate('now', 'to')">now</button>
						<button class="btn spaced-gbtn" @click="openDatePicker('to')">use date picker</button>
					</div>
					
				</div>
				<label for="g-monht">Month *</label>
				<input 
					type="text"
					id="g-month"
					v-model="togen.month"
					class="inpt"
					placeholder="january, february..."
					v-tooltip="{
						...tooltip,
						content:'The event month, used for faster search',
					}"
					required
				>

				<label for="g-local">Locale</label>
				<input 
					type="text"
					id="g-local"
					v-model="togen.local"
					class="inpt"
					placeholder="US, NY; Canada; World..."
					v-tooltip="{
						...tooltip,
						content:'Location of the event, optional',
					}"
				>

				<label for="g-tags">Tags</label>
				<input 
					type="text"
					id="g-tags"
					v-model="tags"
					class="inpt"
					:placeholder="togen.title + ', event x'"
					v-tooltip="{
						...tooltip,
						content:'tags, press enter to add and click on the tag below to remove',
					}"
					@keypress.enter="addTag"
				>
				<div class="tags-ships">
					<a v-for="(tag, i) in togen.tags" class="chip" @click="rtag(i)">{{tag}}</a>
				</div>
				<br>

				<label for="g-desc">Description</label>
				<div id="g-desc">

					<input 
						type="text"
						id="g-desc-short"
						class="inpt"
						placeholder="Short description *"
						v-model="togen.description.short"
						maxlength="100"
						v-tooltip="{
							...tooltip,
							content:'max of 100 characters, used on list row to give a quick preview',
						}"
					>
	
					<textarea name="" id="" cols="30" rows="10"
						type="text"
						id="g-desc-long"
						class="inpt"
						placeholder="A longer description with some details about the event"
						v-model="togen.description.long"
					
					></textarea>
				</div>
	
				<!-- <br>
				<button class="btn btn-cta" style="width: 200px; height: 30px;" @click="genstart">Gen</button> -->

				<br>

				<label for="generated">Generated JSON</label>
				<textarea name="" id="" cols="30" rows="10"
					type="text"
					id="generated"
					class="inpt"
					:value="generated"
				
				></textarea>
	
			</div>

		</div>
	</div>
</template>

<script>
	import headerbar from "@/components/header.vue"
	import Vue from 'vue'
	import VTooltip from 'v-tooltip'
	import plus from '@/components/plus.vue'
	import arrow from '@/components/arrow.vue'


	Vue.use(VTooltip)
	export default {
		name:"generator",
		components:{
			headerbar,
			plus,
			arrow,
		},
		data(){
			return {
				floatbox:{
					picker:false
				},
				datepicker:{
					date:'',
					target:''
				},

				tooltip:{
					content:'Timestamp is the count as millisseconds in Unix Epoch sine jan 01 1970, ex: 1597453200000; provide better flexibility to present data later, more at https://www.unixtimestamp.com/',
					classes:['tip'],
					offset:5,
					delay:{
						show:50,
						hide:50
					}
				},

				tags:'',
				links:'',
				images:'',

				togen:{
					title:'test',
					id:'',
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
					tags:[
						'test',
						'aaa'
					],
					links:[],
					images:[]
				}
			}
		},
		
		computed:{
			generated(){
				this.togen.id = `${this.togen.title}_${this.genId()}`
				return JSON.stringify(this.togen, null, 4)
			}
		},
		watch:{
			'togen.date.from'(val){
				if(this.val != ""){
					this.togen.month = new Date(val).toLocaleDateString('en', {month:'long'})

				}
			},
			'togen.description.long'(val){
				if(val.length > 100){
					this.togen.description.long.slice(0,100)
				}
			},
			// 'togen.title'(val){
			// 	togen.tags.push(val)
			// }
		},
		methods:{
			//genstart: function(){
			//	this.generated = JSON.stringify(this.togen,null,4)
			//},
			setDate(option, target = ''){
				if(option == 'now'){
					this.togen.date[target] = Date.now()
				}
				else if(option == 'picker' && this.datepicker.date != ""){
					this.togen.date[this.datepicker.target] = new Date(this.datepicker.date).getTime()
					this.floatbox.picker = false;
					this.datepicker = { target:'', date:'' }
				}
			},
			openDatePicker(target){
				this.datepicker.target = target;
				this.floatbox.picker = true
			},
			genId: function(){
				let rand = (Math.random()+1).toString(36).substr(7);
				if(rand.length >= 7 || rand.length <= 5){
					this.genId();
				}
				return rand;
			},

			addTag(){
				this.togen.tags.push(this.tags)
				this.tags = ''
			},
			rtag(index){
				this.togen.tags.splice(index, 1)
				// if(this.togen.tags.includes(tag)){
				// 	this.togen.tags.splice(this.togen.tags.lastIndexOf(tag), 1)
				// }
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
	
	#g-desc{
		display: flex;
		flex-direction: column;
	}

	
	#g-date-container {
		display: flex;
		flex-wrap: wrap;
		max-width: 500px;
	}
	#g-date-container div{
		margin: auto;
		margin-bottom: 20px;
	}
	#g-optional-date{
		margin-left: 20px;
	}

	#g-date-container .spaced-gbtn{
		margin-left: 15px;
	}
	.tooltip .tooltip-inner {
		box-shadow: 0px 2px 5px rgba(100, 80, 80, 0.5);
		max-width: 250px;
		color: #191919 !important;
		background-color: #FFF !important;
		padding: 8px 10px;
		border-radius: 5px;
	}



	.tags-ships{
		max-width: 500px;
		display: flex;
		flex-wrap: wrap;
	}
	
	.inpt-lighter{
		background-color: #FFFFFF;
	}
	.picker-content .btn{
		margin-top: 4px !important;
	}
</style>