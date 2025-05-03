<template>
  <div class="app-container">
    <!-- Основной контент -->
    <main class="main-content">
      <router-view />
    </main>
    <!-- Футер -->
    <footer class="footer">
      <router-link to="/theory">Как решать?</router-link>
      <p>
        Вайб-кодинг от <a href="https://t.me/razumeyetsa" target="_blank">@razumeyetsa</a>, 2025
      </p>
      <p>
        Github: <a href="https://github.com/DNScookie/a-simple-square-equation-trainer" target="_blank">a-simple-square-equation-trainer</a>
      </p>
    </footer>
  </div>
</template>

<style>
/* Общий контейнер */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Основной контент */
.main-content {
  flex: 1;
  /* Занимает всё доступное пространство */
  padding: 2em;
  background-color: #fff;
}

/* Футер */
.footer {
  background-color: #f9f9f9;
  padding: 1em 0;
  border-top: 1px solid #ddd;
  text-align: center;
  font-size: 0.9em;
  color: #555;
}

.footer a {
  text-decoration: none;
  color: #007BFF;
  margin-bottom: 0em; /* Уменьшен отступ */
}

.footer a:hover {
  text-decoration: underline;
}

.footer p {
  margin: 0; /* Убираем лишние отступы */
}
</style>