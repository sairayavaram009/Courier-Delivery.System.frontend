<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import RecipeServices from "../services/TourServices.js";

const route = useRoute();

const recipe = ref({});
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});

onMounted(async () => {
  await getRecipe();
});

async function getRecipe() {
  await RecipeServices.getRecipe(route.params.id)
    .then((response) => {
      recipe.value = response.data[0];
    })
    .catch((error) => {
      console.log(error);
    });
}

async function updateRecipe() {
  await RecipeServices.updateRecipe(recipe.value.id, recipe.value)
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = `${recipe.value.name} updated successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
  await getRecipe();
}

function closeSnackBar() {
  snackbar.value.value = false;
}
</script>

<template>
  <v-container>
    <v-row align="center">
      <v-col cols="10"
        ><v-card-title class="pl-0 text-h4 font-weight-bold"
          >Edit Tour
        </v-card-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="rounded-lg elevation-5">
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="recipe.name"
                  label="Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model.number="recipe.servings"
                  label="Enter The price"
                  type="number"
                ></v-text-field>
                <v-text-field
                  v-model.number="recipe.time"
                  label="Quantity (in days)"
                  type="number"
                ></v-text-field>
                <v-switch
                  v-model="recipe.isPublished"
                  hide-details
                  inset
                  :label="`Publish? ${recipe.isPublished ? 'Yes' : 'No'}`"
                ></v-switch>
              </v-col>
              <v-col>
                <v-textarea
                  v-model="recipe.description"
                  rows="10"
                  label="Description"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn variant="flat" color="primary" @click="updateRecipe()"
              >Update Tour</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar.value" rounded="pill">
      {{ snackbar.text }}

      <template v-slot:actions>
        <v-btn :color="snackbar.color" variant="text" @click="closeSnackBar()">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
