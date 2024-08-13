<template>
  <div class="invitacion-container">
    <h1 class="tituloPrincipal">Crea tu Tarjeta de Invitación</h1>
    <div class="row">

      <div class="columna-formulario">
        <form @submit.prevent="crearInvitacion" class="formulario">
          <div class="contenedorGeneralDelFormulario">
            <h2 class="formularioTitulo">Invitación</h2>
            <div class="contenedorFormulario">
              <input type="text" v-model="nombre" id="nombre" class="inputFormulario" placeholder=" " required />
              <label for="nombre" class="labelFormulario">Nombre:</label>
              <span class="lineaFormulario"></span>
            </div>
            <div class="contenedorFormulario">
              <input type="number" v-model="edad" id="edad" class="inputFormulario" placeholder=" " required />
              <label for="edad" class="labelFormulario">Edad:</label>
              <span class="lineaFormulario"></span>
            </div>
            <div class="contenedorFormulario">
              <input type="date" v-model="fecha" id="fecha" class="inputFormulario" placeholder=" " required />
              <label for="fecha" class="labelFormulario">Fecha:</label>
              <span class="lineaFormulario"></span>
            </div>
            <div class="contenedorFormulario">
              <input type="time" v-model="hora" id="hora" class="inputFormulario" placeholder=" " required />
              <label for="hora" class="labelFormulario">Hora de Inicio:</label>
              <span class="lineaFormulario"></span>
            </div>
            <div class="contenedorFormulario">
              <input type="time" v-model="horaFin" id="horaFin" class="inputFormulario" placeholder=" " required />
              <label for="horaFin" class="labelFormulario">Hora de Fin:</label>
              <span class="lineaFormulario"></span>
            </div>
          </div>
          <button @click="downloadColumnaTarjeta" class="crearFormulario">Crear Invitación</button>
        </form>
      </div>

      <div class="columna-tarjeta">
        <div class="tarjeta" ref="columnaTarjeta">
          <div class="fondoSVG-container">
            <svg width="130mm" height="180mm" id="miSVG" viewBox="0 0 13.03 17.99" class="fondoSVG">
              <svg viewBox="0 890 2000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 1087V0H2066V389.556C1992.87 465.993 1963.41 574.858 1857.24 631.474C1621.8 757.026 1432.75 474.398 1078.98 760.241C725.216 1046.08 675.659 970.759 474.042 929.925C312.749 897.257 90.8085 1021.03 0 1087Z"
                  :fill="colores.encabezado" />
              </svg>
              <g id="Fondo">
                <g id="Decoracion">
                  <circle class="cls-1" cx="2" cy="8.83" r="0.46" :fill="colores.circulos" />
                  <circle class="cls-1" cx="9" cy="5" r="0.41" :fill="colores.circulos" />
                  <circle class="cls-1" cx="12" cy="7.65" r="0.38" :fill="colores.circulos" />
                  <circle class="cls-1" cx="1" cy="15.08" r="0.35" :fill="colores.circulos" />
                  <circle class="cls-1" cx="3" cy="14.26" r="0.34" :fill="colores.circulos" />
                  <circle class="cls-1" cx="10" cy="13.98" r="0.24" :fill="colores.circulos" />
                  <circle class="cls-1" cx="11" cy="12.34" r="0.31" :fill="colores.circulos" />
                  <polygon class="cls-1"
                    points="0.86 9.82 1.09 10.28 1.59 10.35 1.23 10.71 1.31 11.21 0.86 10.97 0.41 11.21 0.49 10.71 0.13 10.35 0.63 10.28 0.86 9.82"
                    :fill="colores.estrellas" />
                  <polygon class="cls-1"
                    points="9.58 14.68 9.8 15.13 10.29 15.2 9.94 15.55 10.02 16.04 9.58 15.81 9.14 16.04 9.22 15.55 8.86 15.2 9.36 15.13 9.58 14.68"
                    :fill="colores.estrellas" />
                  <polygon class="cls-1"
                    points="10.73 4.42 10.92 4.81 11.35 4.88 11.06 5.16 11.12 5.6 10.73 5.38 10.34 5.6 10.4 5.16 10.11 4.88 10.54 4.81 10.73 4.42"
                    :fill="colores.estrellas" />
                  <polygon class="cls-1"
                    points="1.6 6.66 1.84 7.11 2.33 7.19 1.98 7.54 2.06 8.04 1.6 7.81 1.16 8.04 1.24 7.54 0.88 7.19 1.38 7.11 1.6 6.66"
                    :fill="colores.estrellas" />
                </g>
              </g>
              <g id="Textos">
                <text class="cls-5 nombre" x="-1%" y="-5%" transform="translate(0.26 2.98)" :fill="colores.nombre"
                  font-family="'Cooper Black', sans-serif" font-size="0.8px">{{ nombre || 'Nicolas' }}</text>

                <text class="cls-6 tituloInicial" x="45%" y="18%" text-anchor="middle"
                  :fill="colores.tituloDeInvitacion">Te Invita A Su Cumpleaños!!</text>

                <text class="cls-10 edad" x="-1%" y="1%" transform="translate(3.34 7.78)" :fill="colores.edad">
                  <tspan class="cls-11">{{ edad || '20' }}</tspan>
                  <tspan :dx="edadDx" x="13%" style="font-size: 1.7px;"> Años</tspan>
                </text>

                <text class="cls-12 fecha" x="-3%" y="2%" transform="translate(4.16 8.75)" :fill="colores.fecha"
                  style="font-size: 10px;">
                  <tspan class="cls-13">{{ formatFecha(fecha) || '18/12/2024' }}</tspan>
                </text>

                <text class="cls-14 hora" x="-5%" y="3%" transform="translate(4.26 10.6)" :fill="colores.hora"
                  style="font-size: 10px;">
                  <tspan class="cls-15">{{ formatHora(hora, '17:00') }} | {{ formatHora(horaFin, '20:00') }}</tspan>
                </text>

                <text class="cls-21 tituloDeEspera" x="-3%" y="4%" transform="translate(3.38 12.35)"
                  :fill="colores.tituloDeEspera" style="font-size: 1px;">Te Esperamos</text>

                <g id="Yoko_Eventos" data-name="Yoko Eventos">

                  <text class="cls-16 yoko" x="2%" y="4%" transform="translate(4.75 14.22)"
                    :fill="colores.texto">YOKO</text>

                  <text class="cls-19 eventos" x="-17%" y="4%" transform="translate(7.78 14.74)"
                    :fill="colores.texto">Eventos</text>

                </g>
                
                <text class="cls-25 ubicacion" x="-4%" y="5%" transform="translate(5.12 15.53)"
                  :fill="colores.ubicacion">Miranda 4655</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div class="columna-acordeon">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                aria-expanded="true" aria-controls="collapseOne">
                Fondo
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <div class="color-picker mb-3">
                  <label for="color-encabezado" class="form-label">Elige un color para el encabezado:</label>
                  <input type="color" v-model="colores.encabezado" id="color-encabezado"
                    class="form-control form-control-color" />
                </div>
                <div class="color-picker mb-3">
                  <label for="color-circulos" class="form-label">Elige un color para los círculos:</label>
                  <input type="color" v-model="colores.circulos" id="color-circulos"
                    class="form-control form-control-color" />
                </div>
                <div class="color-picker mb-3">
                  <label for="color-estrellas" class="form-label">Elige un color para las estrellas:</label>
                  <input type="color" v-model="colores.estrellas" id="color-estrellas"
                    class="form-control form-control-color" />
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Textos
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <div class="color-picker">
                  <label for="color-nombre">Color del nombre:</label>
                  <input type="color" v-model="colores.nombre" id="color-nombre"
                    class="form-control form-control-color" />
                </div>
                <div class="color-picker">
                  <label for="color-tituloDeInvitacion">Color para la invitacion:</label>
                  <input type="color" v-model="colores.tituloDeInvitacion" id="color-tituloDeInvitacion"
                    class="form-control form-control-color" />
                </div>
                <div class="color-picker">
                  <label for="color-edad">Color de la edad:</label>
                  <input type="color" v-model="colores.edad" id="color-edad" class="form-control form-control-color" />
                </div>
                <div class="color-picker">
                  <label for="color-fecha">Color de la fecha:</label>
                  <input type="color" v-model="colores.fecha" id="color-fecha"
                    class="form-control form-control-color" />
                </div>
                <div class="color-picker">
                  <label for="color-hora">Color de la hora:</label>
                  <input type="color" v-model="colores.hora" id="color-hora" class="form-control form-control-color" />
                </div>
                <div class="color-picker">
                  <label for="color-tituloDeEspera">Color para "Te Esperamos":</label>
                  <input type="color" v-model="colores.tituloDeEspera" id="color-tituloDeEspera"
                    class="form-control form-control-color" />
                </div>
                <div class="color-picker">
                  <label for="color-ubicacion">Color de la ubicacion:</label>
                  <input type="color" v-model="colores.ubicacion" id="color-ubicacion"
                    class="form-control form-control-color" />
                </div>
              </div>
            </div>
          </div>
          <button @click="restablecerColores" class="btn btn-secondary mt-3">Restablecer Colores</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import html2canvas from 'html2canvas';

