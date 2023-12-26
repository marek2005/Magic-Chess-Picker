// seleccionando elementos del DOM
const listaDeComandantes = document.querySelector(".objetos-container");

// Create DOM elements: Render facts in list
listaDeComandantes.innerHTML = "";

// llamando a la base de datos
cargarComandantes();

async function cargarComandantes () {
  const res = await fetch(
      "https://tvmadfsetobjrifdvbcf.supabase.co/rest/v1/Seleccion-de-Comandantes",
      {
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2bWFkZnNldG9ianJpZmR2YmNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyODAwMzQsImV4cCI6MjAxODg1NjAzNH0.JFpPbAYBw8QyWIi0LHJ8w3JsNu_Bt0m64MFUDnuayv8",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2bWFkZnNldG9ianJpZmR2YmNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyODAwMzQsImV4cCI6MjAxODg1NjAzNH0.JFpPbAYBw8QyWIi0LHJ8w3JsNu_Bt0m64MFUDnuayv8",
        },
      }
    );
    const datos = await res.json();
    crearListaDeComandantes(datos);
}

function crearListaDeComandantes(datosComandante) {
  // Limpiar el contenido existente del contenedor
  listaDeComandantes.innerHTML = "";

  // Ordenar los comandantes alfabéticamente por nombre
  datosComandante.sort((a, b) => a.nombre.localeCompare(b.nombre));

  const htmlCom = datosComandante.map(
    (comandante) => `
      <div 
        data-nombre="${comandante.nombre}" 
        data-imagen="${comandante.imagen}" 
        data-videocomandante1="${comandante.videoComandante1}"
        class="objeto" onclick="activarObjeto(this)">
        <div class="verde"></div>
        <span class="nombre-comandante">${comandante.nombre}</span>
        <img class="img-comandante" src="${comandante.imagen}" alt="${comandante.nombre}" draggable="false">
      </div>
    `
  );

  const html = htmlCom.join("");
  listaDeComandantes.insertAdjacentHTML("afterbegin", html);
}


// Primero, define la función cambiarFuenteVideoDeFondo fuera de cualquier función
function cambiarFuenteVideoDeFondo(nuevaFuente) {
  const videoElement = document.getElementById('backgroundVideo');

  // Cambiar la fuente del video
  videoElement.src = nuevaFuente;

  // Recargar y reproducir el nuevo video
  videoElement.load();
  videoElement.play().catch(error => {
    console.error('Error al reproducir el video:', error.message);
  });
}

let infoComandante;

function activarObjeto(comandanteElement) {
  var nombre = comandanteElement.dataset.nombre;
    var imagen = comandanteElement.dataset.imagen;
    var video1 = comandanteElement.dataset.videocomandante1;

    // Mostrar el botón de toggleIcon
    const toggleIcon = document.getElementById('toggleIcon');
    toggleIcon.style.display = 'flex';

    // Cambiar el padding del main
    const mainElement = document.querySelector('main');
    mainElement.style.padding = '0 64px 64px 64px';

    // Desactivar todos los elementos
    const todosObjetos = document.querySelectorAll('.objeto');
    todosObjetos.forEach((elemento) => {
        elemento.querySelector('.verde').classList.remove('visible');
    });

    // Limpiar el contenedor de información del comandante anterior
    const infoComandante = document.getElementById('info-comandante');
    infoComandante.innerHTML = '';

    // Activar el elemento actual
    comandanteElement.querySelector('.verde').classList.toggle('visible');

  // Obtener el nombre del comandante clickeado
  const nombreDelComandante = comandanteElement.querySelector('.nombre-comandante');
  if (nombreDelComandante) {
    const nombreParaConsolaHabilidad1 = nombreDelComandante.textContent;
    // console.log(nombreParaConsolaHabilidad1);

  // Llamar a la función para cargar y mostrar la descripción del comandante
  cargarDescripcionDeComandantes(nombreParaConsolaHabilidad1);

  // Llamar a la función para cambiar la fuente del video de fondo
  cambiarFuenteVideoDeFondo(video1);
  }

  // Cambiar el color de fondo del objeto con ID 'info-comandante'
  const infoComandanteObjeto = document.getElementById('info-comandante');
  if (infoComandanteObjeto) {
    infoComandanteObjeto.style.backgroundColor = 'rgba(41,48,82,0.9)'; // Cambia 'tu-color-aqui' al color deseado
  }
}





// Llamada a la función con un ejemplo de nombre
cargarComandantes("angela");

//menu desplegable
var checkbox = document.getElementById('checkbox');
var options = document.getElementById('menu');

options.style.display = 'none';

