<template>
  <v-app>
    <h1> Explore! </h1>
    <v-tabs v-model="active">
      <v-tabs-bar class="cyan" dark>
        <v-tabs-item
          v-for="tab in tabs"
          :key="tab"
          :href="'#' + tab"
          ripple
        >
          Item {{ tab.slice(-1) }}
        </v-tabs-item>
        <v-tabs-slider color="yellow"></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content
          v-for="tab in tabs"
          :key="tab"
          :id="tab"
        >
          <v-card flat>
            <v-card-text>{{ text }}</v-card-text>
          </v-card>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>