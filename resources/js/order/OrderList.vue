<template>
    <div class="container containerList">
        <spinner-loading :loading="loading" style="width: 100px; height: 100px; margin: 20px auto"></spinner-loading>

        <div v-if="!loading">
            <h2 class="titleList">Order Management</h2>


            <table class="table" align="center">
                <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Product</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in order_list">
                        <td>{{index+1}}</td>
                        <td><img :src="item.user.avatar" class="avatarUser"></td>
                        <td><router-link :to="{path: '/profile/' + item.user.id}" class="btn btn-custom">{{item.user.name}}</router-link></td>
                        <td><img :src="item.product.picture" class="productPicture"></td>
                        <td>{{item.product.title}}</td>
                        <td>{{item.product.type}}</td>
                        <td>{{item.product.price}}</td>
                        <td><i class="fa fa-circle" :style="[ item.status == 1 ? {'font-size' : '20px', 'color':'green'} : {'font-size' : '20px', 'color': 'red'}]"></i></td>
                        <td>
                            <button class="btn btnHandle" @click="confirm_modal(item)" data-toggle="modal" data-target="#modal_confirm" v-if="item.status == 0 && currentUser.role == 1">✅</button>
                            <button class="btn btnHandle" @click="confirm_modal(item)" data-toggle="modal" data-target="#modal_delete">❎</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <dialog-component :title="'Confirm'" :body="'Are you sure you want to confirm this order?'" :id_modal="'modal_confirm'" @action="confirm_product"></dialog-component>
        <dialog-component :title="'Delete'" :body="'Are you sure you want to delete this order?'" :id_modal="'modal_delete'" @action="delete_product"></dialog-component>
    </div>
</template>

<script>
    import DialogComponent from '../page/DialogComponent';

    export default {

        data(){
            return{
                orders: [],
                selected_order: '',
                loading: 0
            }
        },
        computed: {
            currentUser() {
                return this.$store.getters.currentUser
            },
            order_list() {
                if (this.currentUser.role == 1) {
                    return this.orders
                }
                else{
                    return this.orders.filter(i => i.user.role == 2 && i.user.id == this.currentUser.id)
                }
            }
        },
        mounted(){
            this.loading = 1;

            axios.get('/api/order/get')
                .then(res=>{
                    this.orders = res.data;
                    this.loading = 0
                })
                .catch(err=>{
                    this.loading = 0;
                })
        },
        methods:{
            confirm_modal(item){
                this.selected_order = item;
            },
            delete_product(item){
                axios.delete('/api/order/delete/'+this.selected_order.id)
                    .then(
                        this.orders.splice(this.orders.indexOf(this.selected_order),1)
                    );
            },
            confirm_product(item){
                axios.put('/api/order/status/'+this.selected_order.id, {status: 1})
                    .then(
                        this.selected_order.status = 1
                    );
            }
        },
        components:{
            DialogComponent
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

    .avatarUser{
        width: 35px;
        border: 1px solid black;
        border-radius: 50%;
    }

    .btn-custom{
        text-decoration: underline;
        font-size: 19px;
    }

    .btnHandle{
        font-size: 20px;
    }

    .productPicture{
        width: 90px;
        border: 1px solid #F3E4DC;
    }
</style>
