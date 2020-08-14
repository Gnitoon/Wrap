<template>
    <header>
        <div id="header">
            <img src="../assets/wrap20.svg" alt="website lettermark" class="lettermrk">
            
            <div id="contrib">
                <a href="https://github.com/matsukii/wrap20" class="link" target="blank">
                    <img src="../assets/icons/github.svg" class="git-icon" alt="Github icon">
                    Contribute
                </a>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name:"headerbar"
}
</script>


<style>
header{
    padding: 20px;
}

.git-icon{
    max-width: 25px;
    /* vertical-align: bottom; */
    margin-bottom: -5px;
}

.lettermrk{
    display: inline-block;
}


#contrib{
    width: fit-content;
    display: inline-block;
    float: right;
    margin-top: 3px;
    color: var(--text-dark);
}

</style>