<template>
  <section id="banner">
    <div class="banner">
      <img src="../../public/img/yoko.webp" alt="">
      <button class="scroll-button" @click="scrollToContent">
        <i class="fa-solid fa-chevron-down"></i>
      </button>
    </div>
  </section>

  <section id="inicio" v-if="info.length">
    <div class="contenedorGeneralInicio">
      <div class="contenedorInicio">
        <h1>{{ getTitulo('home') }}</h1>
        <div v-for="item in getParrafos('home')" :key="item">
          <p>{{ item }}</p>
          <div class="botonesInicio">
            <button class="btn-1"><a class="btn-1a" href="#eventos">Servicios</a></button>
            <button class="btn-1"><a class="btn-1a" href="/contacto">Contacto</a></button>
          </div>
        </div>
      </div>

      <div class="contenedorImgInicio">
        <img class="imgIncio" src="../../public/img/inicioImg.jpg" alt="Salón de eventos">
      </div>
    </div>
  </section>

  <section id="salon" v-if="info.length">
    <div class="contenedorSalonModerno">
      <div class="contenedorCarrusel">
        <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner rounded">
            <div class="carousel-item active">
              <img src="../../public/img/salon1.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="../../public/img/salon2.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="../../public/img/salon3.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="../../public/img/salon4.jpg" class="d-block w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div class="contenedorTextoSalon">
        <h2>{{ getTitulo('servicios') }}</h2>
        <div v-for="item in getParrafos('servicios')" :key="item">
          <p>{{ item }}</p>
          <ul v-if="item.items" class="listaServicios">
            <li v-for="subItem in item.items" :key="subItem">{{ subItem }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="eventos" v-if="info.length">
    <h3 class="tituloEventos">Eventos</h3>
    <div class="contenedorEventos">
      <div v-for="evento in getEventos()" :key="evento._id" class="tarjetaEvento">
        <div class="infoEventos">
          <h3>{{ evento.titulo }}</h3>
          <h6>{{ evento.subtitulo }}</h6>
          <p v-for="item in evento.parrafo" :key="item">{{ item }}</p>
        </div>
      </div>
    </div>
  </section>

  <section id="tarjetaDeInvitacion" v-if="info.length">
    <div class="contenedorTarjetaDeInvitacion container">
      <div class="tarjetaDeInvitacionImg">
        <img class="imgTarjetaDeInvitacion" src="../../public/img/invitacion.webp" alt="">
      </div>
      <div class="tarjetaDeInvitacionParrafo">
        <h3>{{ getTitulo('tarjetasDeInvitacion') }}</h3>
        <div v-for="item in getParrafos('tarjetasDeInvitacion')" :key="item">
          <p>{{ item }}</p>
        </div>
        <a href="/Invitacion" class="btn-1">Crea Tu Tarjeta</a>
      </div>
    </div>
  </section>

  <section id="reseñas" v-if="info.length">
    <div class="medioTexto">
      <h4>Reseñas</h4>
      <h5>Opiniones de los clientes</h5>
    </div>

    <div class="contenedorGeneralReseñas">
      <div v-for="reseña in getReseñas()" :key="reseña._id" class="contenedorReseñas">
        <div>
          <template v-for="item in reseña.parrafo.slice(0, 3)" :key="item">
            <p>{{ item }}</p>
          </template>
          <template v-if="reseña.parrafo.length > 3">
            <button class="btn-ver-mas" @click="verMas(reseña)">Ver más</button>
          </template>
          <template v-else>
            <template v-for="item in reseña.parrafo.slice(3)" :key="item">
              <p>{{ item }}</p>
            </template>
          </template>
        </div>

        <div class="bandejaDeEntrada">
          <div class="imagenDePerfil">
            <img :src="reseña.imagen" alt="Imagen de perfil">
          </div>
          <div class="validacionReseñas">
            <h4>{{ reseña.usuario }}</h4>
            <h5>{{ reseña.tiempo }}</h5>
            <div class="estrellas">
              <template v-for="n in reseña.estrellas">
                <i class="fa-solid fa-star"></i>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
export default {
  data() {
    return {
      info: [],
      apiUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
    };
  },
  async created() {
    console.log('Component created');
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(`${this.apiUrl}/info`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.info = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  },
  methods: {
    async fetchData() {
      console.log('Fetching data from:', `${this.apiUrl}/info`);
      try {
        const response = await fetch(`${this.apiUrl}/info`);
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Data fetched:', data);
        this.info = data;
        console.log('this.info:', this.info);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    scrollToContent() {
      document.querySelector('#inicio').scrollIntoView({ behavior: 'smooth' });
    },
    getTitulo(seccion) {
      const sectionData = this.info.find(item => item.seccion === seccion);
      console.log(`getTitulo: sectionData for ${seccion}:`, sectionData);
      return sectionData ? sectionData.titulo : '';
    },
    getParrafos(seccion) {
      const sectionData = this.info.find(item => item.seccion === seccion);
      console.log(`getParrafos: sectionData for ${seccion}:`, sectionData);
      return sectionData ? sectionData.parrafo : [];
    },
    getEventos() {
      return this.info.filter(item => item.seccion === 'eventos');
    },
    getReseñas() {
      return this.info.filter(item => item.seccion === 'reseñas');
    },
    verMas(reseña) {
      reseña.mostrarCompleto = true;
    }
  }
};
</script>

<style scoped>
:root {
  --colorPrincipal: #363636;
  --colorSecundario: #FBFCFF;
  --colorTerciario: linear-gradient(180deg, #3793FF 0%, #0017E4 40%, #0017E4 100%);
}
.banner {
  position: relative;
  background: #fff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
}

.banner img {
  max-height: 100%;
  max-width: 100%;
}

.scroll-button {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--colorSecundario);
  color: black;
  border: none;
  padding: 50px 50px;
  cursor: pointer;
  font-size: 3em;
}

.scroll-button i {
  animation: bounce 2s ease-in-out 3;
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10px);
  }

  60% {
    transform: translateY(-5px);
  }
}

/* Seccion De Inicio */
section#inicio {
  background-image: url(../../public/img/fondoIncio.svg);
  background-position: center bottom;
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0px;
  display: flex;
  align-items: center;
  min-height: 70vh;
  padding: 10px 0 0 0;
  height: 100vh;
}

.contenedorGeneralInicio {
  display: flex;
}

.contenedorInicio {
  width: 50%;
}

.contenedorInicio h1 {
  font-size: 70px;
  line-height: 85px;
  color: #FBFCFF;
  margin-bottom: 20px;
  margin-left: 20px;
}

.contenedorInicio p {
  width: 80%;
  font-size: 16px;
  color: #FBFCFF;
  margin-bottom: 30px;
  margin-left: 30px;
}

.contenedorImgInicio {
  width: 50%;
  text-align: center;
}

.contenedorImgInicio img {
  width: 550px;
  text-align: center;
  border-radius: 20px;
  box-shadow: 23px 25px 15px 0px rgba(0, 0, 0, 0.1);
}

.botonesInicio {
  margin-top: 10px;
  margin-left: 30px;
}

.btn-1a {
  text-decoration: none;
  color: #363636;
}

.btn-1a:hover {
  color: white
}

.botonesInicio .btn-1 {
  margin-right: 10px;
  padding: 10px 20px;
  border-radius: 25px;
  border: 2px solid #363636;
  background-color: white;
  font-size: 1em;

  transition: all 0.3s ease-in-out;
}

.botonesInicio .btn-1:hover {
  background-color: black;
  color: white;
}

/* Seccion Salon */
section#salon {
  padding: 100px 0;
  /* Ajusta el padding según necesites */
  margin-bottom: 60px;
  /* Añade margen inferior para separar de la siguiente sección */
}

