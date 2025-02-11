let amigos = [];
let cantidadAmigos = 0;
let contadorAmigos = 0;

// Función para establecer la cantidad de amigos
function establecerCantidad() {
    const inputCantidad = document.getElementById('cantidad');
    const cantidad = parseInt(inputCantidad.value);

    // Validar la cantidad
    if (isNaN(cantidad) || cantidad < 2) {
        alert("Por favor, ingresa un número válido mayor o igual a 2.");
        return;
    }

    cantidadAmigos = cantidad;

    // Habilitar el campo de entrada y el botón de añadir
    document.getElementById('amigo').disabled = false;
    document.querySelector('.button-add').disabled = false;

    // Deshabilitar el campo de cantidad y el botón de establecer cantidad
    inputCantidad.disabled = true;
    document.querySelector('.button-quantity').disabled = true;

    // Enfocar el campo de entrada de nombres
    document.getElementById('amigo').focus();
}

// Función para agregar un amigo a la lista
function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();

    // Validar la entrada
    if (nombre === "") {
        alert("Por favor, inserte un nombre.");
        return;
    }

    const regex = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/;
    if (!regex.test(nombre)) {
        alert("Por favor, ingrese solo letras y espacios.");
        return;
    }

    amigos.push(nombre);
    contadorAmigos++;

    input.value = "";
    actualizarListaAmigos();

    if (contadorAmigos >= cantidadAmigos) {
        // Deshabilitar el campo de entrada y el botón de añadir
        input.disabled = true;
        document.querySelector('.button-add').disabled = true;

        // Habilitar el botón de sortear
        document.querySelector('.button-draw').disabled = false;

        alert("Todos los amigos han sido agregados. ¡Ahora puedes sortear!");
    } else {
        alert(`Te faltan ${cantidadAmigos - contadorAmigos} amigos por agregar.`);
    }
}

// Función para actualizar la lista de amigos en el HTML
function actualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = "";

    amigos.forEach((amigo) => {
        const nuevoAmigo = document.createElement('li');
        nuevoAmigo.textContent = amigo;
        listaAmigos.appendChild(nuevoAmigo);
    });
}

// Función para sortear los amigos de manera aleatoria
function sortearAmigo() {
    console.log("Función sortearAmigo() ejecutada"); // Depuración

    if (amigos.length < 2) {
        alert("Necesitas al menos dos amigos para hacer el sorteo.");
        return;
    }

    // Mezclar el array de amigos
    let amigosMezclados = mezclarArray([...amigos]);

    // Verificar que nadie sea asignado a sí mismo
    for (let i = 0; i < amigosMezclados.length; i++) {
        if (amigosMezclados[i] === amigos[i]) {
            // Si alguien es asignado a sí mismo, volver a mezclar
            return sortearAmigo();
        }
    }

    // Mostrar un único resultado en un rectángulo verde
    mostrarResultadoUnico(amigos, amigosMezclados);

    // Deshabilitar el botón de sortear y habilitar el botón de repetir
    document.querySelector('.button-draw').disabled = true;
    document.querySelector('.button-repeat').disabled = false;
}

// Función para mezclar un array (algoritmo de Fisher-Yates)
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Función para mostrar un único resultado del sorteo
function mostrarResultadoUnico(amigos, amigosMezclados) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = "";

    // Seleccionar un índice aleatorio
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);

    // Crear un div para el rectángulo verde
    const rectanguloVerde = document.createElement('div');
    rectanguloVerde.className = 'resultado-container';
    rectanguloVerde.textContent = amigosMezclados[indiceAleatorio]; // Solo el nombre

    // Agregar el rectángulo al contenedor de resultados
    resultado.appendChild(rectanguloVerde);

    console.log("Resultado mostrado:", amigosMezclados[indiceAleatorio]); // Depuración
}

