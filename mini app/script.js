let posts = JSON.parse(localStorage.getItem("posts")) || [];
let theme = localStorage.getItem("theme") || "light";

document.body.classList.toggle("dark", theme === "dark");

document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
};

function addPost() {
  const imageInput = document.getElementById("imageInput");
  const caption = document.getElementById("captionInput").value;

  if (!imageInput.files[0]) return alert("Select an image");

  const reader = new FileReader();
  reader.onload = () => {
    posts.unshift({
      img: reader.result,
      caption,
      reactions: { heart: 0, laugh: 0, wow: 0 },
      comments: []
    });
    saveAndRender();
  };
  reader.readAsDataURL(imageInput.files[0]);

  imageInput.value = "";
  document.getElementById("captionInput").value = "";
}

function react(i, type) {
  posts[i].reactions[type]++;
  saveAndRender();
}

function addComment(i, text) {
  if (!text) return;
  posts[i].comments.push({ text, replies: [] });
  saveAndRender();
}

function addReply(postIndex, commentIndex, text) {
  if (!text) return;
  posts[postIndex].comments[commentIndex].replies.push(text);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("posts", JSON.stringify(posts));
  render();
}

function render() {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.forEach((post, i) => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <img src="${post.img}">
      <p>${post.caption}</p>

      <div class="reactions">
        <span onclick="react(${i}, 'heart')">❤️ ${post.reactions.heart}</span>
        <span onclick="react(${i}, 'laugh')">😂 ${post.reactions.laugh}</span>
        <span onclick="react(${i}, 'wow')">🤯 ${post.reactions.wow}</span>
      </div>

      <div class="comment-box">
        <input placeholder="Write a comment"
          onkeydown="if(event.key==='Enter') addComment(${i}, this.value)">
        <button onclick="addComment(${i}, this.previousElementSibling.value)">Post</button>
      </div>

      ${post.comments.map((c, ci) => `
        <div class="comment">
          💬 ${c.text}
          <input placeholder="Reply..."
            onkeydown="if(event.key==='Enter') addReply(${i}, ${ci}, this.value)">
          ${c.replies.map(r => `<div class="reply">↳ ${r}</div>`).join("")}
        </div>
      `).join("")}
    `;
    feed.appendChild(div);
  });
}

render();
