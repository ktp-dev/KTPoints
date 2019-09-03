<template>
    <div class="section">
        <div class="field is-expanded is-centered">
            <div class="control is-expanded has-icons-left has-icons-right">
                <input v-model='input' class="input" type="text" placeholder="Search">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-search"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['input']
}
</script>