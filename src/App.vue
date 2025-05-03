<template>
  <div>
    <nav class="navigation">
      <router-link to="/">Главная</router-link>
      <router-link to="/theory">Теория</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
.navigation {
  display: flex;
  justify-content: center;
  gap: 1em;
  margin-bottom: 1.5em;
}

.navigation a {
  text-decoration: none;
  color: #007BFF;
  font-weight: bold;
}

.navigation a:hover {
  text-decoration: underline;
}
</style>