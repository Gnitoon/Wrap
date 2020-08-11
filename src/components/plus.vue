<template>
    <div class="plusIcon-cont" @click="$emit('click')">
        <svg
            width="324"
            :class="{
                plus: true,
                asCloseIcon: asClose
            }"
            height="324"
            viewBox="0 0 324 324"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M162 12V162M162 312V162M162 162H312M162 162H12" stroke="#191919" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    </div>
</template>

<script>
export default {
    name: "plus",
    props:{
        close:{
            close:Boolean,
            default:false
        },
    },
    computed: {
        asClose(){
            return (this.close + '') == "true"
        }
    },
}
</script>


<style>
.asCloseIcon{
    transform: rotate(45deg)
}
</style>