export default {
  data() {
    return {
      nombre: '',
      edad: '',
      fecha: '',
      hora: '',
      horaFin: '',
      colores: {
        /*Fondo*/
        encabezado: '#363636',
        circulos: '#363636',
        estrellas: '#363636',
        /*Textos*/
        nombre: '#FFFFFF',
        tituloDeInvitacion: '#FFFFFF',
        edad: '#363636',
        fecha: '#363636',
        hora: '#363636',
        tituloDeEspera: '#363636',
        ubicacion: '#363636',
      },
      coloresPredeterminados: {
        /*Fondo*/
        encabezado: '#363636',
        circulos: '#363636',
        estrellas: '#363636',
        /*Textos*/
        nombre: '#FFFFFF',
        tituloDeInvitacion: '#FFFFFF',
        edad: '#363636',
        fecha: '#363636',
        hora: '#363636',
        tituloDeEspera: '#363636',
        ubicacion: '#363636',
      }
    };
  },
  methods: {
    saveSVG() {
      const svgElement = document.getElementById('mySvg');
      const svgData = svgElement.outerHTML;
      localStorage.setItem('savedSVG', svgData);
      alert('SVG guardado en localStorage');
    },
    loadSVG() {
      const savedSVG = localStorage.getItem('savedSVG');
      if (savedSVG) {
        const svgContainer = document.getElementById('mySvg');
        svgContainer.outerHTML = savedSVG;
      } else {
        alert('No hay SVG guardado en localStorage');
      }
    },
    guardarColoresEnLocalStorage() {
      localStorage.setItem('colores', JSON.stringify(this.colores));
    },
    cargarColoresDeLocalStorage() {
      const coloresGuardados = localStorage.getItem('colores');
      if (coloresGuardados) {
        this.colores = JSON.parse(coloresGuardados);
      }
    },
    restablecerColores() {
      this.colores = { ...this.coloresPredeterminados };
    },
    formatHora(hora, defaultHora) {
      if (!hora) {
        hora = defaultHora;
      }
      const [hours, minutes] = hora.split(':');
      const formattedHours = hours.startsWith('0') ? hours.slice(1) : hours;
      if (minutes === '00') {
        return `${formattedHours}hs`;
      }
      return `${formattedHours}:${minutes}`;
    },
    downloadColumnaTarjeta() {
    const element = this.$refs.columnaTarjeta;
    html2canvas(element).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'invitacion.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  },
    formatFecha(fecha) {
      if (!fecha) return '18/12/2024'; // Valor por defecto
      const [year, month, day] = fecha.split('-');
      return `${day}/${month}/${year}`;
    },
  },
  watch: {
    colores: {
      deep: true,
      handler() {
        this.guardarColoresEnLocalStorage();
      }
    }
  },
  mounted() {
    this.cargarColoresDeLocalStorage();

    // Verificar si la tipografía se carga correctamente
    const fontName = "Cooper Black";
    const font = new FontFaceObserver(fontName);

    font.load().then(() => {
      console.log(`La tipografía "${fontName}" se ha cargado correctamente.`);
    }).catch(() => {
      console.error(`Error al cargar la tipografía "${fontName}".`);
    });
    
  }
};
</script>

<style scoped>
  @import url('https://fonts.cdnfonts.com/css/cooper-black');

.invitacion-container {
  text-align: center;
  margin: 20px;
}

.tituloPrincipal {
  font-family: roboto;
  margin-top: 4%;
  color: #363636;
  padding: 1rem 0;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.row {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}

.columna-formulario,
.columna-tarjeta,
.columna-acordeon {
  width: 30%;
}

.columna-tarjeta {
  margin-left: 45px;
  margin-top: 1%;
}

.fondoSVG-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
}

.fondoSVG {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  border: #363636 solid 1px;
}

.tarjeta {
  padding: 0;
  margin: 0;
}

svg {
  width: 100%;
  height: 100%;
}

/*FORMULARIO*/
.formulario {
  background-color: #ffffff;
  margin: auto;
  width: 90%;
  max-width: 400px;
  padding: 1em 2em;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  font-family: 'Roboto', sans-serif;
}

.formularioTitulo {
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  margin-bottom: 1em;
  color: #333333;
  text-align: center;
}

.contenedorGeneralDelFormulario {
  margin-top: 2em;
  display: grid;
  gap: 2em;
}

.contenedorFormulario {
  position: relative;
}

.inputFormulario {
  width: 100%;
  background: none;
  color: #333333;
  font-size: 1rem;
  padding: 1em 0.5em;
  border: 1px solid #dddddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.labelFormulario {
  position: absolute;
  top: 50%;
  left: 0.75em;
  transform: translateY(-50%);
  background: #ffffff;
  padding: 0 0.25em;
  color: #999999;
  font-size: 1rem;
  transition: top 0.3s, left 0.3s, font-size 0.3s, color 0.3s, transform 0.3s;
  pointer-events: none;
}

.inputFormulario:focus+.labelFormulario,
.inputFormulario:not(:placeholder-shown)+.labelFormulario,
.inputFormulario:valid+.labelFormulario {
  top: -0.75em;
  left: 0.5em;
  font-size: 0.75rem;
  color: #007BFF;
  transform: translateY(0%);
}

.inputFormulario:focus,
.inputFormulario:not(:placeholder-shown):not([type="date"]):not([type="time"]) {
  border-color: #007BFF;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.crearFormulario {
  width: 100%;
  background: #007BFF;
  color: #ffffff;
  margin-top: 10px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  padding: 1em 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s, box-shadow 0.3s;
}

.crearFormulario:hover {
  background: #0056b3;
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.2);
}

