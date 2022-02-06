<template>
    <div>
        <h1>I am from home components</h1>
        <Tasklist/>
        
    </div>
</template>

<script>
import Tasklist from './Tasklist.vue'
export default {
    name:"Home",
    components:{
        Tasklist
    }
}
</script>