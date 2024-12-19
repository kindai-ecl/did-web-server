<!-- components/Navbar.vue -->
<script setup>
import 'primeicons/primeicons.css';
</script>
<template>
    <nav class="navbar">
      <div class="container">
        <ul class="nav-links">
          <li>
            <router-link
                to="/wallet"
                v-slot="{ href, route, navigate, isActive, isExactActive }"
            >
                <!-- <NavLink :active="isActive" :href="href" @click="navigate"> -->
                  <i class="pi pi-address-book" style="font-size: 2rem"></i>
                <!-- </NavLink> -->
              </router-link>
            </li>
            <li>
              <router-link
              to="/did"
              v-slot="{ href, route, navigate, isActive, isExactActive }"
              >
              <!-- <NavLink :active="isActive" :href="href" @click="navigate"> -->
                  <i class="pi pi-user" style="font-size: 2rem"></i>
                <!-- </NavLink> -->
            </router-link>
          </li>
            <li>
              <router-link
              to="/vc-request"
              v-slot="{ href, route, navigate, isActive, isExactActive }"
              >
              <!-- <NavLink :active="isActive" :href="href" @click="navigate"> -->
                  <i class="pi pi-plus" style="font-size: 2rem"></i>
                <!-- </NavLink> -->
            </router-link>
          </li>
          <li>
            <router-link
              to="/qr-reader"
              v-slot="{ href, route, navigate, isActive, isExactActive }"
            >
              <!-- <NavLink :active="isActive" :href="href" @click="navigate"> -->
                <i class="pi pi-qrcode" style="font-size: 2rem"></i>
              <!-- </NavLink> -->
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  };
  </script>
  
  <style scoped>
  .navbar {
    background-color: #3cb371;
    color: black;
    padding: 1rem 0;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
  
  .nav-links {
    list-style: none;
    justify-content: space-around;
    display: flex;
    gap: 2rem;
    margin: 0;
    padding: 0.5rem;
    width: 80%;
  }
  
  .nav-links a {
    color: black;
    text-decoration: none;
  }
  
  .nav-links a:hover {
    text-decoration: underline;
  }
  </style>
  