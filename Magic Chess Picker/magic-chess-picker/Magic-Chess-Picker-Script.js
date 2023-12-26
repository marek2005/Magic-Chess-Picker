// seleccionando elementos del DOM
const listaDeComandantes = document.querySelector(".objetos-container")

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
  // Ordenar los comandantes alfabéticamente por nombre
  datosComandante.sort((a, b) => a.nombre.localeCompare(b.nombre));


  const htmlCom = datosComandante.map(
    (comandante) => `
    <div class="objeto" onclick="activarObjeto(this)">
      <div class="verde"></div>
      <span class="nombre-comandante">${comandante.nombre}</span>
      <img class="img-comandante" src="${comandante.imagen}" alt="${comandante.nombre}" draggable="false">
    </div>
  `
  );
  const html = htmlCom.join("");
  listaDeComandantes.insertAdjacentHTML("afterbegin", html);
}

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

  for (var i = 0; i < objetos.length; i++) {
    var textoObjeto = objetos[i].innerText.toLowerCase();
    // Mostrar objetos que coinciden con el filtro, ocultar los demás
    if (textoObjeto.includes(filtro)) {
      objetos[i].classList.remove('oculto');
    } else {
      objetos[i].classList.add('oculto');
    }
  }
}

// seleccionar comandante

function activarObjeto(comandanteElement) {
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
  }
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

// Section de la Pagina

function createDescripcionDeComandantes(descripcion) {
  if (Array.isArray(descripcion) && descripcion.length > 0) {
    const infoComandante = document.getElementById('info-comandante');

    if ('nombreHabilidad' in descripcion[0]) {
      const nombreComandante = escapeQuotes(descripcion[0].nombreComandante);
      const numeroHabilidad = escapeQuotes(descripcion[0].numeroHabilidad);
      const descripcionHabilidad = escapeQuotes(descripcion[0].descripcionHabilidad);
      const nombreHabilidad = escapeQuotes(descripcion[0].nombreHabilidad);
      const datosAdicionalesHabilidad = escapeQuotes(descripcion[0].datosAdicionalesHabilidad);
      const imagenComandante = escapeQuotes(descripcion[0].imagenComandante);
      const imagenHabilidad = escapeQuotes(descripcion[0].imagenHabilidad);

      // Renderización en HTML
      infoComandante.innerHTML = `
      <div class="nombre-comandante-section">
        <h2>${nombreComandante}</h2>
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
              <img src="${escapeQuotes(habilidad.imagenHabilidad)}" alt="${escapeQuotes(habilidad.nombreHabilidad)}">
            </div>
          `).join('')}
        </div>
        <div class="expandir"></div>
      </div>
      `;
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
        <h3>${nombreHabilidad}</h3>
        <p>Descripción: ${descripcionHabilidad}</p>
      </div>
  `;

  // Verificar si datosAdicionalesHabilidad no es null
  if (datosAdicionalesHabilidad && datosAdicionalesHabilidad !== "null") {
    contenidoHTML += `
      <div class="flecha-expandir" onclick="mostrarInformacionAdicional(this)">
        <span>&#9660;</span>
      </div>
      <div class="informacion-adicional oculto">
        <p class="datos-adicionales">${datosAdicionalesHabilidad}</p>
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
