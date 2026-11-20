/* ============================
   CLÍNICA SALUDPLUS - script.js
   ============================ */

// ===== 1. MENÚ HAMBURGUESA (MÓVIL) =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

// ===== 2. SCROLL SUAVE EN NAVEGACIÓN =====
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
  enlace.addEventListener('click', (e) => {
    e.preventDefault();
    const destino = document.querySelector(enlace.getAttribute('href'));
    if (destino) {
      const offset = 80;
      const posicion = destino.offsetTop - offset;
      window.scrollTo({
        top: posicion,
        behavior: 'smooth'
      });
    }
  });
});

// ===== 3. FORMULARIO DE CITAS =====
const formCita = document.getElementById('formCita');
const mensajeCita = document.getElementById('mensajeCita');

if (formCita) {
  // Fecha mínima (hoy)
  const fechaInput = document.getElementById('fecha');
  const hoy = new Date().toISOString().split('T')[0];
  fechaInput.setAttribute('min', hoy);

  formCita.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const fecha = document.getElementById('fecha').value;
    const especialidad = document.getElementById('especialidad').value;

    // Validación
    if (!nombre || !telefono || !fecha || !especialidad) {
      mensajeCita.className = 'mensaje-cita error';
      mensajeCita.innerHTML = '⚠️ Por favor complete todos los campos.';
      return;
    }

    if (telefono.length < 9) {
      mensajeCita.className = 'mensaje-cita error';
      mensajeCita.innerHTML = '⚠️ El teléfono debe tener al menos 9 dígitos.';
      return;
    }

    // Formatear fecha
    const fechaFormateada = new Date(fecha + 'T00:00:00').toLocaleDateString('es-PE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Mensaje de éxito
    mensajeCita.className = 'mensaje-cita exito';
    mensajeCita.innerHTML = `✅ ¡Gracias ${nombre}!<br>Su cita de <strong>${especialidad}</strong> fue registrada para el <strong>${fechaFormateada}</strong>.<br>Le llamaremos al <strong>${telefono}</strong>.`;

    // Guardar en localStorage
    const citas = JSON.parse(localStorage.getItem('citasSaludPlus')) || [];
    citas.push({
      nombre,
      telefono,
      fecha,
      especialidad,
      registradaEn: new Date().toISOString()
    });
    localStorage.setItem('citasSaludPlus', JSON.stringify(citas));

    // Limpiar formulario
    formCita.reset();

    // Ocultar mensaje después de 8 segundos
    setTimeout(() => {
      mensajeCita.className = 'mensaje-cita';
      mensajeCita.innerHTML = '';
    }, 8000);
  });
}

// ===== 4. ANIMACIONES AL HACER SCROLL =====
const elementosFade = document.querySelectorAll('.card-servicio, .card-horario, .card-contacto, .form-cita');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in', 'visible');
    }
  });
}, {
  threshold: 0.1
});

elementosFade.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== 5. BOTÓN VOLVER ARRIBA =====
const btnArriba = document.getElementById('btnArriba');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btnArriba.classList.add('visible');
  } else {
    btnArriba.classList.remove('visible');
  }
});

btnArriba.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== 6. RESALTAR ENLACE ACTIVO EN NAVEGACIÓN =====
const secciones = document.querySelectorAll('section[id]');
const enlacesNav = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
  let actual = '';
  secciones.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) {
      actual = sec.getAttribute('id');
    }
  });

  enlacesNav.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${actual}`) {
      a.style.color = '#0077b6';
    }
  });
});

// ===== 7. CONTADOR DE VISITAS (LOCAL) =====
window.addEventListener('load', () => {
  const visitas = parseInt(localStorage.getItem('visitasSaludPlus') || '0') + 1;
  localStorage.setItem('visitasSaludPlus', visitas);
  console.log(`Bienvenido a la Clínica SaludPlus 🏥 - Visita #${visitas}`);
});

// ===== 8. EFECTO DE ESCRITURA EN EL HERO =====
const heroTitle = document.querySelector('.hero-text h1');
if (heroTitle) {
  const textoOriginal = heroTitle.innerHTML;
  heroTitle.style.opacity = '0';
  setTimeout(() => {
    heroTitle.style.transition = 'opacity 1s ease';
    heroTitle.style.opacity = '1';
  }, 300);
}

// ===== 9. VALIDACIÓN EN TIEMPO REAL DEL TELÉFONO =====
const telefonoInput = document.getElementById('telefono');
if (telefonoInput) {
  telefonoInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  });
}
