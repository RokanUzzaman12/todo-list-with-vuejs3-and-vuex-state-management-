import axios from 'axios';

import {createStore} from 'vuex';


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
            try{
                let result = await axios.post('http://localhost:3000/todotask',{taskname:taskname});
                console.log(result.status);
                commit('addingData',result.data);
                return result
            }catch (err){
                console.log(err);
            }
            
                // try{
                //     let result = await axios.post('http://localhost:3000/todotask',{taskname:taskname});
                // }

            // commit('addingData',result.data);
            
            
        },

        async deleteDate(state,id){
            try{
                let result = await axios.delete(`http://localhost:3000/todotask/${id}`);
                state.commit('deleteUi',id);
                return result

            }catch(err){
                console.log(err);
            }

        },
        async taskUpdate({commit},id) {
            let getupdatedata = await axios.get(`http://localhost:3000/todotask/${id}`)
            commit('afterTastUpdate',getupdatedata.data)
            
        },

        async updateData({state,commit},id) {
            try{
                let result = await axios.put(`http://localhost:3000/todotask/${id}`,{taskname: state.taskname})
                commit('uiUpdate',result.data);
                // console.log(result)
                return result


            }catch(err){
                console.log(err);
            }    

        }
    },
    mutations:{
        updateData:(state,value)=>{
            state.tasklist = value
        },
        showInput:(state)=>{
            state.show =!state.show;
            state.updatebtnshow =false;
            state.submitshow=true;
        },
        addingData:(state,value)=>{
            state.tasklist.push(value);
            state.taskname = " ";
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
            // let id = result.taskid;
            // console.log(state.tasklist);

            let objIndex = [...state.tasklist].findIndex(todo=>todo.id ==result.id);

            // console.log(state.tasklist[objIndex].taskname +"------------"+state.taskname);
            state.tasklist[objIndex].taskname = state.taskname;
            state.taskname = " ";
            state.show = false;



        }

    }

});

export default store;