<template>
    <div class="container containerList">
        <spinner-loading :loading="loading" style="width: 100px; height: 100px; margin: 20px auto"></spinner-loading>

        <div v-if="!loading">
            <h2 class="titleList">User Management</h2>


            <table class="table" align="center">
                <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Avatar</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Role</th>
                    <th scope="col">Active</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in users">
                    <td scope="row">{{index+1}}</td>
                    <td><img :src="item.avatar" class="avatarUser"></td>
                    <td>{{item.name}}</td>
                    <td>{{item.email}}</td>
                    <td>{{item.phone}}</td>
                    <td>{{item.city}}</td>
                    <td>{{item.role == 1 ? 'Admin' : 'User'}}</td>
                    <td><i class="fa fa-circle" :style="[ item.active == 1 ? {'font-size' : '20px', 'color':'green'} : {'font-size' : '20px', 'color': 'red'}]"></i></td>
                    <td>
                        <button class="btn btnHandle" @click="confirm_modal(item)" data-toggle="modal" data-target="#modal_confirm" v-if="item.active == 0 && item.role == 2">✅</button>
                        <button class="btn btnHandle" @click="confirm_modal(item)" data-toggle="modal" data-target="#modal_delete"v-if="item.role == 2">❎</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <dialog-component :title="'Confirm'" :body="'Are you sure you want to activate this user?'" :id_modal="'modal_confirm'" @action="confirm_user"></dialog-component>
        <dialog-component :title="'Delete'" :body="'Are you sure you want to delete this user?'" :id_modal="'modal_delete'" @action="delete_user"></dialog-component>
    </div>
</template>

<script>
    import SpinnerLoading from '../page/SpinnerLoading';
    import DialogComponent from '../page/DialogComponent';


    export default {
        data(){
            return{
                users: [],
                selected_user: '',
                loading: 0
            }
        },
        mounted(){
            this.loading = 1;

            axios.get('/api/user/get')
                .then(res=>{
                    this.users = res.data;
                    this.loading = 0
                })
                .catch(err=>{
                    this.loading = 0;
                })
        },
        methods:{
            confirm_modal(item){
                this.selected_user = item;
            },
            delete_user(item){
                axios.delete('/api/user/delete/'+this.selected_user.id)
                    .then(
                        this.users.splice(this.users.indexOf(this.selected_user),1)
                    );
            },
            confirm_user(item){
                axios.put('/api/user/status/'+this.selected_user.id, {status: 1})
                    .then(
                        this.selected_user.status = 1
                    );
            }
        },
        components:{
            SpinnerLoading, DialogComponent
        }
    }
</script>

<style>
    .containerList{
        margin-top: 30px;
        text-align: center;
        text-shadow: 0 1px 0 rgba(147, 147, 147, 0.44);
    }

    table th{
        text-align: center;
        font-size: 18px;
    }

    table td{
        font-size: 17px;
        vertical-align: middle !important;
    }

    .btnHandle{
        font-size: 20px;
    }

    .avatarUser{
        width: 35px;
        border: 1px solid black;
        border-radius: 50%;
    }
</style>
