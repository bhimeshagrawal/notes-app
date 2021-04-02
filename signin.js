const registerForm = document.querySelector('#registerForm');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    var email = registerForm['userRegisterEmail'].value;
    var password = registerForm['userRegisterPassword'].value;
    console.log(email, password);
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        registerForm.reset();
    });
});
const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    var email = loginForm['userLoginEmail'].value;
    var password = loginForm['userLoginPassword'].value;
    console.log(email, password);
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        loginForm.reset();
    });
});