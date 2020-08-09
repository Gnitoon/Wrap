<template>
    <div>
        <svg class="spinner" width="306" height="306" viewBox="0 0 306 306" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="154" cy="152" r="140" stroke="#333333" stroke-width="30" stroke-dasharray="440" stroke-linecap="round">
                <animate attributeName="stroke-dashoffset" dur="2s" from="885" to="0" repeatCount="indefinite"/>
            </circle>
        </svg>
    </div>
</template>

<script>
    export default {
        name: "spinner",
    }
</script>