checkbox.addEventListener('change', function() {
  options.style.display = checkbox.checked ? 'block' : 'none';
});

//Filtro de Comandantes
function filtrarObjetos() {
  var filtro = document.getElementById('filtro').value.toLowerCase();
  var objetos = document.getElementsByClassName('objeto');
  var limpiarBtn = document.querySelector('.limpiar-btn');

  for (var i = 0; i < objetos.length; i++) {
    var textoObjeto = objetos[i].querySelector('.nombre-comandante').textContent.toLowerCase();
    // Mostrar objetos que coinciden con el filtro, ocultar los demás
    if (textoObjeto.includes(filtro)) {
      objetos[i].classList.remove('oculto');
    } else {
      objetos[i].classList.add('oculto');
    }
  }

  // Mostrar u ocultar el botón "X" según el contenido del filtro
  limpiarBtn.style.display = filtro ? 'block' : 'none';
}

function limpiarFiltro() {
  document.getElementById('filtro').value = '';
  filtrarObjetos();
}



// llamando Base de Datos 2

async function cargarDescripcionDeComandantes(nombreComandante) {
  const res = await fetch(
    `https://tvmadfsetobjrifdvbcf.supabase.co/rest/v1/Descripcion-de-Comandantes?nombreComandante=eq.${nombreComandante}`,
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2bWFkZnNldG9ianJpZmR2YmNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyODAwMzQsImV4cCI6MjAxODg1NjAzNH0.JFpPbAYBw8QyWIi0LHJ8w3JsNu_Bt0m64MFUDnuayv8",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2bWFkZnNldG9ianJpZmR2YmNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyODAwMzQsImV4cCI6MjAxODg1NjAzNH0.JFpPbAYBw8QyWIi0LHJ8w3JsNu_Bt0m64MFUDnuayv8",
      },
    }
  );
  const descripciones = await res.json();
  // Ordenar la respuesta por el campo 'numeroHabilidad'
  descripciones.sort((a, b) => {
    const numeroA = parseFloat(a.numeroHabilidad.replace(/[^0-9.-]+/g, ""));
    const numeroB = parseFloat(b.numeroHabilidad.replace(/[^0-9.-]+/g, ""));
    return numeroA - numeroB;
  });

  // Invertir el orden para que sea descendente
  descripciones.reverse();

  // console.log(descripciones);
  createDescripcionDeComandantes(descripciones);
}

