import axios from 'axios';
import {createStore} from 'vuex'

const store = createStore({

    state:{
        tasklist: [],
        show:false,
        updatebtnshow: true,
        submitshow: true,
        taskname:"",
        taskid:null
    },
    getters:{
        todos:(state)=>{
          return  state.tasklist

        }

    },

    actions:{
        async getAllData(state){
            let alldata = await axios.get('http://localhost:3000/todotask');
            // console.log(alldata.data);
            state.commit('updateData',alldata.data);
        },
        async addToDo({commit},taskname){
            console.log(taskname);
            let addData = await axios.post('http://localhost:3000/todotask',{taskname:taskname});
            commit('addingData',addData.data);
        },

        async deleteDate(state,id){
             await axios.delete(`http://localhost:3000/todotask/${id}`);
             state.commit('deleteUi',id);
        },
        async taskUpdate({commit},id) {
            let getupdatedata = await axios.get(`http://localhost:3000/todotask/${id}`);

            commit('afterTastUpdate',getupdatedata.data)
        },

        async updateData({state,commit},id) {
            console.log("myname",state.taskname);
            console.log("myid",id);

            // console.log(this.state.taskname +id);
            let result = await axios.put(`http://localhost:3000/todotask/${id}`, {
                taskname: state.taskname
            });

            commit('uiUpdate',result);
            

        }
    },
    mutations:{
        updateData:(state,value)=>{
            state.tasklist = value
        },
        showInput:(state)=>{
            state.show =!state.show;
            state.updatebtnshow =false;
        },
        addingData:(state,value)=>{
            state.tasklist.push(value);
            state.taskname = " ",
            state.show =!state.show;
            
        },
        deleteUi:(state,id)=>{  
            console.log("my tasklist",state.tasklist.a);
           state.tasklist = state.tasklist.filter(todo => todo.id !== id)
           

        },
        afterTastUpdate(state,result){
            state.taskname = result.taskname;
            console.log(state.taskname);
            state.taskid = result.id;
            state.show = true;
            state.submitshow = false;
            state.updatebtnshow = true;
        },

        uiUpdate:(state,result)=>{
            // console.log("Find index id",result.taskid);
            let id = result.taskid;
            // console.log(state.tasklist);
            let objIndex = state.tasklist.findIndex(todo=>todo.id ==id);
            console.log("Object id", objIndex);
            state.tasklist[objIndex].taskname = state.taskname;



        }

    }

});

export default store;