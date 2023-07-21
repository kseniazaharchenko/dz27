function searchPost() {
  var postId = document.getElementById("postId").value;

  if (postId >= 1 && postId <= 100) {
    fetch('https://jsonplaceholder.typicode.com/posts/' + postId)
      .then(response => {
        if (!response.ok) {
          throw new Error('Помилка ' + response.status);
        }
        return response.json();
      })
      .then(post => {
        var postContainer = document.getElementById("postContainer");
        postContainer.innerHTML = '';

        var postElement = document.createElement("div");
        postElement.innerHTML = '<h2>' + post.title + '</h2><p>' + post.body + '</p>';

        var commentsButton = document.createElement("button");
        commentsButton.textContent = "Отримати коментарі";
        commentsButton.onclick = function() {
          getComments(postId);
        };

        postContainer.appendChild(postElement);
        postContainer.appendChild(commentsButton);
      })
      .catch(error => {
        console.log('Помилка:', error);
      });
  } else {
    alert("Введіть ідентифікатор поста від 1 до 100");
  }
}

function getComments(postId) {
  fetch('https://jsonplaceholder.typicode.com/posts/' + postId + '/comments')
    .then(response => {
      if (!response.ok) {
        throw new Error('Помилка ' + response.status);
      }
      return response.json();
    })
    .then(comments => {
      var postContainer = document.getElementById("postContainer");

      var commentsElement = document.createElement("div");
      commentsElement.innerHTML = '<h3>Коментарі:</h3>';

      comments.forEach(comment => {
        var commentElement = document.createElement("div");
        commentElement.innerHTML = '<strong>' + comment.name + '</strong>: ' + comment.body;
        commentsElement.appendChild(commentElement);
      });

      postContainer.appendChild(commentsElement);
    })
    .catch(error => {
      console.log('Помилка:', error);
    });
}