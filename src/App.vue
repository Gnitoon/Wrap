<template>
	<div id="app" class="light">
		
		<header>
			<div id="header">
				<img src="./assets/wrap20.svg" alt="site lettermark" class="lettermrk">
				
				<div id="contrib">
					<a href="https://github.com/matsukii/wrap20" class="link" target="blank">
						<img src="./assets/icons/github.svg" class="git-icon" alt="Github icon">
						Contribute on Github
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

			<button class="btn" id="ac-sort">
				<img src="./assets/icons/sort.svg" alt="sort icon" id="sort-icon" class="ac-search-icons">
				Sort by...
			</button>
			
			<button class="btn" id="ac-sort">
				<a :href="dataToSave.context" :download="dataToSave.name" class="not-link">
					<img src="./assets/icons/download.svg" alt="download icon" id="down-icon" class="ac-search-icons">
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
				<li v-for="(item, i) in events" class="evt-list-item" v-bind:key="item.id" v-show="loaded">
					<div>
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



		<!-- <button class="btn">aaa</button>
		<input type="text" class="inpt" >


		<select name="" id="" class="slct">
			<option value="1">English</option>
		</select> -->



	</div>
</template>

<script>

	import spinner from "./components/spinner.vue"
	

	export default {
		components:{
			spinner
		},
		data(){
			return {
				data:[],
				loaded:false,
				search:'',
				timeout:'',
				events:[],
				dataToSave: {
					default: '/data/data.json',
					context: '/data/data.json',
					name:'wrap2-export-all.json'
				}
			}
		},
		created(){

			fetch('/data/data.json').then(dat => dat.json()).then(res => {
				this.data = res;
				this.loaded = true
				this.events = res.events
			})
			// setTimeout(() => {
			// 	console.log(data);
			// 	this.data = data;
			// 	this.loaded = true
			// }, 2000)
		},
		watch:{
			search(val){
				if(val){
					val = val.toLowerCase();

					if(this.timeout) clearTimeout(this.timeout);
					this.timeout = setTimeout(() => {
						let filtered = this.data.events.filter(el => {
							if(el.id == val
								|| el.title.toLowerCase().search(val) != -1
								|| el.month.toLowerCase().search(val) != -1
								|| el.tags.includes(val)
								|| el.local.includes(val)
								|| el.date.from.toLowerCase().search(val) != -1
							){
								return el
							}
						})
						this.events = filtered
						this.dataToSave.context = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(filtered))}`
						this.dataToSave.name = 'wrap2-export-search.json'
						console.log(filtered);
					}, 700)


				}
				else{
					this.events = this.data.events;
					this.dataToSave.context = this.dataToSave.default
					this.dataToSave.name = 'wrap2-export-all'
				}
			}
		},
		methods:{
			getDate: function(timestamp){
				return new Date(timestamp).toDateString().substr(4, 7)
			}
		}
	}
</script>