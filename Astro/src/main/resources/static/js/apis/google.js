// Importar as funções necessárias do SDK
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
        import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

        // Configuração do Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyCIzuDm0_T_nVJJ-_PNRflgH5GOJ6JVTyU",
            authDomain: "api--teste.firebaseapp.com",
            projectId: "api--teste",
            storageBucket: "api--teste.appspot.com",
            messagingSenderId: "901772485809",
            appId: "1:901772485809:web:a8a0fd153fc42b8e0eae90",
            measurementId: "G-LNPF55BM3X"
        };

        // Inicializar Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const auth = getAuth(app);

        // Função principal
        window.onload = function() {
            document.getElementById('login-button').onclick = function() {
                const provider = new GoogleAuthProvider();
                signInWithPopup(auth, provider)
                    .then((result) => {
                        const user = result.user;
                        updateUI(user);
                    })
                    .catch((error) => {
                        console.error(error);
                        document.getElementById('error-message').innerText = error.message;
                    });
            };

            document.getElementById('logout-button').onclick = function() {
                signOut(auth).then(() => {
                    updateUI(null);
                });
            };

            // Observa mudanças na autenticação
            auth.onAuthStateChanged((user) => {
                updateUI(user);
            });
        };

        function updateUI(user) {
            const userInfo = document.getElementById('user-info');
            const loginButton = document.getElementById('login-button');
            const logoutButton = document.getElementById('logout-button');
            const errorMessage = document.getElementById('error-message');

            if (user) {
                userInfo.innerText = `Bem-vindo, ${user.displayName}`;
                userInfo.style.display = 'block';
                logoutButton.style.display = 'block';
                loginButton.style.display = 'none';
                errorMessage.innerText = ''; // Limpa mensagem de erro
            } else {
                userInfo.innerText = '';
                userInfo.style.display = 'none';
                logoutButton.style.display = 'none';
                loginButton.style.display = 'block';
                errorMessage.innerText = ''; // Limpa mensagem de erro
            }
        }