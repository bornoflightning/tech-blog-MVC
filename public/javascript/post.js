//Code to create a new post
const newPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
    console.log(title, description);

    if (title && description) {
        const response = await fetch('/users/dashboard', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            document.location.replace('/users/dashboard');
        } else {
            alert(response.statusText)
        }
    };
}

document.querySelector('.newPost').addEventListener('submit', newPost);


//Update Post - to come


// code to delete an existing post
const deletePost = async (event) => {
        const id = event.target.dataset.id;
        console.log(id);

        const response = await fetch(`/users/dashboard/${id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            document.location.replace('/api/users/dashboard');
    }
}

document.querySelector('.postWrapper').addEventListener('click', delete);