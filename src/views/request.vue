<template>
	<div>

		<div id="floatbox-container" v-show="floatbox.editing || floatbox.warning" >
			<div id="sort-box" class="card-top float-card" v-show="floatbox.editing">
				<div class="filter-header">
					<b>Restore previous session?</b>
					<plus close="true" @click="floatbox.editing = !floatbox.editing"></plus>
					<br>
					<br>
					<br>
					<div class="picker-content">
						<p>
							There are events saved on your browser from last session to prevent data loss. Recover?
						</p>
						<p><i>it will be at event list after description, click on the item to edit</i></p>
						<button class="btn btn-cta" @click="ediit('recover')">Recover</button>
						<button class="btn" @click="ediit('ignore')">Ignore</button>
					</div>
				</div>
			</div>
			<div id="sort-box" class="card-top float-card" v-show="floatbox.warning">
				<div class="filter-header">
					<b>{{warn.title}}</b>
					<plus close="true" @click="floatbox.warning = !floatbox.warning"></plus>
					<br>
					<br>
					<br>
					<div class="picker-content">
						<p>
							{{warn.body}}
						</p>
						<p><i> {{warn.sub}} </i></p>
						<button class="btn btn-cta" @click="warnAction(warn.btnProcedAction)">{{warn.btnProceed}}</button>
						<button class="btn" @click="warnAction(warn.btnCalcelAction)">{{warn.btnCancel}}</button>
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
				<a target="blank" href="https://github.com/Matsukii/wrap20/tree/events" class="link link-blue">How to contribute</a>
				<br>
				<a target="blank" href="https://forms.gle/JDjMavk3hNTQ23aJ7" class="link link-blue">Send from Google forms</a>

			</div>
	

			<div class="gen-input-container" id="gic">

				<!-- title -->
				<div class="inpt-cont">
					<label for="g-title" v-if="togen.title != ''">Event title *</label>
					<input
						type="text"
						id="g-title"
						class="inpt clearable"
						v-model="togen.title"
						placeholder="event title *"
					>
				</div>
				
				<!-- creator -->
				<div class="inpt-cont">
					<label for="g-creator" v-if="togen.creator != ''">Your name</label>
					<input
						type="text"
						id="g-creator"
						class="inpt clearable"
						v-model="togen.creator"
						placeholder="Your name"
					>
				</div>
				
				<!-- Date from/to -->
				<div class="inpt-cont">
					<label for="g-datef" >Date * <a id="gdt-mode" class="link link-blue" @click="date.usePicker = !date.usePicker">{{usePickerText}}</a></label>
					<div class="gdin-sub-cont">
						<input
							:type="date.usePicker ? 'datetime-local' : 'text'"
							id="g-datef"
							class="inpt clearable"
							placeholder="Year/Month/Day Hour:Min (24h) (or timestamp)"
							v-model="date.from"
							v-tooltip="{...tooltip, content:'Date in YYYY/MM/DD HH:MM or current timestamp'}"
						>
					</div>
				</div>

				<div class="inpt-cont">
					<label for="g-datet" >End date</label>
					<div class="gdin-sub-cont">
						<input
							:type="date.usePicker ? 'datetime-local' : 'text'"
							id="g-datet"
							class="inpt clearable"
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
						class="inpt clearable"
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
						class="inpt clearable"
						placeholder="US, NY; Canada; World..."
						v-tooltip="{
							...tooltip,
							content:'Location of the event, optional',
						}"
					>
				</div>

				<!-- tags -->
				<div class="inpt-cont">
					<label for="g-tags">Tags</label>
					<div class="gdin-sub-cont">
						<input 
							type="text"
							id="g-tags"
							v-model="targets.tags"
							class="inpt clearable"
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
						>{{tag}} <plus close="true"/> </a>
					</div>
				</div>

				<!-- links -->
				<div class="inpt-cont">
					<label for="g-links">Links</label>
					<div class="glin-sub-cont">
						<input 
							type="text"
							id="g-links"
							v-model="targets.links.title"
							class="inpt clearable"
							placeholder="Title"
							v-tooltip="{
								...tooltip,
								content:'Link title',
							}"
						>
						
						<input 
							type="text"
							id="g-links2"
							v-model="targets.links.url"
							class="inpt clearable"
							placeholder="URL: https://example.com"
							v-tooltip="{
								...tooltip,
								content:'Link URL \n https://example.com',
							}"
							@keypress.enter="addItem('links')"
						>
						<button @click="addItem('links')" class="btn add-btn"><plus/></button>
						
					</div>

					<linkList :items="togen.links" @ritem="ritem" dataName="links"></linkList>
				</div>


				<!-- images -->
				<div class="inpt-cont">
					<label for="g-images">Images</label>
					<div class="glin-sub-cont">
						<input 
							type="text"
							id="g-images"
							v-model="targets.images.title"
							class="inpt clearable"
							placeholder="Image title"
							v-tooltip="{
								...tooltip,
								content:'Image title (also used as alternative if image isn`t founf',
							}"
						>
						
						<input 
							type="text"
							id="g-images2"
							v-model="targets.images.url"
							class="inpt clearable"
							placeholder="URL: https://example.com/image.png"
							v-tooltip="{
								...tooltip,
								content:'Image URL \n https://example.com/image.png',
							}"
							@keypress.enter="addItem('images')"
						>
						<button @click="addItem('images')" class="btn add-btn"><plus/></button>
						
					</div>

					<linkList :items="togen.images" @ritem="ritem" dataName="images"></linkList>
				</div>

				<!-- description -->
				<div class="inpt-cont">
	
					<label for="g-desc">Description</label>
					<div id="g-desc">
	
						<input 
							type="text"
							id="g-desc-short"
							class="inpt clearable"
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
							class="inpt clearable"
							placeholder="A longer description with some details about the event"
							v-model="togen.description.long"
						
						></textarea>
					</div>

				</div>

				<div class="inpt-cont">
					<div class="linkList-cont">
						<ul class="ll-sub-cont">
							<li class="ll-item"
								v-for="(evt, i) in generation"
								:key="i"
							>
								{{evt.title || "hi"}}
								<button class="btn dw-event" @click="ediit('edit', i)">edit</button>
								<plus 
									close="true"
									@click="ritem('events', i)"
									v-tooltip="{...tooltip, content: 'click to remove this event'}"
								/>
							</li>
						</ul>
					</div>
					<div class="addEvt-btn-cont">
						<button 
							class="btn" 
							@click="addEvent" 
							v-tooltip="{...tooltip, content:'Add a new event'}"
						><plus/> Add a event</button>

					</div>
				
				</div>

				<br>
				<br>
				<br>


				<!-- generated -->
				<div class="inpt-cont">

					<button class="btn dw-event" >
						<a :href="genDownloadableData()" :download="'wrap20-export_'+togen.title+'.json'" class="not-link">
							<img src="../assets/icons/download.svg" alt="download icon" class="down-icon ac-search-icons">
							Download JSON
						</a>
					</button>

					<label for="generated">Generated JSON 
						<a style="float: right;" class="link-blue" @click="json2clip">{{copied}}</a>
					</label>
					<textarea cols="30" rows="21"
						type="text"
						id="generated"
						class="inpt"
						:value="generated"
					
					></textarea>

				</div>

				<div class="inpt-cont">
					<h2>What's the next step?</h2>
					<p>Open an issue or create pull request on <a href="https://github.com/matsukii/wrap20/tree/events" class="link link-blue">Github at events branch</a> including the generated JSON</p>
					<p> <i>[Available soon] directly add to list</i> </p>
				</div>
	
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
	import linkList from '@/components/linkList.vue'


	Vue.use(VTooltip)
	export default {
		name:"request",
		components:{
			headerbar,
			plus,
			arrow,
			linkList
		},
		data(){
			return {
				copied:'Copy to clipboard',
				date:{
					from:'',
					to:'',
					usePicker:true
				},
				warn:{
					title:'Warning',
					body:'Current editing data will be overwrited',
					sub:"Don't worry, it should be already saved :)" ,
					btnCancel:'Cancel',
					btnProceed:'Proceed',
					btnCalcelAction:'cancel',
					btnProcedAction:'overwrite'

				},

				floatbox:{
					editing:false,
					warning: false
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

				generation:[

				],

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

				editing:[],
				editingIndex: 0,
				blank:'',
				temp:'',
				timeout: '',

				togen:{
					title:'',
					creator:'',
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
					tags:[],
					links:[],
					images:[]
				}
			}
		},
		created() {
			this.togen.date.timestamp = Date.now();
			this.blank = JSON.stringify(this.togen);
			if(typeof localStorage.editing !== "undefined" && localStorage.editing != ""){
				this.editing = JSON.parse(localStorage.editing)
				this.floatbox.editing = true;
			}
		},
		computed:{
			generated(){
				this.togen.id = `${this.togen.title}_${this.genId()}`
				if(this.generation.length > 0){
					if(this.timeout) clearTimeout(this.timeout)
					this.timeout = setTimeout(()=>{
						localStorage.editing = JSON.stringify(this.generation)
					})
					return JSON.stringify(this.generation, null, 4)
				}
				else{
					return JSON.stringify([this.togen], null, 4)
				}
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
			},
		},
		methods:{
			back(){ history.back() },

			warnAction(action){
				if(action == "cancel"){
					this.floatbox.warning = false;
				}
				else if(action == "overwrite"){
					this.togen = this.temp
					this.floatbox.warning = false;
				}
			},

			// recover floatbox actions
			ediit(action, selected = null){
				if(action == "recover"){
					this.generation = this.editing;
					this.floatbox.editing = false;
				}
				else if(action == "ignore"){
					localStorage.editing = "";
					this.floatbox = false;
				}
				else if(action == "edit" && selected != null){
					this.temp = this.generation[selected];
					this.floatbox.warning = true
					localStorage.editing = JSON.stringify(this.generation)
				}
			},

 			genDownloadableData:function(){
				return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(JSON.parse(this.generated)))}`
			},
			/**
			 * @description parse input date as timestamp for datepicker and text inputs
			 * @param {String} target where put parsed to timestamp date
			 * @param {String} time   date to parse as timestamp
			 *
			 */
			dateTogen(target, time){
				if(time.isNumber()){
					this.togen.date[target] = parseInt(time)
				}
				else {
					this.togen.date[target] = new Date(time).getTime()
				}
			},

			/**
			 * @description copy generated data to clipboard
			 *
			 *
			 */
			json2clip(){
				if(this.togen.creator == ""){
					this.togen.creator = "Anon"
				}
				document.getElementById('generated').select();
				document.execCommand('copy')
				this.copied = "Copied"
				setTimeout(()=>{
					this.copied = "Copy  to clipboard"
					console.log("rem");
				}, 5000)
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

			addEvent(){
				this.generation.push(this.togen)
				this.togen = JSON.parse(this.blank)
				localStorage.editing = JSON.stringify(this.generation)
			},

			/**
			* @description add item to target array (tags, links or images)
			* @param {String} target targeted property to push item
			* 
			*/
			addItem(target){
				if(typeof this.targets[target] === "string" && this.targets[target] == "") return
				if(/links|images/gi.test(target)){
					let{url, title} = this.targets[target];
					if(url == "") return
					if(!(/http|https/gi.test(url))){
						this.targets[target].url = `https://${url}`
					}
					
					if(title == ""){
						try{
							let t = new URL(url)
							this.targets[target].title = `${t.host}${t.pathname}`;
						}catch(e){
							this.targets[target].title = url
						}

					}
					
				}

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
				if(target !== "events"){
					this.togen[target].splice(index, 1)
				}
				else if(target === "events"){
					// to make sure its right lol
					if(!confirm("Remove this item?")) return
					this.generation.splice(index, 1)
				}
			}
		}
	}
