<template>
    <footer>
        <ul class="iconosSociales">
            <li><a href="#"><i class="fa-brands fa-facebook"></i></a></li>
            <li><a href="#"><i class="fa-brands fa-github"></i></a></li>
            <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
            <li><a href="#"><i class="fa-brands fa-linkedin"></i></a></li>
        </ul>
        <ul class="menu">
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Invitacion</a></li>
            <li><a href="#">Contacto</a></li>
        </ul>
        <p>&copy;2024 Nicolas Bucceri | Todos los derechos reservados</p>
    </footer>
</template>

<style>
footer {
    position: relative;
    width: 100%;
    background: #363636;
    min-height: 100px;
    padding: 20px 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
footer .iconosSociales,
footer .menu {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    flex-wrap: wrap;
}
footer .iconosSociales li,
footer .menu li {
    list-style: none;
}
footer .iconosSociales li a { 
    font-size: 2em;
    color: #fff;
    margin: 0 10px;
    display: inline-block;
    transition: 0.5s;
}
footer .iconosSociales li a:hover {
    transform: translateY(-10px);
}
footer .menu li a { 
    font-size: 1.2em;
    color: #fff;
    margin: 0 10px;
    display: inline-block;
    transition: 0.5s;
    text-decoration: none;
    opacity: 0.75;
}
footer .menu li a:hover { 
    opacity: 1;
}
footer p {
    color: #fff;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 10px;
    font-size: 1.1em;
}
</style>