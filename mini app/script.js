let posts = JSON.parse(localStorage.getItem("posts")) || [];
let user = localStorage.getItem("user") || "";
let following = JSON.parse(localStorage.getItem("following")) || false;

function login() {
  user = username.value;
  localStorage.setItem("user", user);
  profileText.innerText = "Logged in as: " + user;
}

function toggleFollow() {
  following = !following;
  localStorage.setItem("following", following);
  followBtn.innerText = following ? "Unfollow" : "Follow";
}

function addPost() {
  const file = imageInput.files[0];
  const cap = caption.value;
  if (!file || !cap) return alert("Add image & caption");

  const reader = new FileReader();
  reader.onload = function () {
    posts.unshift({
      user,
      image: reader.result,
      caption: cap,
      reactions: { like: 0, laugh: 0, wow: 0, fire: 0 },
      comments: []
    });
    localStorage.setItem("posts", JSON.stringify(posts));
    caption.value = "";
    imageInput.value = "";
    showPosts();
  };
  reader.readAsDataURL(file);
}

function react(i, type) {
  posts[i].reactions[type]++;
  localStorage.setItem("posts", JSON.stringify(posts));
  showPosts();
}

function addComment(i) {
  const text = document.getElementById("c" + i).value;
  if (!text) return;
  posts[i].comments.push(text);
  localStorage.setItem("posts", JSON.stringify(posts));
  showPosts();
}

function showPosts() {
  feed.innerHTML = "";
  posts.forEach((p, i) => {
    feed.innerHTML += `
      <div class="post">
        <b>${p.user}</b>
        <img src="${p.image}">
        <p>${p.caption}</p>

        <div class="actions">
          <button onclick="react(${i}, 'like')">❤️ ${p.reactions.like}</button>
          <button onclick="react(${i}, 'laugh')">😂 ${p.reactions.laugh}</button>
          <button onclick="react(${i}, 'wow')">😮 ${p.reactions.wow}</button>
          <button onclick="react(${i}, 'fire')">🔥 ${p.reactions.fire}</button>
        </div>

        <input id="c${i}" placeholder="Add comment">
        <button onclick="addComment(${i})">Comment</button>

        ${p.comments.map(c => `<div class="comment">💬 ${c}</div>`).join("")}
      </div>
    `;
  });
}

profileText.innerText = user ? "Logged in as: " + user : "";
followBtn.innerText = following ? "Unfollow" : "Follow";
showPosts();
