

const login = async (event) => {
    // this keeps the page from refreshing by default so we can input stuff
    event.preventDefault();

    // variables that retrieve info from html user and password
    const username = document.querySelector('#userName').value.trim();
    const password = document.querySelector('#password').value.trim();

    //lets make sure these are filled out first before we run anything
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });  
        
        
        if (response.ok) {
            document.location.replace('/api/users/dashboard');
        } else {
            alert('sorry, cannot log you in at this time. Here are the details: ' + response.statusText)
        }
    };
}

// document.querySelector('.login').addEventListener('submit', login);