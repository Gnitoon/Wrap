<template>
	<div id="app">
		<div class="card-top analytics-notice light" v-if="!accepted" id="acce">
			<a>
				This site uses Google analytics for page views and download metrics
			</a>
			<plus close="true" @click="accept"></plus>
		</div>
		<home></home>
	</div>
</template>
<script>
	import home from './views/Home.vue'
	import plus from './components/plus.vue'
	export default {
		components:{
			home,
			plus
		},
		data(){
			return {
				accepted: false
			}
		},
		created(){
			this.accepted = localStorage.accepted + '' == "true"
		},
		methods:{
			accept: function(){
				this.accept = true;
				console.log("accepted");
				document.getElementById("acce").style.display = 'none'
				localStorage.accepted = true
			}
		}
	}
</script>

<style>
.analytics-notice{
	display: flex;
	height: 160px;
    /* position: absolute;
	align-items: center; */
	position: absolute;
	padding: 30px;
	z-index: 1;
	width: -webkit-fill-available;
    text-align: center;
    align-content: center;
    box-sizing: border-box;
}

.analytics-notice a{
	margin: auto;
}
.analytics-notice .plusIcon-cont{
	
	cursor: pointer;
}
.analytics-notice .plus{
	width: 20px;
	height: 20px;
}
</style>