<template>
	<div >

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

		<headerbar backBtn="true" @backAction="back"/>

		<div id="gen-container">
			<div class="g-head">
				<h2>Event add request</h2>
				<i>Fields with * are required</i>
				<br>
				<br>
				<a href="https://github.com/Matsukii/wrap20/tree/events" class="link link-blue">How to contribute</a>

			</div>
	



			<div class="gen-input-container">

				<!-- title -->
				<div class="inpt-cont">
					<label for="g-title" v-if="togen.title != ''">Event title *</label>
					<input
						type="text"
						id="g-title"
						class="inpt"
						v-model="togen.title"
						placeholder="event title *"
					>
				</div>
				
				<!-- Date from/to -->
				<div class="inpt-cont">
					<label for="g-datef" >Date * <a id="gdt-mode" class="link link-blue" @click="date.usePicker = !date.usePicker">{{usePickerText}}</a></label>
					<div class="gdin-sub-cont">
						<input
							:type="date.usePicker ? 'datetime-local' : 'text'"
							id="g-datef"
							class="inpt"
							placeholder="Year/Month/Day Hour:Min (24h) (or timestamp)"
							v-model="date.from"
							v-tooltip="{...tooltip, content:'Date in YYYY/MM/DD HH:MM or current timestamp'}"
						>
					</div>
				</div>

				<div class="inpt-cont">
					<label for="g-datef" >End date</label>
					<div class="gdin-sub-cont">
						<input
							:type="date.usePicker ? 'datetime-local' : 'text'"
							id="g-datef"
							class="inpt"
							placeholder="Year/Month/Day Hour:Min (24h) (or timestamp)"
							v-model="date.to"
							v-tooltip="{...tooltip, content:'Date in YYYY/MM/DD HH:MM or current timestamp'}"
						>
					</div>
				</div>



				<!-- Month -->
				<div class="inpt-cont">
					<label for="g-monht">Month *</label>
					<input 
						type="text"
						id="g-month"
						v-model="togen.month"
						class="inpt"
						placeholder="january, february..."
						v-tooltip="{
							...tooltip,
							content:'The event month, used for faster search, auto inserted with date',
						}"
					>	
				</div>

				<!-- Locale -->
				<div class="inpt-cont">
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
				</div>

				
				<div class="inpt-cont">
					<label for="g-tags">Tags</label>
					<div class="gdin-sub-cont">
						<input 
							type="text"
							id="g-tags"
							v-model="targets.tags"
							class="inpt"
							:placeholder="togen.title + ', event x'"
							v-tooltip="{
								...tooltip,
								content:'tags, press enter to add and click on the tag below to remove',
							}"
							@keypress.enter="addItem('tags')"
						> <button @click="addItem('tags')" class="btn add-btn"><plus/></button>
					</div>
					


					<div class="tags-ships">
						<a
							v-for="(tag, i) in togen.tags"
							class="chip"
							@click="ritem('tags', i)"
							v-tooltip="{...tooltip, content:'click to remove this tag'}"
						>{{tag}}</a>
					</div>
				</div>

				



				<label for="g-links">Links</label>
				<input 
					type="text"
					id="g-links"
					v-model="targets.links.title"
					class="inpt"
					placeholder="Tile"
					v-tooltip="{
						...tooltip,
						content:'Link title',
					}"
				>
				<input 
					type="text"
					id="g-links"
					v-model="targets.links.url"
					class="inpt"
					placeholder="Url"
					v-tooltip="{
						...tooltip,
						content:'Link url',
					}"
					@keypress.enter="addItem('links')"
				>
				<div class="tags-ships">
					<a
						v-for="(tag, i) in togen.links"
						class="chip link"
						@click="ritem('links', i)"
						v-tooltip="{...tooltip, content:tag.url+'click to remove this item, shift+click to open link'}"
						target="blank"
					>{{tag.title}}</a>
				</div>
				<br>



				<div class="add-btn">
					<button class="btn ">({{togen.links.length}}) Links  <plus/></button>
					<button class="btn ">({{togen.images.length}}) Images <plus/></button>
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
	import Vue from 'vue'
	import VTooltip from 'v-tooltip'
	
	import headerbar from "@/components/header.vue"
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
				date:{
					from:'',
					to:'',
					usePicker:true
				},

				floatbox:{
					picker:false
				},
				datepicker:{
					date:'',
					target:''
				},
				targets:{
					tags:'',
					links:{ title:'', url:'' },
					images:{ title:'', url:'' },
				},

				tooltip:{
					content:'Timestamp is the count as millisseconds in Unix Epoch sine jan 01 1970, ex: 1597453200000; provide better flexibility to present data later, more at https://www.unixtimestamp.com/',
					classes:['tip'],
					offset:5,
					boundariesElement: 'body',
					placement:'top-end',
					delay:{
						show:50,
						hide:50
					}
				},

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
			},
			usePickerText(){
				return this.date.usePicker ? 'use timestamp' : 'use datepicker'
			},
			dateChange(){
				return this.date
			}
		},
		watch:{
			'togen.date.from'(val){
				if(this.val != ""){
					this.togen.month = new Date(val).toLocaleDateString('en', {month:'long'})

				}
			},
			'togen.description.short'(val){
				if(val.length > 100){
					this.togen.description.short.slice(0,100)
				}
			},
			'date.from'(val){
				this.dateTogen('from', `${val}`)
			},
			'date.to'(val){
				this.dateTogen('to', `${val}`)
			}
		},
		methods:{
			back(){ history.back() },
			dateTogen(target, time){
				if(time.isNumber()){
					this.togen.date[target] = parseInt(time)
				}
				else {
					this.togen.date[target] = new Date(time).getTime()
				}
			},
			/**
			 * @description convert and set/set date with timestamp
			 * @param {String} option corrent date (now) or from date picker
			 * @param {String} target item to set the date (timestamp, from, to...)
			 */
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
					return this.genId();
				}
				return rand;
			},

			/**
			* @description add item to target array (tags, links or images)
			* @param {String} target targeted property to push item
			* 
			*/
			addItem(target){
				this.togen[target].push(this.targets[target])
				this.targets[target] = typeof this.targets[target] == "object" ? {title: '', url:''} : ''
			},


			/**
			* @description reove item from target array (tags, links or images)
			* @param {String} target targeted property to remove item
			* @param {Number} index item index to remove
			* 
			*/
			ritem(target, index){
				this.togen[target].splice(index, 1)
			}
		}
	}
</script>

<style >

	.g-head{
		max-width: 500px;
		margin-bottom: 30px;
	}
	.g-head h2{
		margin-bottom: 5px;
	}

	#gen-container{
		padding: 10px;
		padding-left: 20px;
	}
	
	.gen-input-container{
		display: flex;
		flex-direction: column;
	}

	.inpt-cont{
		max-width: 500px;
		display: flex;
		flex-direction: column;
	}
	.gdin-sub-cont{
		display: flex;
		margin-bottom: 15px;
	}
	.gdin-sub-cont .inpt{
		margin-bottom: 0;
		width: 100%;

	}
	.gdin-sub-cont .btn{
		margin-left: 10px;
	}


	#gdt-mode{
		float: right;
		
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