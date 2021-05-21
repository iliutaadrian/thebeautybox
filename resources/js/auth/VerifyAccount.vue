<template>
    <div class="container">
        <spinner-loading :loading="loading" style="width: 100px; height: 100px; margin: 20px auto"></spinner-loading>
    </div>
</template>

<script>

    export default {
        data(){
            return{
                loading: 0
            }
        },
        mounted(){
            this.loading = 1;
            axios.get('/api/auth/signup/activate/'+this.$route.params.token)
                .then(res=>{
                    this.$router.push({path: '/login'});
                })
                .catch(err=>{
                    this.$router.push({path: '/not-found'});
                })
        }
    }
</script>