// Función para escapar comillas dobles dentro de una cadena
const escapeQuotes = (str) => str ? str.replace(/"/g, '&quot;') : '';

let comandanteSectionActivo = false;


// Section de la Pagina

function createDescripcionDeComandantes(descripcion) {
  let imagenSeleccionada = null;

  if (Array.isArray(descripcion) && descripcion.length > 0) {
    const infoComandante = document.getElementById('info-comandante');

    if ('nombreHabilidad' in descripcion[0]) {
      const nombreComandante = escapeQuotes(descripcion[0].nombreComandante);

      // Verificar si el contenedor ya está activo
      const nombreComandanteSection = document.querySelector('.nombre-comandante-section');
      if (nombreComandanteSection && nombreComandanteSection.classList.contains('activo')) {
        // Si ya está activo, no hacer nada
        return;
      }

      // Renderización en HTML
      infoComandante.innerHTML = `
        <div class="nombre-comandante-section activo">
          <br>
          <h2>${nombreComandante}</h2>
          <br>
          <div class="contenedor-habilidades">
            ${descripcion.slice(0, 3).map((habilidad, index) => `
              <div 
                data-nombre-habilidad="${escapeQuotes(habilidad.nombreHabilidad)}" 
                data-nombre-comandante="${nombreComandante}" 
                data-descripcion-habilidad="${escapeQuotes(habilidad.descripcionHabilidad)}" 
                data-datos-adicionales-habilidad="${escapeQuotes(habilidad.datosAdicionalesHabilidad)}"
                data-imagen-comandante="${escapeQuotes(habilidad.imagenComandante)}"
                data-imagen-habilidad="${escapeQuotes(habilidad.imagenHabilidad)}" 
                class="Habilidad" onclick="mostrarClase(this)">
                <img class="imagenes-habilidades" src="${escapeQuotes(habilidad.imagenHabilidad)}" alt="${escapeQuotes(habilidad.nombreHabilidad)}">
                <div class="nombre-habilidad-imagen-habilidad">
                  <h3>${escapeQuotes(habilidad.nombreHabilidad)}</h3>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="expandir"></div>
        </div>
      `;

      // Agregar el manejo de clic para hacer el nombre más grande y restablecer el tamaño de la imagen anterior
      const habilidades = document.querySelectorAll('.Habilidad');

      habilidades.forEach(habilidad => {
        habilidad.addEventListener('click', function() {
          // Restablecer el tamaño de la imagen anterior
          if (imagenSeleccionada !== null) {
            imagenSeleccionada.style.fontSize = '1em'; // Tamaño normal
          }

          // Hacer la nueva imagen más grande
          this.style.fontSize = '1.1em'; // Puedes ajustar el tamaño según tus necesidades

          // Actualizar la imagen seleccionada
          imagenSeleccionada = this;
        });
      });
    }
  }
}

// Descripcion de Habilidades

function mostrarClase(elemento) {
  var nombreHabilidad = elemento.dataset.nombreHabilidad;
  var descripcionHabilidad = elemento.dataset.descripcionHabilidad;
  var datosAdicionalesHabilidad = elemento.dataset.datosAdicionalesHabilidad;
  var nombreComandante = elemento.dataset.nombreComandante;
  var imagenHabilidad = elemento.dataset.imagenHabilidad;
  var imagenComandante = elemento.dataset.imagenComandante;

  
  // Crear un nuevo div debajo del div clicado
  var nuevoDiv = document.querySelector('.expandir');
  nuevoDiv.innerHTML = ''; // Limpiar contenido existente

  // Ejemplo de contenido HTML dinámico
  var contenidoHTML = `
    <div class="info-habilidad">
      <div class="contenido">
        <div class="contenedor-nombre-habilidad">
          <h3 class="nombre-habilidad">${nombreHabilidad}</h3>
        </div>
        <p class="descripcion-habilidad">
          <span class="primera-palabra-habilidad">${descripcionHabilidad.split(' ')[0]}</span>
          ${descripcionHabilidad.substring(descripcionHabilidad.indexOf(' ') + 1)}
        </p>
      </div>
  `;

  // Verificar si datosAdicionalesHabilidad no es null
  if (datosAdicionalesHabilidad && datosAdicionalesHabilidad !== "null") {
    contenidoHTML += `
      <div class="flecha-expandir" onclick="mostrarInformacionAdicional(this)">
        <span>&#9660;</span>
      </div>
      <div class="informacion-adicional oculto">
        <p class="datos-adicionales descripcion-habilidad">${datosAdicionalesHabilidad}</p>
      </div>
    `;
  }

  contenidoHTML += `
    </div>
  `;

  // Agregar contenido al DOM
  nuevoDiv.insertAdjacentHTML('beforeend', contenidoHTML);
}

function mostrarInformacionAdicional(elemento) {
  var informacionAdicional = elemento.nextElementSibling;

  // Alternar la clase 'oculto' para mostrar u ocultar la información adicional
  informacionAdicional.classList.toggle('oculto');

  // Cambiar el símbolo de la flecha (▶/▼)
  var flecha = elemento.querySelector('span');
  flecha.textContent = informacionAdicional.classList.contains('oculto') ? '▼' : '▲';
}


document.addEventListener('DOMContentLoaded', function () {
  const toggleIcon = document.getElementById('toggleIcon');
  const side = document.getElementById('side');
  const section = document.getElementById('info-comandante');
  const body = document.body;

  toggleIcon.addEventListener('click', function () {
    side.classList.toggle('side-hidden');

    // Mueve el side sin afectar su posición original
    side.style.transform = side.classList.contains('side-hidden') ? 'translateX(-150%)' : 'translateX(0)';

    // Si el side está oculto, ajusta el estilo del body para ocultar el overflow-x
    if (side.classList.contains('side-hidden')) {
      body.style.overflowX = 'hidden';
    } else {
      // Si el side está visible, espera a que termine la transición y luego restaura el overflow-x
      section.addEventListener('transitionend', function handleTransitionEnd() {
        body.style.overflowX = ''; // Restaura el overflow-x
        section.removeEventListener('transitionend', handleTransitionEnd); // Remueve el event listener
      });
    }

    // Mueve el section sin afectar su posición original
    section.style.transition = 'transform 0.3s ease'; // Aplica la transición al transform
    section.style.transform = side.classList.contains('side-hidden') ? 'translateX(150%)' : 'translateX(0)';

    // Cambia el contenido del toggleIcon (innerHTML)
    const expandIcon = '<svg viewBox="0 0 448 512" height="1em" xmlns="http://www.w3.org/2000/svg" class="expand"><path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"></path></svg>';
    const compressIcon = '<svg viewBox="0 0 448 512" height="1em" xmlns="http://www.w3.org/2000/svg" class="compress"><path d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z"></path></svg>';

    toggleIcon.innerHTML = side.classList.contains('side-hidden') ? expandIcon : compressIcon;
  });
});


