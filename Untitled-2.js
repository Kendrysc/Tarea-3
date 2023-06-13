// Obtener lista de contactos al cargar la página
window.addEventListener('load', getContacts);

// Obtener lista de contactos
function getContacts() {
    fetch('http://www.raydelto.org/agenda.php')
        .then(response => response.json())
        .then(data => {
            const contactList = document.getElementById('contact-list');
            contactList.innerHTML = '';

            data.forEach(contact => {
                const contactItem = document.createElement('div');
                contactItem.className = 'contact';
                contactItem.textContent = `${contact.nombre} ${contact.apellido}: ${contact.telefono}`;

                contactList.appendChild(contactItem);
            });
        })
        .catch(error => {
            console.error('Error al obtener la lista de contactos:', error);
        });
}

// Agregar nuevo contacto
document.getElementById('add-contact-form').addEventListener('submit', addContact);

function addContact(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;

    const newContact = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono
    };

    fetch('http://www.raydelto.org/agenda.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContact)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Contacto agregado exitosamente:', data);
            getContacts(); // Actualizar la lista de contactos después de agregar uno nuevo
            document.getElementById('add-contact-form').reset(); // Limpiar el formulario
        })
        .catch(error => {
            console.error('Error al agregar un nuevo contacto:', error);
        });
}
