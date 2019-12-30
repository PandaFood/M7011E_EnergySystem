<template>
  <div id="current-wind">
    <div> 
        <b> Wind Speed:  </b> <span>{{windData.windSpeed.toFixed(2)}} m/s </span><br>
        <b> Generated Power:  </b> <span>{{windData.power.toFixed(2)}} kWh </span><br> 
        <b> Status:  </b> <span>{{windData.status}} </span><br> 
    </div>

  </div>
</template>

<script>


export default {
    name: 'CurrentWind',
    props: ['windData'],
}

</script>

<style scoped>
    #current-wind {
        width: 100vw;
        font-size: 25px;
        margin-top: 50px;
        display: block;

    }

    #current-wind div {
        float: right;
        margin-right: 100px;
        width: 400px;
    }

    b {
        float: left;
    }
    span {
        float: right;
    }
</style>
