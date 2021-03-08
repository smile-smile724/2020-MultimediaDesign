<template>
    <div class="main">
        <img src="../../../assets/potgame-bg.jpg">
        <img src="../../../assets/game-pot.png" class="pot">
        <img src="../../../assets/axe.png" class="axe">
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.main{
    width: 100%;
    height: 100%;
    /* min-height:970px; */
    min-width: 1900px;
    position: relative;
}
.main img{
    width: 100%;
    height: 100%;
}
.main .pot{
    width: 300px;
    height: 300px;
    position: absolute;
    left: 45%;
    top: 33%;
}
.main .axe{
    width: 900px;
    height: 900px;
    position: absolute;
    top: 30%;
    left: 29%;
}
</style>