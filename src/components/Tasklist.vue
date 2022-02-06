<template>
<div>
    <h1>Your Todays Tasklist</h1>
    <div class="listtable">
        <table>
            <tr>
                <th> Id </th>
                <th> Task Name </th>
                <th> Action </th>
            </tr>
            <tr v-for="i in task" :key="i.id">
                <td>{{i.id}}</td>
                <td>{{i.taskname}}</td>
                <td>
                    <button class="tablebtn update" v-on:click="taskUpdate(i.id)">Update</button>
                    <button class="tablebtn delete" v-on:click="deletetask(i.id)">Completed</button>
                </td>
            </tr>
        </table>

        <div class="addtask" v-if="show">
            <!-- <p>{{this.$store.state.taskname}}</p> -->
            <input type="text" v-model="this.$store.state.taskname">
            <button v-if="submitshow" class="submitbtn addtaskbtn" v-on:click="submitdata"> Submit</button>
            <button v-if="updatebtnshow" class="submitbtn addtaskbtn" v-on:click="updateData({taskid})"> Update</button>
        </div>
        <button v-if="!show" class="addtaskbtn" v-on:click="showInput()"> Add task</button>
    </div>
</div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    name:"Tasklist",
    computed:{
        ...mapState({
            task:(state)=>state.task,
            show:(state)=>state.show,
            taskid:(state)=>state.taskid,
            taskname:(state)=>state.taskname,
            updatebtnshow:(state)=>state.updatebtnshow,
            submitshow:(state)=>state.submitshow
            
        })
    },
    methods:{
        ...mapMutations({
            showInput:'showInput'
        }),

        ...mapActions({
            submitdata:'actionSubmitData',
            taskUpdate:'actiontaskUpdate',
            updateData:'actionupdateData',
            deletetask:'actiondeletetask'
        })
    },
    mounted(){
      return this.$store.dispatch('getallfatchdata');
    }
}
</script>


<style scoped>
.listtable table {
    border-collapse: collapse;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
}
.listtable th {
    padding: 12px 5px 0px 5px;
    padding-bottom: 12px;
    text-align: left;
    background-color: orange;
    color: white;
}
.listtable tr:nth-child(even) {
    background-color: #f2f2f2;
}
.listtable tr {
    text-align: left;
}
.listtable td {
    padding: 5px
}
.listtable tr:hover {
    background-color: #ddd;
}
.addtask {
    margin-top: 20px;
}
.addtask input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    margin-bottom: 20px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border: 2px solid orange;
    border-radius: 20px;
}
.tablebtn {
    width: 100px;
    padding: 5px;
    margin: 5px;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}
.update {
    background-color: skyblue;
}
.delete {
    background-color: rgba(255, 0, 0, 0.541);
}
.addtaskbtn {
    width: 172px;
    padding: 11px;
    margin: 13px;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 20px;
    background-color: orange;
    font-size: 16px;
}
.submitbtn {
    background-color: gold;
}
</style>