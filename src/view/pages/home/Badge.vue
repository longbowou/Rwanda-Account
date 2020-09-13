<template>
  <div>

    <div class="row">
      <div class="col-md-8">
        <KTCodePreview v-bind:title="'Details'" class="font-weight-bold">
          <template v-slot:preview>
            <h3 >Je vais booster votre SEO avec des Backlinks à fort DA (PR9) pour 5 €</h3>
            <b-card
              :img-src="images.image1"
              img-alt="Image"
              img-top
              style="max-width: 25rem;"
              class="col-md-8"
          >
              </b-card >
            <p >
              Afin d’attirer des visiteurs sur votre site ou blog, il est important que votre contenu soit adapté aux moteurs de recherche.
              L’optimisation dite SEO vous permettra de vous placer dans les premiers résultats de ceux-ci et donc d’avoir de meilleures chances d’être vus par les utilisateurs.
            </p>
            <h3 > WHY THIS COURSE</h3>
            <p >
              Les Backlinks sont le plus grand facteur de classement depuis la création de Google,
              ce pourquoi nos services SEO sont principalement axées sur le NETLINKING et renforcement des liens de qualité.
            </p>
            <h3 > WHY THIS BASE PRICE</h3>
            <p >
              Pour 5 euros, je vais vous rédiger UN article de 500 mots de qualité, dans n'importe quel thème (dans les limites légales).
              ✅ Je m'engage à fournir un contenu unique c'est à dire non plagié ni dupliqué.
            </p>
            <h3 >THE OPTIONS</h3>

              <p> Pack de Base (x2) : Je vais vous créer 15+ Backlinks HQ avec PR9/5 - Option Réservée Pour un Deuxième Site (Domaine): + 5 €</p>

            <div>
              <b-button href="#" variant="success"><i class="wizard-icon flaticon2-shopping-cart"></i>
                <router-link
                    to="/purchase"
                    v-slot="{ href, navigate, isActive, isExactActive }"
                >
                  <a
                      :href="href"
                      class="text-white font-weight-bolder"
                      style="color:white"
                      @click="navigate"
                  >
                    Purshase
                  </a>
                </router-link>
                </b-button>
            </div>


          </template>
          <template v-slot:html>
            {{ html1 }}
          </template>
        </KTCodePreview>


      </div>
      <div class="col-md-4">
        <KTCodePreview v-bind:title="'Informations'">
          <template v-slot:preview>
            <p>
              Temps de réponse moy:
            </p>
            <p>
              Taux de prise en charge:
            </p>
            <p>
              Taux de complétion:
            </p>
            <p>
              Respect des délais:
            </p>
              Commandes en cours:
            <p>
              Ventes au total:
            </p>
            <p>
              Vendeur depuis:

            </p>
            <div>
              <b-button href="#" variant="primary">Contact Seller</b-button>
              </div>

          </template>

        </KTCodePreview>


      </div>
    </div>
  </div>
</template>

<script>
import KTCodePreview from "@/view/content/CodePreview.vue";
import { SET_BREADCRUMB } from "@/core/services/store/modules/breadcrumbs.module";
import {queryServices} from "@/graphql/home-queries";

export default {

  data() {
    return {
      services: [],
      images: {
        image1: require("@/assets/media/books/1.png")
      },
    };
  },
  components: {
    KTCodePreview
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Vue Bootstrap", route: "alert" },
      { title: "Badges" }
    ]);
  },
  apollo: {
    services: {
      query: queryServices,
      update: data => data.services
    }
  }
};
</script>
