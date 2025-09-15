document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            alert('Inicio de sesión exitoso. Token: ' + data.token);
            localStorage.setItem('token', data.token);
            errorMessage.classList.add('hidden');
            // Redireccionar o hacer algo después del login exitoso
        } else {
            errorMessage.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error al iniciar sesión', error);
        errorMessage.classList.remove('hidden');
    }
});
