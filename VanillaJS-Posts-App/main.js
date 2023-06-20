const postsList = document.querySelector(".posts-list");
const addPost = document.querySelector(".add-post-form");
const titleValue = document.querySelector("title-value");
const commentValue = document.querySelector("body-value");
const submitBtn = document.querySelector(".btn");

const output = "";
const url = "https://jsonplaceholder.typicode.com/comments";
const renderPost = (posts) => {
  posts.forEach((post) => {
    output += `<div class="card mt-4 col-md-6 bg-ligt">
        <div class="card-body">
          <h5 class="card-title">${post.name}</h5>
          <p class="card-text">
           ${post.body}
          </p>
          <a href="#" class="card-link" id="edit">Edit</a>
          <a href="#" class="card-link" id="delete">Delete</a>
        </div>
      </div>`;
  });
  postslist.innerHTML = output;
};
fetch(url)
  .then((res) => res.json())
  .then((data) => renderPost(data))
  .catch((error) => console.log("error", error));

//Insert
addPost.addEventListener("click", (event) => {
  event.preventDefault();
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: titleValue.value,
      body: commentValue.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      renderPost(dataArr);
    });
});
//EXTRACTING EDIT DELETE BUTTON
postsList.addEventListener("click", (event) => {
  event.preventDefault();
  let isEditButton = event.target.id === "edit";
  let isDeleteButton = event.target.id === "delete";
  let id = event.target.parentElement.dataset.id;
  if (isDeleteButton) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => location.reload());
  }
  if (isEditButton) {
    const parent = event.target.parentElement;
    let titleValue = parent.querySelector(".card-title").textContent;
    let commentValue = parent.querySelector(".card-text").textContent;
    titleValue.value = titleValue;
    commentValue.value = commentValue;
    submitBtn.addEventListener("click", (event) => {
      event.preventDefault();
      fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          title: titleValue,
          body: commentValue,
        },
      })
        .then((res) => res.json())
        .then(() => location.reload);
    });
  }
});
