fetch("http://127.0.0.1:5600/update/" + JSON.stringify(['', '', '', '','', '', '', '', '']))
  .then((data) => data.json())
  .then((json) => {
    console.log("success");
  });
let isStart = false;
let status = "x";
let isActive = true;
let oldList = [];
class Game {
  constructor(name) {}
}
let player = new Game("Ivan");

let td = document.getElementsByTagName("td");

for (let i = 0; i < td.length; i++) {
  td[i].addEventListener("click", function (e) {
    if (td[i].textContent == "" && isActive) {
        isStart = true;
        isActive = false;
      td[i].textContent = status;

      // http://127.0.0.1:5600/update/[x]
      let list = [];
      for (let j = 0; j < td.length; j++) {
        list.push(td[j].textContent);
      }
        oldList = list;

      list = JSON.stringify(list);
      fetch("http://127.0.0.1:5600/update/" + list)
        .then((data) => data.json())
        .then((json) => {
          console.log("success");
        });
    }
  });
}
a = [] // [] - 4230
b = [] // [] - 6789
c = 1 // value
d = 1 // value

// [] == [] // false
function arraysEqual(a, b) {  
    if (a.length !== b.length) {
        return false;  
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}


setInterval(function () {
  fetch("http://127.0.0.1:5600/get-update/")
    .then((data) => data.json())
    .then((json) => {
      console.log(json.data.state);
      if (!arraysEqual(oldList, json.data.state)) {
        isActive = true;
        oldList = json.data.state;

        if (!isStart && json.data.state.includes("x")) {
        status = "o";
        isStart = true;
        }
      }

      for (let i = 0; i < 9; i++) {
        td[i].textContent = json.data.state[i];
      }
    });
}, 5000);
