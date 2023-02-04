const comment = async (event) => {
    // this keeps the page from refreshing by default so we can input stuff
    event.preventDefault();

    const commentBody = document.querySelector('#comment').value.trim();
    const commentTitle = document.querySelector('#title');
    let post_id = postTitle.getAttribute('data-id')

    if (commentBody) {
        const response = await fetch(`/post/comment`, {
            method: 'POST',
            body: JSON.stringify({ commentBody, post_id }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            document.location.reload();            
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', comment);