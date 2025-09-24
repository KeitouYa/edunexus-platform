<template>
  <div class="row">
    <div class="col-xs-offset-2 col-xs-8">
      <div class="page-header">
        <h2>
          <slot>我是标题插槽</slot>
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Title",
};
</script>
