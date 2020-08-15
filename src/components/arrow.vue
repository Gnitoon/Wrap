<template>
    <div class="arrow-container" :style="stl">
        <svg class="arrow" width="460" height="460" viewBox="0 0 460 460" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M230 442.132L442.132 230L230 17.868" stroke="#191919" stroke-width="35" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
</template>
<script>
export default {
    name:"arrow",
    props:{
        rotation:{
            rotation:String,
            default:'0deg'
        }
    },
    computed:{
        stl(){
            return {
                transform: `rotate(${this.rotation})`
            }
        }
    }
}
</script>