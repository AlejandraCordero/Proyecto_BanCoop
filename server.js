const http = require('http');

// Función de validación de usuarios del proyecto BanCoop
function login(usuario, password) {
    if (usuario === "admin" && password === "1234") {
        return { 
            status: 200, 
            message: "Acceso concedido al sistema bancario",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.bancoop.auth.secure"
        };
    }
    return { status: 401, message: "Credenciales inválidas. Verifique usuario o contraseña." };
}

const server = http.createServer((req, res) => {
    // Usamos el estándar moderno de Node.js para leer la URL
    const baseUrl = `http://${req.headers.host}`;
    const parsedUrl = new URL(req.url, baseUrl);
    
    if (parsedUrl.pathname === '/login') {
        const usuario = parsedUrl.searchParams.get('usuario');
        const password = parsedUrl.searchParams.get('password');
        const resultado = login(usuario, password);

        res.writeHead(resultado.status, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>BanCoop - Resultado de Autenticación</title>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 40px; display: flex; justify-content: center; align-items: center; height: 100vh; }
                    .card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 450px; text-align: center; }
                    .success { border-top: 6px solid #28a745; }
                    .error { border-top: 6px solid #dc3545; }
                    h2 { color: #333; margin-bottom: 10px; }
                    .badge { display: inline-block; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-bottom: 20px; }
                    .badge-success { background: #e8f5e9; color: #2e7d32; }
                    .badge-error { background: #ffebee; color: #c62828; }
                    .details { background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: left; font-family: monospace; font-size: 13px; word-break: break-all; margin-bottom: 20px; color: #444; }
                    .btn { display: inline-block; text-decoration: none; background: #0056b3; color: white; padding: 10px 20px; border-radius: 6px; font-weight: bold; transition: background 0.3s; }
                    .btn:hover { background: #003d82; }
                </style>
            </head>
            <body>
                <div class="card ${resultado.status === 200 ? 'success' : 'error'}">
                    <h2>Banco BanCoop</h2>
                    <span class="badge ${resultado.status === 200 ? 'badge-success' : 'badge-error'}">
                        Código HTTP: ${resultado.status}
                    </span>
                    <p><strong>Mensaje:</strong> ${resultado.message}</p>
                    
                    ${resultado.token ? `
                        <div class="details">
                            <strong>Token JWT Generado:</strong><br>${resultado.token}
                        </div>
                    ` : ''}

                    <a href="/" class="btn">Volver al Inicio</a>
                </div>
            </body>
            </html>
        `);
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Portal de Seguridad - BanCoop</title>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #0056b3 0%, #00264d 100%); margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; color: #333; }
                    .container { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); width: 400px; }
                    h2 { color: #003d82; text-align: center; margin-top: 0; margin-bottom: 5px; }
                    .subtitle { text-align: center; color: #666; font-size: 13px; margin-bottom: 25px; }
                    .form-group { margin-bottom: 15px; }
                    label { display: block; margin-bottom: 5px; font-weight: 600; font-size: 14px; color: #444; }
                    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box; font-size: 14px; }
                    button { width: 100%; background: #0056b3; color: white; border: none; padding: 12px; border-radius: 6px; font-size: 16px; font-weight: bold; cursor: pointer; transition: background 0.3s; margin-top: 10px; }
                    button:hover { background: #003d82; }
                    .examples { margin-top: 20px; font-size: 12px; background: #f8f9fa; padding: 10px; border-radius: 6px; color: #666; text-align: center; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>BanCoop IT</h2>
                    <div class="subtitle">Microservicio de Autenticación de Clientes</div>
                    
                    <form action="/login" method="GET">
                        <div class="form-group">
                            <label for="usuario">Usuario:</label>
                            <input type="text" id="usuario" name="usuario" placeholder="Ej. admin" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Contraseña:</label>
                            <input type="password" id="password" name="password" placeholder="Ej. 1234" required>
                        </div>
                        <button type="submit">Iniciar Sesión</button>
                    </form>

                    <div class="examples">
                        💡 <strong>Prueba con:</strong><br>
                        Usuario: <code>admin</code> | Contraseña: <code>1234</code>
                    </div>
                </div>
            </body>
            </html>
        `);
    }
});

server.listen(3000, () => {
    console.log('Servidor gráfico activo en: http://localhost:3000');
});