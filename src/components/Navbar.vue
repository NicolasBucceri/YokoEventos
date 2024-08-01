<template>
  <!-- Navbar -->
  <nav :class="navClasses" class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container">
      <!-- Logo -->
      <a class="navbar-brand fs-4" href="#">YOKO</a>
      <!-- Toggle Btn -->
      <button class="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Sidebar -->
      <div class="sidebar offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <!-- Sidebar Header -->
        <div class="offcanvas-header text-white border-bottom">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">YOKO Eventos</h5>
          <button type="button" class="btn-close btn-close-white shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <!-- Sidebar Body -->
        <div class="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0">
          <ul class="navbar-nav justify-content-center align-items-center fs-5 flex-grow-1 pe-3 ">
            <li class="nav-item mx-2">
              <a class="nav-link" aria-current="page" href="/">Inicio</a>
            </li>
            <li class="nav-item mx-2">
              <a class="nav-link" href="/#eventos">Servicios</a>
            </li>
            <li class="nav-item mx-2">
              <a class="nav-link" href="/#reseñas">Reseñas</a>
            </li>
            <li class="nav-item mx-2">
              <a class="nav-link" href="/Invitacion">Invitacion</a>
            </li>
            <li class="nav-item mx-2">
              <a class="nav-link" href="/Contacto">Contacto</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isTransparent: true,
      isNavVisible: false,
    };
  },
  computed: {
    navClasses() {
      return {
        'navbar-dark bg-dark': !this.isTransparent,
        'bg-custom': this.isTransparent,
        'navbar-visible': this.isNavVisible,
        'navbar-hidden': !this.isNavVisible
      };
    }
  },
  created() {
    this.checkBackground();
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    checkBackground() {
      const bannerHeight = document.getElementById('banner') ? document.getElementById('banner').offsetHeight : 0;
      const currentPath = window.location.pathname;

      if (currentPath === '/') {
        // En la página de inicio, mostrar el navbar solo si el usuario ha desplazado más allá del banner
        this.isNavVisible = window.scrollY > bannerHeight;
        this.isTransparent = window.scrollY <= bannerHeight; // Mantener transparente si está en la parte superior
      } else {
        // En otras páginas, mostrar el navbar siempre
        this.isNavVisible = true;
        this.isTransparent = false; // O ajusta la transparencia según sea necesario
      }
    },
    handleScroll() {
      this.checkBackground();
    }
  }
}
</script>

<style scoped>
.navbar {
  transition: background-color 0.3s ease, transform 0.5s ease-in-out;
  border-bottom: 4px solid;
  border-image: linear-gradient(220.55deg, #3793FF 0%, #0017E4 100%) 1;
}
.bg-custom {
  background-color: #363636;
}
.navbar-visible {
  transform: translateY(0);
}
.navbar-hidden {
  transform: translateY(-100%);
}
.navbar-brand {
  font-weight: bold;
}
@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
.slide-down {
  animation: slideDown 0.5s ease-in-out forwards;
}
.nav-link {
  color: white;
  position: relative;
  transition: color 0.3s ease;
}
.nav-link::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 10px;
  left: 0;
  background: white;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s ease;
}
.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
}
@media(max-width: 991px) {
  .sidebar {
    background-color: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
  }
  .offcanvas-body {
    background-color: #363636d5;
    height: 100% !important;
    padding-bottom: 200% !important;
    display: flex;
    color: white;
    overflow-y: hidden;
  }
  .offcanvas-body ul {
    margin: 50% auto;
  }
}
</style>
