// Validaciones por campo
const campos = {
  nombre: v => v.length > 6 && v.includes(' '),
  email: v => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v),
  password: v => /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(v),
  repetir: v => v === document.getElementById('password').value,
  edad: v => parseInt(v) >= 18,
  telefono: v => /^\d{7,}$/.test(v),
  direccion: v => /[a-zA-Z]/.test(v) && /\d/.test(v) && v.includes(' ') && v.length >= 5,
  ciudad: v => v.length >= 3,
  cp: v => v.length >= 3,
  dni: v => /^\d{7,8}$/.test(v)
};


// Recorremos todos los campos para agregar eventos blur y focus
for (const id in campos) {
  const input = document.getElementById(id);
  const error = document.getElementById('error-' + id);

  // Validar al salir del campo
  input.addEventListener('blur', () => {
    if (!campos[id](input.value)) {
      error.textContent = 'Campo inválido.';
    }
  });

  // Limpiar error al volver a enfocar
  input.addEventListener('focus', () => {
    error.textContent = '';
  });
}

// BONUS: título que cambia en tiempo real con el nombre
const titulo = document.getElementById("titulo");
const nombreInput = document.getElementById("nombre");

// Evento cuando se escribe en el campo nombre
nombreInput.addEventListener("keydown", () => {
  setTimeout(() => {
    titulo.textContent = "HOLA " + nombreInput.value.toUpperCase();
  }, 0);
});

// También al hacer foco
nombreInput.addEventListener("focus", () => {
  titulo.textContent = "HOLA " + nombreInput.value.toUpperCase();
});

// Validación completa al enviar
document.getElementById('formulario').addEventListener('submit', (e) => {
  e.preventDefault();
  let errores = [];

  // Validar todos los campos
  for (const id in campos) {
    const valor = document.getElementById(id).value;
    if (!campos[id](valor)) {
      errores.push(id);
      document.getElementById('error-' + id).textContent = 'Campo inválido.';
    }
  }

  // Mostrar errores o datos
  if (errores.length > 0) {
    alert('Hay errores en: ' + errores.join(', '));
  } else {
    let datos = '';
    for (const id in campos) {
      const valor = document.getElementById(id).value;
      datos += `${id}: ${valor}\n`;
    }
    alert("Formulario enviado correctamente:\n" + datos);
  }
});