</script>

<style >
	.soft-anim{
		transition: all 80ms ease-in-out;
	}

	.inpt-cont{
		max-width: 500px;
		display: flex;
		flex-direction: column;
	}

	.g-head{
		max-width: 500px;
		margin-bottom: 30px;
	}

	@media only screen and (min-width: 540px) {
		.inpt-cont{
			min-width: 500px;
			max-width: 500px;
			margin: auto;
			display: flex;
			flex-direction: column;
		}
	
		.g-head{
			max-width: 500px;
			margin: auto;
			margin-bottom: 30px;
		}	
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


	.gdin-sub-cont, .glin-sub-cont{
		display: flex;
		margin-bottom: 15px;
	}
	.gdin-sub-cont .inpt, .glin-sub-cont .inpt{
		margin-bottom: 0;
		width: 100%;
	}
	.gdin-sub-cont .btn, .glin-sub-cont .btn{
		margin-left: 10px;
	}

	#g-links2, #g-images2{
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

	/* tag chips */
	@media all{
		.tags-ships{
			max-width: 500px;
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 15px;
		}
		.tags-ships .chip{
			padding-right: 10px;
			margin-left: 5px;
		}
		.tags-ships .plusIcon-cont{
			display: inline;
			width: fit-content;
			height: fit-content;
			cursor: pointer;
		}
		.tags-ships .plus{
			width:  12px;
			margin: auto;
			height: 12px;
		}

	}


	.addEvt-btn-cont{
	}
	.addEvt-btn-cont .btn{
		float: right;

	}
	.addEvt-btn-cont .plusIcon-cont{
		width: fit-content;
		display: inline;
		vertical-align: middle;
		margin-right: 5px;
	}
	.addEvt-btn-cont .plus{
		width: 15px;
		height:15px;
		z-index: 1;
	}

	
	.picker-content .btn{
		margin-top: 4px !important;
	}

	/* download btn/icon */
	.dw-event{
		padding: 8px 13px;
		font-size: 85%;
		background-color: var(--bg-light);
		margin:auto;
		font-size: 85%;
	}
	.dw-event .down-icon{
		height: 14px;
	}



</style>