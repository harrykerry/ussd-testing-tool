<script setup lang="ts">
useSeoMeta({
  title: "Free USSD Emulator | Test USSD Sessions Online",

  description:
    "A free online USSD emulator for developers. Test and debug USSD sessions against your callback URL, inspect request and response logs, and simulate menu flows — no signup required.",

  author: "Harold Kerry",

  ogTitle: "Free USSD Emulator | Test USSD Sessions Online",
  ogDescription:
    "Free online USSD emulator for developers. Simulate USSD sessions against your callback, inspect request/response logs, and debug menu flows.",
  ogType: "website",
  ogImage: "/images/logos/logo.png",

  twitterCard: "summary_large_image",
  twitterTitle: "Free USSD Emulator | Test USSD Sessions Online",
  twitterDescription:
    "Free online USSD emulator for developers. Simulate USSD sessions, inspect logs, and debug callback flows.",
  twitterImage: "/images/logos/logo.png",

  robots: "index, follow",
});

useHead({
  htmlAttrs: {
    lang: "en",
  },

  link: [
    {
      rel: "apple-touch-icon",
      sizes: "57x57",
      href: "/favicon/apple-icon-57x57.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "60x60",
      href: "/favicon/apple-icon-60x60.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "72x72",
      href: "/favicon/apple-icon-72x72.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "76x76",
      href: "/favicon/apple-icon-76x76.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "114x114",
      href: "/favicon/apple-icon-114x114.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "120x120",
      href: "/favicon/apple-icon-120x120.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "144x144",
      href: "/favicon/apple-icon-144x144.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "152x152",
      href: "/favicon/apple-icon-152x152.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicon/apple-icon-180x180.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      href: "/favicon/android-icon-192x192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      href: "/favicon/favicon-96x96.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon/favicon-16x16.png",
    },
    {
      rel: "icon",
      href: "/favicon/favicon.ico",
    },
    {
      rel: "manifest",
      href: "/favicon/manifest.json",
    },
  ],

  meta: [
    {
      name: "keywords",
      content:
        "USSD emulator, USSD simulator, USSD testing, USSD callback, Africa's Talking USSD, USSD menu testing, mobile USSD developer tool",
    },
    {
      name: "msapplication-TileColor",
      content: "#ffffff",
    },
    {
      name: "msapplication-TileImage",
      content: "/favicon/ms-icon-144x144.png",
    },
    {
      name: "theme-color",
      content: "#ffffff",
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>