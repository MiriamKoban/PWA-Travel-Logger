<template>
  <q-layout view="hHh lpR fFf">
    <div class="background-blur"></div>
    <q-header  class="text-white q-pt-md" style="background-color: #1400B3;" height-hint="98">
      <q-toolbar >
        <q-toolbar-title class="text-center">
          <q-avatar class="q-mr-md" size="60px">
            <img src="/Pwa_travel_logo.png" style="max-width: 80px; height: auto;"/>
          </q-avatar>
          <span class="q-pa-md text-h4" style="font-family: Pacifico;">TravelLogger</span>
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/" label="Home" icon="home" />
        <q-route-tab to="/newVisit" label="New Visit" icon="add_circle" />
        <q-route-tab to="/about" label="About" icon="info" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
.hintergrund {
  background-image: url('/bg.jpg');
  background-size: cover;
  background-position: center;
}

.background-blur {
  position: fixed;
  top: 0;
  left: -10;
  width: 110%;
  height: 110%;
  background-image: url('/bg.jpg');
  background-size: cover;

  filter: blur(5px);
  z-index: -1;
}
</style>