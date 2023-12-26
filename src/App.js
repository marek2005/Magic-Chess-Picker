import './estilos.css';

// Menu desplegable
var checkbox = document.getElementById('checkbox');
var options = document.getElementById('menu');

options.style.display = 'none';

checkbox.addEventListener('change', function() {
  options.style.display = checkbox.checked ? 'block' : 'none';
});

function App() {
  return (
    <>
    {/* HEADER */}
    <header id="encabezado-de-la-pagina-principal">
      <ul id="listadoDeObjetos">
        <li className="Logo-CodevaMP">
          <a href="index.html" id="logoLink">
            <img id="Logo-CodevaMP-Blanco logo" src="Imagenes/Logo-CodevaMP-Blanco.png" alt="Logo" />
          </a>
        </li>

        <li id="contenido-del-header">
          <nav id="menu-desplegable">
          <input id="checkbox" type="checkbox" />
          <label className="toggle" for="checkbox">
            <div id="bar1" className="bars"></div>
            <div id="bar2" className="bars"></div>
            <div id="bar3" className="bars"></div>
          </label>

          <ul id="menu" className="menu">
            <li><a href="index.html">Inicio</a></li>
            <li><a href="Magic-Chess-Picker.html">Magic Chess Picker</a></li>
          </ul>
          </nav>
        </li>
        
        <li id="barra-de-busqueda">
          <form className="barra-de-busqueda">
            <button>
              <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
            <input className="input" placeholder="Buscar" type="text" />
            <button className="reset" type="reset">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </form>
        </li>
      </ul>
    </header>

    <main>
      
    </main>
    </>
  );
}
export default App;