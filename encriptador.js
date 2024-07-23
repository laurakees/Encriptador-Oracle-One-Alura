function chequearQueHayaTexto(){
    let textarea = document.getElementById('textarea_1');
    let span1 = document.getElementById('mostrarCartelDeNoyTexto');
    let span2 = document.getElementById('mostrarResultado');    
    let texto = textarea.value.trim();

    if (texto === "") {
        span1.style.display = 'inline';
        span2.style.display = 'none';
    } else {
        span2.style.display = 'flex';
        span1.style.display = 'none';   
    }
    return;
};

function asignarTexto (idElementoHtml, texto){
    let objetoHtml = document.getElementById(idElementoHtml);
    objetoHtml.innerHTML = texto;
    if (objetoHtml.tagName === 'INPUT' || objetoHtml.tagName === 'TEXTAREA') {
        objetoHtml.value = texto;
    } else {
        // Para otros elementos, obtener el texto interno
        objetoHtml.innerText= texto;
    }
    return;
};

function leerTexto(idElementoHtml) {
    let objetoHtml = document.getElementById(idElementoHtml);
    // Verificar si el elemento es un input o textarea
    if (objetoHtml.tagName === 'INPUT' || objetoHtml.tagName === 'TEXTAREA') {
        return objetoHtml.value;
    } else {
        // Para otros elementos, obtener el texto interno
        return objetoHtml.innerText || objetoHtml.textContent;
    }
}

function encriptar(texto) {
    const reglas = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };
    return texto.split('').map(letra => reglas[letra] || letra).join('');
}

function desencriptar(texto) {
    const reglas = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };
    let resultado = texto;
    for (const [clave, valor] of Object.entries(reglas)) {
        resultado = resultado.split(clave).join(valor);
    }
    return resultado;
}

function btnEncriptar () {
    let mensaje= leerTexto ("textarea_1")    
    asignarTexto('respuesta_texto',encriptar(mensaje));  
    limitarLongitudString('respuesta_texto', 750);  
}

function btnDesencriptar () {
    let mensaje= leerTexto ("textarea_1")    
    asignarTexto('respuesta_texto',desencriptar(mensaje));     
}

function resolverModo() {
    let modo =document.querySelector('.pantalla_principal__solicitud__radio-group input[type="radio"]')
    if (modo.checked) {
        if (modo.value == '1') {
            btnEncriptar();
        } else if (modo.value == '2') {
            btnDesencriptar();
        }
    }    
};


function limitarLongitudString(elementId, maxLength) {
    var element = document.getElementById(elementId);
    var text = element.innerText;

    if (text.length > maxLength) {
        element.innerText = text.substring(0, maxLength) + '...';
    }
}

function validarTecla(event) {
    // Obtener la tecla presionada
    var tecla = event.key;

    // Permitir letras minúsculas, espacio, como, punto, punto y coma, retroceso (Backspace) y tabulador (Tab)
    if (/[a-z ,.;]/.test(tecla) || tecla === 'Backspace' || tecla === 'Tab') {
        return true;
    } else {
        // Evitar la entrada de la tecla
        event.preventDefault();
        return false;
    }
}

function copiarTextoAlPortapapeles(texto) {
    // Utilizando la Clipboard API
    if (!navigator.clipboard) {
      // Si no se soporta la Clipboard API
      alert("Tu navegador no soporta la copia al portapapeles");
      return;
    }
    navigator.clipboard.writeText(texto)
      .then(() => {
        console.log("Texto copiado al portapapeles");
      })
      .catch(err => {
        console.error("Error al copiar texto", err);
      });
}

function btnCopiarTextoAlPortapapeles () {
    let mensaje= leerTexto ("respuesta_texto"); 
    copiarTextoAlPortapapeles(mensaje);   
}

/* Versiones alternativas de los algoritmos encriptar y desencriptar.
   Para analizar las diferentes formas de trabajar con texto.

// Función para encriptar el texto
function encriptarTexto(texto) {
    const reglas = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    let textoEncriptado = '';
    for (let char of texto) {
        if (reglas[char]) {
            textoEncriptado += reglas[char];
        } else {
            textoEncriptado += char; // Mantiene otros caracteres como están
        }
    }
    return textoEncriptado;
}

// Función para desencriptar el texto
function desencriptarTexto(textoEncriptado) {
    const reglasInvertidas = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    let textoDesencriptado = textoEncriptado;
    for (let [clave, valor] of Object.entries(reglasInvertidas)) {
        textoDesencriptado = textoDesencriptado.split(clave).join(valor);
    }
    return textoDesencriptado;
}

// Función para encriptar el texto
function encriptar(texto) {
    let resultado = '';
    for (let i = 0; i < texto.length; i++) {
        let letra = texto[i];
        switch (letra) {
            case 'e':
                resultado += 'enter';
                break;
            case 'i':
                resultado += 'imes';
                break;
            case 'a':
                resultado += 'ai';
                break;
            case 'o':
                resultado += 'ober';
                break;
            case 'u':
                resultado += 'ufat';
                break;
            default:
                resultado += letra; // Mantiene otras letras sin cambios
        }
    }
    return resultado;
}

// Función para desencriptar el texto
function desencriptar(textoEncriptado) {
    let resultado = textoEncriptado;
    resultado = resultado.replace(/enter/g, 'e');
    resultado = resultado.replace(/imes/g, 'i');
    resultado = resultado.replace(/ai/g, 'a');
    resultado = resultado.replace(/ober/g, 'o');
    resultado = resultado.replace(/ufat/g, 'u');
    return resultado;
}

*/
