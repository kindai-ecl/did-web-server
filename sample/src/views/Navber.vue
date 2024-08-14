<!-- components/Navbar.vue -->
<template>
    <nav class="navbar">
      <div class="container">
        <ul class="nav-links">
          <li>
            <router-link
                to="/"
                v-slot="{ href, route, navigate, isActive, isExactActive }"
            >
                <NavLink :active="isActive" :href="href" @click="navigate">
                    home
                </NavLink>
            </router-link>
          </li>
          <li>
            <router-link
                to="/did"
                v-slot="{ href, route, navigate, isActive, isExactActive }"
            >
                <NavLink :active="isActive" :href="href" @click="navigate">
                    publish
                </NavLink>
            </router-link>
          </li>
          <li><a href="#about">About</a></li>
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
    background-color: #7fffbf;
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
    justify-content: space-between;
    display: flex;
    gap: 2rem;
    margin: 0;
    padding: 0.5rem;
  }
  
  .nav-links a {
    color: black;
    text-decoration: none;
  }
  
  .nav-links a:hover {
    text-decoration: underline;
  }
  </style>
  