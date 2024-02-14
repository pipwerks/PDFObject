<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <!-- <template #home-hero-before>
        home-hero-before
    </template> -->

    <!-- <template #home-hero-info-before>
    </template> -->

    <!-- <template #home-hero-info>        
        <p>home-hero-info</p>
    </template> -->

    <!-- <template #home-hero-info-after>
        <p>home-hero-info-after</p>
    </template> -->

    <!-- <template #home-hero-actions-after>
        <p>home-hero-actions-after</p>
    </template> -->

    <template #home-hero-image>
        <!-- Not quite ready for prime time... -->
        <!-- <PdfObject url="/pdf/sample.pdf" :options="{ height: '500px' }" style="border: 1px solid rgba(0,0,0,.2)" /> -->
    </template>

    <!-- <template #home-hero-after>
        home-hero-after
    </template> -->

    <!-- <template #home-features-before>
        home-features-before
    </template> -->

    <!-- <template #home-features-after>
        <p>home-features-after</p>
    </template> -->

  </Layout>
</template>