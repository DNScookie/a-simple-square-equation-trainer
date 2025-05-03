<template>
    <div class="theory-container">
        <h1>Теория квадратных уравнений</h1>
        <p>
            Квадратное уравнение — это уравнение вида <strong>ax² + bx + c = 0</strong>, где:
        </p>
        <ul>
            <li><strong>a</strong> — коэффициент при x² (не равен 0);</li>
            <li><strong>b</strong> — коэффициент при x;</li>
            <li><strong>c</strong> — свободный член.</li>
        </ul>
        <p>
            Дискриминант (D) вычисляется по формуле: <strong>D = b² - 4ac</strong>.
            В зависимости от значения D:
        </p>
        <ul>
            <li><strong>D &gt; 0</strong>: два различных корня;</li>
            <li><strong>D = 0</strong>: один корень (двукратный);</li>
            <li><strong>D &lt; 0</strong>: корней нет.</li>
        </ul>
        <p>
            Корни уравнения находятся по формуле:
            <strong>x₁,₂ = (-b ± √D) / (2a)</strong>.
        </p>
        <router-link to="/">Вернуться к решению</router-link>
    </div>
</template>

<style>
.theory-container {
    max-width: 800px;
    margin: auto;
    padding: 1.5em;
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h1 {
    font-size: 1.8em;
    text-align: center;
    margin-bottom: 1em;
    color: #333;
}

ul {
    margin: 1em 0;
    padding-left: 1.5em;
}

li {
    margin-bottom: 0.5em;
}

a {
    display: inline-block;
    margin-top: 1.5em;
    color: #007BFF;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>