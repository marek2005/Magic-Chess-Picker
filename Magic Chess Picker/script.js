// Menu desplegable
var checkbox = document.getElementById('checkbox');
var options = document.getElementById('menu');

options.style.display = 'none';

checkbox.addEventListener('change', function() {
  options.style.display = checkbox.checked ? 'block' : 'none';
});