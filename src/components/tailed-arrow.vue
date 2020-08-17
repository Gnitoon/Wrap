<template>
    <div class="tailedArrow-contailer" :style="stl" @click="$emit('click')">
        <svg class="tailed-arrow" width="408" height="408" viewBox="0 0 408 408" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
                d="M389.866 204.25L248.444 345.671M389.866 204.25L248.444 62.8286M389.866 204.25L18.6345 204.25"
                stroke="#191919"
                stroke-width="25"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    </div>
</template>
<script>
export default {
    name:"tailedArrow",
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