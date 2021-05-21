<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="/"><img class="logo" src="/images/logo.png"/></a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav ml-auto" >
                <li class="nav-item">
                    <router-link :to="{path: '/shop'}" class="nav-link" >SHOP</router-link>
                </li>
                <li class="nav-item" v-if="currentUser!=null">
                    <router-link :to="{path: '/post/create'}" class="nav-link" v-if="currentUser.role == 1">Add Product</router-link>
                </li>
                <li class="nav-item " v-if="currentUser==null ">
                    <router-link :to="{path: '/login'}" class="nav-link">Login</router-link>
                </li>
                <li class="nav-item" v-if="currentUser==null">
                <router-link :to="{path: '/register'}" class="nav-link">Register</router-link>
                </li>
                <li class="nav-item dropdown" v-if="currentUser!=null">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span>{{currentUser.name}}</span>
                        <img :src="currentUser.avatar" class="avatarHeader">
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink"  v-if="currentUser.role == 2">

                        <router-link :to="{path: '/profile/' + currentUser.id}" class="dropdown-item">Profile</router-link>

                        <router-link :to="{path: '/order/list' }" class="dropdown-item">Orders</router-link>

                        <a class="dropdown-item" @click="logout" style="cursor: pointer">Logout</a>
                    </div>

                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" v-if="currentUser.role == 1">

                        <router-link :to="{path: '/profile/' + currentUser.id}" class="dropdown-item" >Profile</router-link>

                        <router-link :to="{path: '/order/list' }" class="dropdown-item">Orders</router-link>

                        <router-link :to="{path: '/user/list'}" class="dropdown-item" >Users List</router-link>

                        <a class="dropdown-item" @click="logout" style="cursor: pointer" >Logout</a>
                    </div>

                </li>
            </ul>
        </div>
    </nav>
</template>

<script>

    export default {
        components:{
        },
        created(){
        },
        computed: {
            currentUser() {
                return this.$store.getters.currentUser
            }
        },
        methods:{
            logout(){
                this.active = false;

                setTimeout(()=>{
                    this.$store.dispatch('logout');
                    this.$router.push('/');
                }, 300)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .navbar{
        background-color: #F3E5DC !important;
    }

    .avatarHeader{
        width: 25px;
        border-radius: 50%;
        border: 1px solid black;
    }

    .nav-link{
        color: black !important;
    }

    .logo {
        width: 60%;
        margin-left: 50px;
    }

    #navbarNavDropdown {
        margin-right: 50px;
    }
</style>
