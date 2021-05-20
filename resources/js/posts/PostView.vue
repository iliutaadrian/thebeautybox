<template>
    <div class="content">
        <div class="container containerList">
            <spinner-loading :loading="loading" style="width: 100px; height: 100px; margin: 20px auto"></spinner-loading>
            <div v-if="!loading">
                <div v-if="posts.length != 0" class="containerClientList" >

                    <div class="clientCard" v-for="(item, key) in posts" :key="item.id">

                        <div class="pictureItem">
                            <img :src="item.picture[item.current_picture]" class="clientPicture">
                        </div>

                        <div class="titleItem">
                            {{item.title}}
                        </div>

                        <div class="descriptionItem">
                            {{item.description}}
                        </div>

                        <div class="typeItem">
                            Type: <b style="text-transform: uppercase">{{item.type}}</b>
                        </div>

                        <div class="priceItem">
                            {{item.price}} RON
                        </div>

                        <div class="gotobtn">
                            <router-link :to="{path: '/profile/' + item.id}" class="btn btn-custom">Cumpara Acum!</router-link>
                        </div>

                    </div>

                </div>
                <p v-else class="emptyList"> No elements! </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                posts: [],
                selectedItem : '',
                loading: 0
            }
        },
        mounted(){
            this.loading = 1;
            axios.get('/api/posts/get')
                .then(res=>{
                    this.posts = res.data.data;
                    let i = 0;
                    for (i = 0; i < this.posts.length; i++) {
                        this.posts[i].picture = this.posts[i].picture.split(';');
                        this.posts[i].current_picture = 0;
                    }
                    this.loading = 0
                })
                .catch(err=>{
                    this.loading = 0;
                })
        }
    }
</script>

<style scoped>
    .content{
        background-image: url('/images/background_2.jpg');
        background-size: cover;
        height: 840px;
        padding-top: 30px;
    }

    .btn-custom{
        color: #000;
        background-color: #F3E5DC;

        border: none;
        border-radius: 45px;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    }

    .btn-custom:hover {
        background-color: #fff;

        box-shadow: 0px 15px 20px rgb(202 193 189);
    }

    .containerList{
        margin-top: 30px;
        text-align: center;
        text-shadow: 0 1px 0 rgba(147, 147, 147, 0.44);
        opacity: 1;
    }

    .emptyList{
        margin-top: 80px;
        font-size: 25px;
        color: red;
    }

    .containerClientList{
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: none;
        text-transform: none;
        text-decoration: none;
    }

    @media (max-width: 1199px){
        .containerClientList{
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
        }
    }

    @media(max-width: 800px){
        .clientCard {
            max-width: 90%;
            min-width: 330px !important;
            padding: 20px;
            margin: 15px;
            position: relative;
            cursor: pointer;
            height: 450px !important;
        }

        .clientPicture {
            float: none !important;
        }
    }

    .clientCard {
        -webkit-box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        -webkit-transition: 0.3s;
        transition: 0.3s;
        min-width: 48%;
        background-color: white;
        padding: 20px;
        margin: 10px;
        position: relative;
        height: 300px;
    }

    .clientCard:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    .clientPicture{
        vertical-align: middle;
        height: 250px;
        float: left;
        border: 1px solid black;
    }

    .titleItem {
        font-size: 30px;
        font-weight: bolder;
        margin-bottom: 15px;
    }

    .descriptionItem {
        font-style: italic;
        font-size: 15px;
        margin-bottom: 10px;
        overflow-x: hidden;
    }

    .typeItem{
        margin: 10px 0px 20px 0px;
    }

    .priceItem {
        font-size: 27px;
        color: #F3E5DC;
        font-weight: bolder;
        -webkit-text-stroke: 1px black;
        margin-bottom: 10px;
    }

</style>
