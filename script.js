const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "saqib-first-project.firebaseapp.com",
  projectId: "saqib-first-project",
  storageBucket: "saqib-first-project.firebasestorage.app",
  messagingSenderId: "71428071534",
  appId: "1:71428071534:web:a67bbaebf15bb86295c67f",
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

let ul = document.querySelector("ul");
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
let addTask = () => {
  let task = document.querySelector(".task-input").value;
  if (!task) {
    document.querySelector(".message").style.display = "block";
    return;
  }
  document.querySelector(".message").style.display = "none";

  db.collection("tasks").add({ task });

  document.querySelector(".task-input").value = "";
};

db.collection("tasks").onSnapshot((snapshot) => {
  ul.innerHTML = "";
  snapshot.forEach((doc) => {
    let data = doc.data();
    let li = document.createElement("li");
    li.innerHTML = `${data.task}
      <div class="icons">
        <i class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editTask('${doc.id}');"></i>
        <i class="fa-solid fa-trash" onclick="deleteTask('${doc.id}');"></i>
        </div>
          `;

    ul.appendChild(li);
  });

  if (ul.children.length != 0) {
    document.querySelector(".empty-box").style.display = "none";
  } else {
    document.querySelector(".empty-box").style.display = "block";
  }
});

function deleteTask(id) {
  db.collection("tasks").doc(id).delete();
}

let uniqueId;
async function editTask(id) {
  uniqueId = id;
  let modalInput = document.getElementById("modal-input");
  let taskData = await db.collection("tasks").doc(id).get();
  modalInput.value = taskData.data().task;
}

async function updateTask() {
  let modalInput = document.getElementById("modal-input").value;
  await db.collection("tasks").doc(uniqueId).update({ task: modalInput });
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
    document.querySelector(".message").style.display = "none";
  }
});





      firebase.initializeApp(firebaseConfig);
      let auth = firebase.auth();

          auth.onAuthStateChanged(user => {
      if(user){
        let welcomeH1 = document.getElementById("welcomeBox");
        welcomeH1.innerHTML = 
          `👋 Welcome, <b>${user.displayName}</b>`;
     setTimeout(() => {
          welcomeH1.style.top = "-150px";
     }, 4000);

      }else{
        window.location.href = "signin.html";
      }
    });

    function logout(){
      auth.signOut().then(() => window.location.href = "signin.html");
    }
