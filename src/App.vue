<template>
	<div id="app" class="light" >

		<!-- details and filter container -->
		<div id="floatbox-container" v-show="floatbox.filter || floatbox.details" >
			<div id="sort-box" class="card-top float-card" v-show="floatbox.filter">
				<div class="filter-header">
					<b>Filters</b>
					<plus close="true" @click="floatbox.filter = !floatbox.filter"></plus>
				</div>
				<div id="filter-items-cont">
					<label for="fi-month">months separated by ' , '</label>
					<input type="text" placeholder="jan, feb, mar..." v-model="filters.moth" class="inpt">
					
					<label for="fi-month">tags separated by ' , '</label>
					<input type="text" placeholder="tag1, tag2..." v-model="filters.tags" class="inpt">
				</div>
				<button class="btn btn-cta" @click="applyFilters">Apply</button>
			</div>


			<detailbox v-if="floatbox.details" :floatbox="floatbox" :event="event"></detailbox>

		</div>

		<header>
			<div id="header">
				<img src="./assets/wrap20.svg" alt="site lettermark" class="lettermrk">
				
				<div id="contrib">
					<a href="https://github.com/matsukii/wrap20" class="link" target="blank">
						<img src="./assets/icons/github.svg" class="git-icon" alt="Github icon">
						Contribute
					</a>
				</div>
			</div>
		</header>


		<div class="site-desc">
			<h2>A simple list of things that happended this year</h2>
			<p>You can contribute to make it more complete in github!</p>
		</div>


		<div id="actions-container">
			<label for="ac-search">
				<img src="./assets/icons/search.svg" class="ac-search-icons" alt="search input icon">
			</label>
			<input type="text" id="ac-search" class="inpt" v-model="search" placeholder="Search">

			<button
				class="btn ac-sort"
				@click="floatbox.filter = !floatbox.filter"
			>
				<img src="./assets/icons/sort.svg" alt="sort icon" id="sort-icon" class="ac-search-icons">
				Filter...
			</button>
			
			<button class="btn ac-sort" >
				<a :href="dataToSave.context" :download="dataToSave.name" class="not-link">
					<img src="./assets/icons/download.svg" alt="download icon" class="down-icon ac-search-icons">
					Download JSON
				</a>
			</button>

		</div>

		<div id="main-list-container">
			<ul  class="event-list">
				
				<li class="evt-list-item">
					<div>
						<p class="evti-text evtlh-date">Date</p>
						<p class="evti-text evtlh-title">Title</p>
						<p class="evti-text evtlh-desc">Short desccription</p>
					</div>
				</li>
				<li
					v-for="(item, i) in events"
					@click="openDetails(item.id)"
					class="evt-list-item"
					v-bind:key="item.id" v-show="loaded"
				>
					<div >
						<p class="evti-text evtit-date" >{{getDate(item.date.timestamp)}}</p>
						<p class="evti-text evtit-title">{{item.title}}</p>
						<p class="evti-text evtit-desc" >{{item.description.short}}</p>
					</div>
				</li>
				
			</ul>

			<div id="evtl-spinner-container" v-show="!loaded">
				<spinner id="evt-spinner"></spinner>
			</div>

		</div>




	</div>
</template>

<script>
	import simplebar from 'simplebar-vue'

	import spinner from "./components/spinner.vue"
	import detailbox from "./components/details.vue"
	// "schrodinger's" icon: plus or X until you set a prop, ~ocoursenot 
	import plus from "./components/plus.vue"

	export default {
		components:{
			plus,
			spinner,
			detailbox,
			simplebar,
		},
		data(){
			return {
				data:[],
				loaded:false,
				search:'',
				timeout:'',
				events:[],
				event:{},
				filters:{
					moth:'',
					tags:'',
					items:[]
				},
				floatbox:{
					filter: false,
					details: false,
				},
				dataToSave: {
					default: '/data/data.json',
					context: '/data/data.json',
					name:'wrap2-export-all.json'
				}
			}
		},
		created(){

			// get events data [another super useful comment \o/]
			fetch('/data/data.json').then(dat => dat.json()).then(res => {
				this.data = res;
				this.loaded = true
				this.events = res.events
			})

			

		},
		watch:{
			'floatbox.details'(val){
				// to remove body scrollbar while details card is open 
				if(val){
					document.body.style.overflow = 'hidden'
				}
				else{
					document.body.style.overflow = ''

				}
			},
			search(val){
				if(val){
					if(this.filters.items.length > 0) this.events = this.data.events;

					val = val.toLowerCase();

					if(this.timeout) clearTimeout(this.timeout);
					this.timeout = setTimeout(() => {
						let filtered = this.data.events.filter(el => {

							if(JSON.stringify(el).toLowerCase().search(val) != -1){
								return el
							}
							else if(`${new Date(el.date.timestamp)}`.toLowerCase().search(val) != -1){
								return el
							}

						})
						this.events = filtered
						this.perpareDownload('wrap20-search.json', filtered)
						//console.log(filtered);
					}, 700)


				}
				else{
					this.events = this.data.events;
					this.perpareDownload(false, "")
				}
			}
		},
		methods:{
			getDate: function(timestamp){
				return new Date(timestamp).toDateString().substr(4, 7)
			},
			getFullDate: function(timestamp){
				return new Date(timestamp).toUTCString()
			},
			openDetails: function(id){
				this.event = this.events.find(el => el.id == id)
				//console.log(this.event);
				this.floatbox.details = true;
			},
			genDownloadableData:function(data){
				return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`
			},
			

			/**
			 * @description apply filters by tags or month, will be cleared if type on searchbox
			 * a option can be set the filter part as a function and call if the search is empty
			 * after get search result IF the items.length > 0
			 */
			applyFilters: function(){
				this.items = [...this.filters.moth.split(','), ...this.filters.tags.split(',')]
				this.items = this.items.map(el => el.trim()).filter(Boolean)
				

				if(this.items.length == 0){
					this.items = this.events;
					this.perpareDownload(false, "")
				}
				else{
					this.items = this.events.filter(el => this.items.some(it => JSON.stringify(el).toLowerCase().includes(it)))
					this.events = this.items;
					this.perpareDownload('wrap20-filter.json', this.items)
				}
				
				//console.log(this.items);
			},


			/**
			 * @description add download name and data to download JSON button, if name if falsy and
			 * not in search or data is empty will set to download entire file 
			 */
			perpareDownload: function(name, data){
				this.dataToSave.name = name ? name : "wrap20-export";
				if(data == "" || this.search == ""){
					this.dataToSave.context = "/data/data.json";
				}
				else{
					this.dataToSave.context = this.genDownloadableData(data);
				}
				//console.log(data);
			}
		}
	}
</script>