document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            alert('Registro exitoso.');
            errorMessage.classList.add('hidden');
            // Redireccionar o hacer algo después del registro exitoso
        } else {
            errorMessage.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error al registrarse', error);
        errorMessage.classList.remove('hidden');
    }
});
