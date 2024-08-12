<template>
    <main>
        <div class="encabezado">
            <h1>Contacto</h1>
        </div>
        <section class="informacionDeContacto">
            <div class="horarioDeAtencion">
                <h2>Horarios de atención</h2>
                <p>De lunes a sábado de 17:00 a 20:00 hs</p>
                <div class="masInformacion">
                    <p><span><i class="fa-brands fa-whatsapp"></i></span> +54 9 11 5111-6550</p>
                    <p><span><i class="fa-solid fa-location-dot"></i> Miranda 4655</span></p>
                </div>
            </div>
        </section>
        <div class="grillaDelContenedor">
            <section class="formularioDeContacto">
                <h2>Envíanos un mensaje</h2>
                <form @submit.prevent="enviarFormulario">
                    <div class="contenedorDeEntrada">
                        <label for="nombre">Nombre:</label>
                        <input type="text" id="nombre" v-model="nombre" required />
                    </div>
                    <div class="contenedorDeEntrada">
                        <label for="email">Email:</label>
                        <input type="email" id="email" v-model="email" required />
                    </div>
                    <div class="contenedorDeEntrada">
                        <label for="mensaje">Mensaje:</label>
                        <textarea id="mensaje" v-model="mensaje" required></textarea>
                    </div>
                    <button type="submit" class="submit-button">Enviar</button>
                    <p v-if="error" class="error">{{ error }}</p>
                    <p v-if="mensajeExito" class="success">{{ mensajeExito }}</p>
                </form>
            </section>
            <section id="mapa">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13133.422037039496!2d-58.5020176!3d-34.6204553!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc965202d38d7%3A0x52f52b34a6348c8!2sYoko%20Eventos!5e0!3m2!1ses!2sar!4v1719484144455!5m2!1ses!2sar"
                    style="border: 0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </section>
        </div>
    </main>
</template>
<script>
export default {
  data() {
    console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL); // Verifica si la variable está cargada
    return {
      nombre: '',
      email: '',
      mensaje: '',
      error: null,
      mensajeExito: null,
      apiUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000/api',
    };
  },
  methods: {
    async enviarFormulario() {
      this.error = null;
      this.mensajeExito = null;

      console.log(`Enviando solicitud a: ${this.apiUrl}/contacto/`); // Verifica la URL

      try {
        const response = await fetch(`${this.apiUrl}/contacto/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: this.nombre,
            email: this.email,
            mensaje: this.mensaje,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text(); // Maneja respuestas no JSON
          throw new Error(errorText || 'Error al enviar el formulario');
        }

        const data = await response.json();
        this.mensajeExito = data.message;
        this.error = null;

        // Limpiar el formulario después de enviarlo
        this.nombre = '';
        this.email = '';
        this.mensaje = '';
      } catch (err) {
        console.error('Error en la solicitud fetch:', err); // Imprime el error completo
        this.error = err.message || 'Error al enviar el formulario';
        this.mensajeExito = null;
      }
    },
  },
};
</script>









<style scoped>
.encabezado {
    margin-top: 4%;
    color: #363636;
    padding: 1rem 0;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.informacionDeContacto {
    text-align: center;
    margin: 2rem 0;
}

.horarioDeAtencion {
    margin-top: 1rem;
    font-size: 1.1rem;
    padding: 1rem;
    border-radius: 8px;
}

.masInformacion {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.grillaDelContenedor {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    margin-bottom: 5%;
}

.formularioDeContacto,
#mapa {
    width: 100%;
    padding: 2rem;
    border: none;
    border-radius: 10px;
    background-color: #FBFCFF;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.formularioDeContacto {
    display: flex;
    flex-direction: column;
}

.formularioDeContacto h2 {
    text-align: center;
    font-weight: 400;
    margin-bottom: 1.5rem;
    color: #363636;
}

.formularioDeContacto form {
    width: 100%;
}

.contenedorDeEntrada {
    width: 100%;
    margin-bottom: 1.5rem;
}

.contenedorDeEntrada label {
    display: block;
    margin-bottom: 0.5rem;
    color: #363636;
}

.contenedorDeEntrada input,
.contenedorDeEntrada textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #363636;
    border-radius: 5px;
    font-size: 1rem;
    color: #363636;
}

.contenedorDeEntrada input:focus,
.contenedorDeEntrada textarea:focus {
    border-color: linear-gradient(180deg, #3793FF 0%, #0017E4 40%, #0017E4 100%);
    outline: none;
    box-shadow: 0 0 5px rgba(55, 147, 255, 0.2);
}

.contenedorDeEntrada textarea {
    resize: vertical;
    min-height: 150px;
}

.submit-button {
    width: 100%;
    padding: 1rem;
    background: #363636;
    color: #FBFCFF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: #0056b3;
}

.error {
    color: red;
    text-align: center;
    margin-top: 1rem;
}

.success {
    color: green;
    text-align: center;
    margin-top: 1rem;
}

#mapa iframe {
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 10px;
}

@media (max-width: 1024px) {
    .encabezado {
        margin-top: 7%;
    }

    .header {
        margin-top: 6%;
    }
}

@media (max-width: 768px) {
    .encabezado {
        margin-top: 9%;
    }

    .header {
        margin-top: 10%
    }
}

@media (max-width: 550px) {
    .encabezado {
        margin-top: 14%;
    }

    .header {
        margin-top: 15%
    }

    .grillaDelContenedor {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        width: 90%;
        max-width: 1200px;
        margin: 0 auto;
        margin-bottom: 5%;
    }

    #mapa iframe {
        width: 100%;
        height: 500px;
        border: 0;
        border-radius: 10px;
    }

    @media (max-width: 376px) {
        .encabezado {
            margin-top: 19%;
        }
    }
}
</style>