.lineaFormulario {
  display: none;
}

/*TARJETA*/
.tituloInicial {
  font-family: 'Cooper Black', sans-serif;
  font-size: 0.8px;
}

.nombre {
  font-family: 'Cooper Black', sans-serif;
  font-size: 2px !important;
}

.edad {
  font-family: 'Cooper Black', sans-serif;
  font-size: 1.8px !important;
}

.fecha {
  font-family: 'Cooper Black', sans-serif;
  font-size: 1px !important;
}

.hora {
  font-family: 'Cooper Black', sans-serif;
  font-size: 0.9px !important;
}

.tituloDeEspera {
  font-family: 'Cooper Black', sans-serif;
  font-size: 1px !important;
}

.yoko {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 1px !important;
}

.eventos {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 0.4px !important;
}

.ubicacion {
  font-family: 'Cooper Black', sans-serif;
  font-size: 0.6px !important;
}

/*Selector*/
.columna-acordeon {
  margin-left: 50px;
  margin-top: 20px;
}

.accordion-body {
  max-height: 500px;
  overflow-y: auto;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.color-picker label {
  font-weight: bold;
  color: #333;
}

.form-control-color {
  height: 3rem;
  width: 100%;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
}

.form-control-color::-webkit-color-swatch-wrapper {
  padding: 0;
}

.form-control-color::-webkit-color-swatch {
  border: none;
}

@media (max-width: 1024px) {
  .tituloPrincipal {
    padding-top: 40px;
  }

  .row {
    flex-direction: row;
    gap: 1rem;
  }

  .columna-formulario,
  .columna-tarjeta {
    flex: 1;
    min-width: 45%;
  }

  .columna-tarjeta {
    margin-left: -50px;
  }

  .formulario {
    margin-top: 20px;
    padding: 1em 2em;
  }

  .columna-acordeon {
    flex: 1;
    padding: 2rem;
    min-width: 10%;
    margin-right: 8%;
  }

  .crearFormulario {
    margin-bottom: 18px;
    margin-top: 25px;
  }
}

@media (max-width: 768px) {
  .row {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tituloPrincipal {
    font-size: 2rem;
  }

  .columna-formulario {
    margin: auto;
    display: flex;
    justify-content: center;
    min-width: 100%;
    padding: 0.5rem;
  }

  .columna-tarjeta {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 70%;
    padding: 0.5rem;
  }

  .columna-acordeon {
    margin: auto;
    min-width: 70%;
  }

  .formulario,
  .tarjeta {
    margin-bottom: 1rem;
  }

  .fondoSVG {
    height: auto;
  }

  .crearFormulario {
    font-size: 1rem;
    padding: 0.5rem;
  }
}

@media (max-width: 735px) {
  .fondoSVG {
    height: auto;
    max-height: 100%;
    display: flex;
    align-items: center;
  }

  .tarjeta {
    margin: 0;
    padding: 0;
  }
}

@media (max-width: 600px) {
  .fondoSVG {
    height: auto !important;
    display: flex;
    align-items: center;
  }

  .tarjeta {
    margin: 0;
  }
}

@media (max-width: 480px) {
  .fondoSVG {
    height: 80%;
    display: flex;
    align-items: center;
  }

  .tarjeta {
    margin: 0 !important;
  }

  .columna-acordeon {
    padding: 0%;
  }
}

@media (max-width: 320px) {
  .columna-tarjeta {
    width: 100%;
  }

  .fondoSVG {
    height: 70%;
    display: flex;
    align-items: center;
  }

  .tarjeta {
    margin: 0;
  }
}
</style>