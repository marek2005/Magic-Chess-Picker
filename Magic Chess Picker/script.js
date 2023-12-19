var checkbox = document.getElementById('checkbox');
var options = document.getElementById('menu');

options.style.display = 'none';

checkbox.addEventListener('change', function() {
  options.style.display = checkbox.checked ? 'block' : 'none';
});


// discord_request.js

function enviarMensajeADiscord() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'discord_webhook.php', true);
  xhr.send();
}

// Llama a la función cuando se carga la página
window.onload = function() {
  // Asocia la función al clic en el logo
  var logoLink = document.getElementById('logoLink');
  if (logoLink) {
      logoLink.addEventListener('click', function(event) {
          // Evita que el enlace redireccione (opcional)
          event.preventDefault();

          // Llama a la función para enviar el mensaje a Discord
          enviarMensajeADiscord();
      });
  }
};
