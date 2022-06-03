//1. Variables
const btnEnviar = document.querySelector('#enviar');
const resetBtn = document.querySelector('#resetBtn');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#enviar-mail');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



//2. Add Listeners
eventListeners();
function eventListeners() {
    //cuando App arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //campos formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //reinicia formulario
    resetBtn.addEventListener('click', resetFormulario);

    //enviar formulario
    formulario.addEventListener('submit', enviarEmail);
}


//3. Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')    
}

//validar formulario
function validarFormulario(e) {
    if(e.target.value.length > 0){

        //Eliminar los errores
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('All fields are required');
    }

    if(e.target.type === 'email') {
        
        if(er.test(e.target.value)) {
            const error = document.querySelector('p.error');
            if(error) {
                error.remove();
            }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Not valid Email');
        }
    }

    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')   
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}

//Reseteo de formulario
function resetFormulario(e) {
    formulario.reset();
    e.preventDefault();
}

//Enviar email
function enviarEmail(e) {
    e.preventDefault();
    
    //mostrar loading
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //ocultar despues de 3 segundos
    setTimeout(() => {
        spinner.style.display = 'none';

        //mensaje de envio correcto
        const parrafo = document.createElement('p');
        parrafo.textContent = 'Congrats! Your message was sent';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')

        //mensaje sobre spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove(); //elimina mensaje
            formulario.reset(); //resetea formulario
            console.log('reseteado');
        }, 5000);
    }, 3000);
}

