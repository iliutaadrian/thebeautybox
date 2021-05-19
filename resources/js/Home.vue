<template>
    <div class="content">
        <div class="wrap">
            <p>Lasa-te surprinsa de cel mai popular MISTERY BOX de Makeup!</p>
            <a class="button" href="/shop">Comanda acum!</a>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
    .content{
        background-image: url('/images/background.png');
        background-size: cover;
        height: 750px;
    }

    .wrap {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .button {
        padding: 15px 25px 15px 25px;
        font-size: 15px;
        text-transform: uppercase;
        letter-spacing: 2.5px;
        font-weight: 500;
        color: #000;
        background-color: #fff;
        border: none;
        border-radius: 45px;
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease 0s;
        cursor: pointer;
        outline: none;
    }

    .button:hover {
        background-color: #F3E5DC;
        box-shadow: 0px 15px 20px rgb(202 193 189);
        transform: translateY(-7px);
    }
</style>