.contenedorSalonModerno {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: auto;
}



.contenedorCarrusel {
  width: 50%;
  text-align: center;
}

.contenedorTextoSalon {
  position: relative;
  width: 45%;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.contenedorTextoSalon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 5px !important;
  width: 98% !important;
  height: 5.5px !important;
  /* Aumenté la altura de la línea */
  border-radius: 25px 25px 0 0;
  background: linear-gradient(180deg, #3793FF 0%, #0017E4 40%, #0017E4 100%);
}

.contenedorTextoSalon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  height: 5px;
  background: linear-gradient(220.55deg, #3793FF 0%, #0017E4 100%);
}

.contenedorTextoSalon h2 {
  font-size: 28px;
  margin-bottom: 15px;
  color: #343a40;
}

.contenedorTextoSalon p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 15px;
  color: #495057;
}

.listaServicios {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}

.listaServicios li {
  font-size: 16px;
  color: #495057;
  padding: 5px 0;
  border-bottom: 1px solid #dee2e6;
}

/* Sección Eventos */
section#eventos {
  padding: 40px 20px;
  /* Ajusta el padding según necesites */
  margin-bottom: 60px;
  /* Añade margen inferior para separar de la siguiente sección */
}

section#eventos h3 {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  margin-bottom: 40px;
  color: #222;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
}

.contenedorEventos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.tarjetaEvento {
  flex: 1 1 calc(30% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 350px;
  margin: 10px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}

.tarjetaEvento:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.tarjetaEvento::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(220.55deg, #3793FF 0%, #0017E4 100%);
}

.infoEventos {
  padding: 20px;
  text-align: center;
}

.infoEventos h3 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #222;
  font-weight: 600;
}

.infoEventos p {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 10px;
}

.infoEventos p:last-child {
  margin-bottom: 0;
}

/*Seccion Tarjetas De Invitacion*/
section#tarjetaDeInvitacion {
  margin-top: 5%;
  padding: 120px 0;
  background-color: #363636;
  position: relative;
}

.contenedorTarjetaDeInvitacion {
  display: flex;
}

