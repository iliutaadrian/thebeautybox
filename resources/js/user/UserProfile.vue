<template>
    <div class="content">
        <spinner-loading :loading="loading" style="width: 100px; height: 100px; margin: 20px auto"></spinner-loading>
        <div v-if="!loading">
            <div class="loginContainer">
                <img :src="user.avatar" class="avatar">
                <h1 class="loginTitle">{{user.name}}</h1>

                <div class="loginInputContainer">
                    <label class="loginLabel">Name</label>
                    <input type="text" class="form-control loginInput" placeholder="Name" v-model="user.name" :disabled="disabled == 1">
                    <i class="fa fa-user passwordIcon"></i>
                </div>

                <div class="loginInputContainer">
                    <label class="loginLabel">Email</label>
                    <input type="text" class="form-control loginInput" placeholder="Email" v-model="user.email" :disabled="disabled == 1">
                    <i class="fa fa-envelope passwordIcon"></i>
                </div>

                <div class="loginInputContainer">
                    <label class="loginLabel">Phone</label>

                    <input class="form-control loginInput" v-model="user.phone" :disabled="disabled == 1">
                    <i class="fa fa-phone passwordIcon"></i>
                </div>

                <div class="loginInputContainer">
                    <label class="loginLabel">City</label>

                    <input class="form-control loginInput" v-model="user.city" :disabled="disabled == 1">
                    <i class="fa fa-building passwordIcon"></i>
                </div>

                <ButtonCustom :loading="loading" :text="'Update Info'" @click.native="update" v-if="disabled == 0"></ButtonCustom>
            </div>
        </div>
    </div>
</template>

<script>
    import ButtonCustom from '../page/ButtonCustom';
    export default {
        components: {ButtonCustom},
        created(){
            axios.get('/api/user/find/'+this.$route.params.id)
                .then(res=>{
                    if(res.data.length == 0)
                        this.$router.push({path: '/not-found'});

                    this.user = res.data[0];

                    if(this.currentUser !== null && this.user.id == this.currentUser.id)
                        this.disabled = 0;

                    this.loading = 0;
                })
        },
        data(){
            return {
                user:[],
                response: '',
                loading: 1,
                changeAvatar: 0,
                disabled: 1
            }
        },
        methods: {
            logout() {
                this.$store.commit('logout');
                this.$router.push('/login');
            },
            update(){
                this.loading=1;
                axios.put('/api/user/edit/' + this.user.id, this.user)
                    .then(res=>{
                        this.loading=0;
                        this.response = res.data.data;
                        this.$store.commit('updateUser', this.user);
                    })
                    .catch(err=>{
                        this.loading=0;
                    })
            }
        },
        computed: {
            currentUser() {
                return this.$store.getters.currentUser
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content{
        background-image: url('/images/background_2.jpg');
        background-size: cover;
        height: 900px;
        padding-top: 30px;
    }

    .btn-custom{
        color: #e1e8ef;
        background-color: #5DBCD2;
        border-color: #9aa5ad;
        border-radius: 7px;
    }

    ::placeholder{
        color: #2FA0CB;
    }

    .avatar{
        width: 200px;
        margin-top: 40px;
        background-color: #2FA0CB;
        border-radius: 50%;
        border: 2px solid black;
    }

    .loginContainer{
        color: #73879C;
        margin: 20px auto 20px;
        padding: 25px 50px 20px;
        max-width: 400px;
        text-align: center;
        text-shadow: 0 1px 0 rgba(147, 147, 147, 0.44);
        position: relative;

        background-color: #ffffffb8;
        border-radius: 10px;
        border: 1px solid black;
    }

    .loginTitle {
        font: 400 45px Helvetica, Arial, sans-serif;
        letter-spacing: -.05em;
        line-height: 20px;
        margin: 40px 0 30px;
    }

    .loginInputContainer{
        margin-bottom: 20px;
    }

    .loginInput:focus{
        -ms-box-shadow: 0 0 2px 0 #d2d2d2ab, inset 0 0 2px 0 #2a81a2d9;
        -o-box-shadow: 0 0 2px 0 #d2d2d2ab, inset 0 0 2px 0 #2a81a2d9;
        box-shadow: 0 0 2px 0 #d2d2d2ab, inset 0 0 2px 0 #2a81a2d9;
    }

    .loginInput{
        border-radius: 7px;
        border: 1px solid #2a81a2;
        position: relative;
        padding-right: 33px;
        padding-left: 15px;
    }

    .loginLabel{
        float: left;
        padding-left: 4px;
        color: #2a81a2;
    }

    .passwordIcon{
        position: relative;
        float: right;
        bottom: 28px;
        right: 11px;
        cursor: pointer;
        color: #2a81a2;
    }

    .passwordIcon:hover{
        color: black;
    }

    .errorText{
        margin-top: 5px;
        font-size: 21px;
        color: red;
        margin-bottom: 10px;
        margin-left: 5px;
    }
</style>
