import './estilos.css';

function App() {
  return (
    <>
    {/* HEADER */}
    <header id="encabezado-de-la-pagina-principal">
      <ul id="listadoDeObjetos">
        <li className="Logo-CodevaMP">
          <a href="index.html" id="logoLink">
            <img id="Logo-CodevaMP-Blanco" src="Imagenes/Logo-CodevaMP-Blanco.png" alt="Logo" />
          </a>
        </li>

        <li id="contenido-del-header">
          <nav id="menu-desplegable">
            <input id="checkbox" type="checkbox" />
            <label className="toggle" htmlFor="checkbox">
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
                <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
            <input className="input" placeholder="Buscar" required="" type="text" />
            <button className="reset" type="reset">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </form>
        </li>
      </ul>
    </header>

    <FiltroDeComandantes />
    </>
  );
}

function FiltroDeComandantes() {
  // return <aside>Filtro de Comandantes</aside>;
}

export default App;