.tarjetaDeInvitacionImg {
  flex-basis: 50%;
}

.tarjetaDeInvitacionImg img {
  width: 500px;
}

.tarjetaDeInvitacionParrafo {
  flex-basis: 50%;
}

.tarjetaDeInvitacionParrafo h3 {
  color: #dee2e6
}

.tarjetaDeInvitacionParrafo p {
  color: #dee2e6
}

.btn-1 {
  display: inline-block;
  text-decoration: none;
  padding: 13px 45px;
  background-color: #dee2e6;
  color: #363636;
  font-size: 17px;
  border-radius: 25px
}

/* Sección Reseñas */
#reseñas {
  padding: 60px 20px;
  margin-bottom: 100px;
}

.medioTexto {
  text-align: center;
  margin-bottom: 60px;
  margin-top: 20px;
}

.medioTexto h4 {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #222;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.medioTexto h5 {
  font-size: 20px;
  color: #555;
  font-weight: 400;
}

.contenedorGeneralReseñas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  align-items: stretch;
}

.contenedorReseñas {
  padding: 30px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.contenedorReseñas:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.contenedorReseñas p {
  color: #333;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.bandejaDeEntrada {
  display: flex;
  align-items: center;
  gap: 20px;
}

.imagenDePerfil img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.btn-ver-mas {
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease-in-out;
}

.btn-ver-mas:hover {
  background-color: #0056b3;
}

.validacionReseñas h4 {
  color: #222;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.validacionReseñas h5 {
  color: #666;
  font-size: 14px;
  font-weight: 500;
  margin: 5px 0;
}

.estrellas i {
  color: #ffcc00;
  font-size: 18px;
}

/*Media*/
@media (max-width: 1024px) {

  /* Sección Inicio */
  .contenedorGeneralInicio {
    display: flex;
    align-items: center;
    text-align: center;
  }

  .contenedorInicio h1 {
    font-size: 2em;
    margin-bottom: 0;
    line-height: 35px;
  }

  .contenedorInicio p {
    font-size: 1em;
    margin: auto 60px;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .botonesInicio {
    margin: 20px 0px 20px 10px;
  }

  .contenedorImgInicio img {
    width: 100%;
    max-width: 400px;
  }

  /* Sección Salon */
  section#salon {
    padding: 0px;
  }

  .contenedorSalonModerno {
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .contenedorCarrusel,
  .contenedorTextoSalon {
    width: 70%;
  }

  .contenedorTextoSalon {
    margin-top: 20px;
    text-align: center;
  }

  /* Sección Tarjeta De Invitacion */
  .tarjetaDeInvitacionImg,
  .tarjetaDeInvitacionParrafo {
    width: 100%;
    margin: 10px 0;
  }

  .tarjetaDeInvitacionImg img {
    width: 90%;
    max-width: 450px;
  }

  /* Sección Reseñas */
  .contenedorGeneralReseñas {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }

  .contenedorReseñas {
    padding: 20px;
  }

  /* Botones */
  .btn-1 {
    padding: 10px 20px;
    font-size: 1em;
  }
}
@media (max-width: 768px) {

  /* Sección Inicio */
  .contenedorInicio h1 {
    font-size: 1.8em;
    margin-bottom: 0;
    line-height: 35px;
  }

  .contenedorInicio p {
    font-size: 1em;
    margin: auto 45px;
    margin-bottom: 0;
  }

  .botonesInicio {
    margin: 20px auto;
  }

  .contenedorImgInicio img {
    width: 100%;
    max-width: 300px;
  }

  /* Sección Salon */
  .contenedorCarrusel,
  .contenedorTextoSalon {
    width: 70%;
  }

  .contenedorTextoSalon h2 {
    font-size: 1.5em;
  }

  .contenedorTextoSalon p,
  .listaServicios li {
    font-size: 1em;
  }

  /* Sección Eventos */
  .contenedorEventos {
    flex-direction: column;
    align-items: center;
    width: 90%;
    margin: 5% auto;
  }

  .tarjetaEvento {
    width: 100%;
    margin: 20px 0;
    padding: 20px;
  }

  /* Sección Tarjeta De Invitacion */
  .contenedorTarjetaDeInvitacion {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
  }

  .tarjetaDeInvitacionImg img {
    width: 80%;
    max-width: 350px;
  }
}
@media (max-width: 550px) {

  .contenedorInicio h1 {
    width: 170%;
    margin-left: 30px;
    margin-bottom: 30px;
  }
  .contenedorInicio p {
    width: 170%;
    margin-left: 30px;
    margin-bottom: 1%;
  }
  .botonesInicio {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-bottom: 100%;
    margin-left: 50%;
  }
  .contenedorImgInicio img {
    display: none;
  }
}
@media (max-width: 370px) {

.contenedorInicio p {
  width: 170%;
  font-size: 14px;
  margin-left: 30px;
  margin-bottom: 1%;
}
}


</style>
