import {createStore} from 'vuex'
import axios from 'axios'
import route from '../../router';

const store = createStore({
    state:{
        task: [],
        show: false,
        taskid: "",
        taskname: "",
        updatebtnshow: true,
        submitshow: true
    },
    mutations:{
        async onload(state){
            let getlist = await axios.get("http://localhost:3000/todotask");
            console.log(getlist.data);
            state.task = getlist.data;
            route.push({name:"Home"});
            },
            showInput(state) {
                state.show = true;
                state.updatebtnshow = false;
                state.submitshow = true;
            },
            async submitdata(state) {
                let submiteddata = await axios.post("http://localhost:3000/todotask", {
                    taskname: state.taskname
                });
                console.log(submiteddata);
                state.show = !state.show;
                state.taskname = "";
                if(submiteddata.status==201){
                    // this.commit(onload);
                }
                
            },

            async taskUpdate(state,id) {
                let getupdatedata = await axios.get(`http://localhost:3000/todotask/${id}`);
                state.taskname = getupdatedata.data.taskname;
                state.taskid = getupdatedata.data.id;
                state.show = true;
                state.submitshow = false;
                state.updatebtnshow = true;
                //  console.log(this.taskid);
                //  let updateData = await axios.put(`http://localhost:3000/todotask/${id}`,{
                //      taskname:this.taskname
                //  });
                //  console.log(updateData);
                //  if(updateData.status == 200){
                //      alert("update successful");
                //  }
            },
            async updateData(state,id) {
                // console.log("myid",id.taskid);
                let result = await axios.put(`http://localhost:3000/todotask/${id.taskid}`, {
                    taskname: state.taskname
                });
                console.log(result);
                if (result.status == 200) {
                    alert("update successful");
                    // this.commit(onload);
                }
            },

            async deletetask(state, id){
                let result = await axios.delete(`http://localhost:3000/todotask/${id}`);
                console.log(result);
                if(result.status==200){
                    
                    alert("One task deleted" +state);
                    // this.commit(onload);
                }
                
            }

    },
    actions:{
        getallfatchdata(state){
            
           return state.commit('onload');
        },
        actionSubmitData(state){
            state.commit('submitdata');
        },
        actiontaskUpdate(state,id){
            return state.commit('taskUpdate',id);
        },
        actionupdateData(state,id){
            return state.commit('updateData',id);
        },
        actiondeletetask(state,id){
            return state.commit('deletetask',id);
        }
    }
});

export default store;