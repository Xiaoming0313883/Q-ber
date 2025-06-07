var n1 = {
  s: ["1s", "2s", "3s", "4s"],
  p: ["2p", "3p", "4p"],
  d: ["3d", "4d "],
  espin: ["+1/2", "-1/2"],
};
var selected = {
  shell: [],
  n: [],
  l: [],
  m: [],
  s: [],
};
/*
  var selected_bar = document.getElementById("selected");
  var shell_class = document.getElementById("shell");
  var n_class = document.getElementById("n");
  var n1_class = document.getElementById("n1");
  var l_class = document.getElementById("l");
  var m_class = document.getElementById("m");
  var s_class = document.getElementById("s");
  var result_class = document.getElementById("result");
  var image = document.getElementById("orbital-grid");
*/
function start(type, element) {
  var shell_class = document.getElementById("shell");
  var n1_class = document.getElementById("n1");
  var s_class = document.getElementById("s");
  resetColor(shell_class);
  element.classList.add("selected");
  selected.n = [];
  selected.l = [];
  selected.m = [];
  selected.s = [];
  reset("n1");
  reset("n");
  reset("l");
  reset("m");
  reset("s");
  n1.espin.forEach(function (item, index) {
    const td = document.createElement("td");
    if (item > 0) {
      item = "+" + item;
    }
    td.innerHTML = item;
    td.setAttribute("onclick", `setESpin("${item}",this)`);
    s_class.appendChild(td);
  });
  switch (type) {
    case "s":
      n1.s.forEach(function (item, index) {
        const td = document.createElement("td");
        td.innerHTML = item;
        td.setAttribute("onclick", `setN("${item}",this)`);
        n1_class.appendChild(td);
      });
      selected.shell = ["s"];
      break;
    case "p":
      n1.p.forEach(function (item, index) {
        const td = document.createElement("td");
        td.innerHTML = item;
        td.setAttribute("onclick", `setN("${item}",this)`);
        n1_class.appendChild(td);
      });
      selected.shell = ["p"];
      break;
    case "d":
      n1.d.forEach(function (item, index) {
        const td = document.createElement("td");
        td.innerHTML = item;
        td.setAttribute("onclick", `setN("${item}",this)`);
        n1_class.appendChild(td);
      });
      selected.shell = ["d"];
      break;
  }
  setQuantumNumber(type);
  refresh();
  display();
}

function setN(type, element) {
  var n_class = document.getElementById("n");
  switch (selected.shell[0]) {
    case "s":
      number = 0;
      break;
    case "p":
      number = 1;
      break;
    case "d":
      number = 2;
      break;
  }
  const n = type.match(/\d+/);
  if (element.classList.contains("selected")) {
    let index = selected.n.indexOf(n[0]);
    if (index !== -1) {
      selected.n.splice(index, 1);
    }
    element.classList.remove("selected");
  } else {
    element.classList.add("selected");
    selected.n.push(n[0]);
  }
  reset("n");
  selected.n.forEach(function (item, index) {
    const td = document.createElement("td");
    td.style.backgroundColor = "green";
    td.innerHTML = item;
    n_class.appendChild(td);
  });
  refresh();
  display();
}

function setQuantumNumber(type) {
  var l_class = document.getElementById("l");
  switch (type) {
    case "s":
      number = 0;
      break;
    case "p":
      number = 1;
      break;
    case "d":
      number = 2;
      break;
  }
  const td = document.createElement("td");
  td.style.backgroundColor = "green";
  td.innerHTML = number;
  l_class.appendChild(td);
  setAngular(number);
  refresh();
}

function setAngular(n) {
  var m_class = document.getElementById("m");
  selected.m = [];
  reset("m");
  for (let i = -n; i <= n; i++) {
    item = i;
    if (item > 0) {
      item = "+" + item;
    }
    const td = document.createElement("td");
    td.innerHTML = item;
    if (n === 0) {
      td.style.backgroundColor = "green";
      setMagnetic(item);
    } else {
      td.setAttribute("onclick", `setMagnetic("${item}",this)`);
    }
    m_class.appendChild(td);
  }
  selected.l = [n];
  refresh();
  display();
}

function setMagnetic(type, element) {
  if (element) {
    if (element.classList.contains("selected")) {
      let index = selected.m.indexOf(type);
      if (index !== -1) {
        selected.m.splice(index, 1);
      }
      element.classList.remove("selected");
    } else {
      element.classList.add("selected");
      selected.m.push(type);
    }
  } else {
    selected.m.push(type);
  }
  refresh();
  display();
}

function setESpin(type, element) {
  if (element.classList.contains("selected")) {
    let index = selected.s.indexOf(type);
    if (index !== -1) {
      selected.s.splice(index, 1);
    }
    element.classList.remove("selected");
  } else {
    element.classList.add("selected");
    selected.s.push(type);
  }
  refresh();
  display();
}

function reset(type) {
  const elements = document.querySelectorAll(`#${type}`);
  elements.forEach((element) => {
    const tds = element.querySelectorAll("td");
    tds.forEach((td) => {
      td.remove();
    });
  });
  selected.type = [];
}

function refresh() {
  var selected_bar = document.getElementById("selected");
  selected_bar.innerHTML = "";
  selected_bar.innerHTML += "Subshell notation: " + selected.shell + "<br>";
  selected_bar.innerHTML +=
    "Principle Quantum Number(n): " + selected.n + "<br>";
  selected_bar.innerHTML +=
    "Angular Momentum Quantum Number(l): " + selected.l + "<br>";
  selected_bar.innerHTML +=
    "Magnetic Quantum Number(m): " + selected.m + "<br>";
  selected_bar.innerHTML +=
    "Electron Spin Quantum Number(s): " + selected.s + "<br>";
  refreshImage();
}

function refreshImage() {
  var image = document.getElementById("orbital-grid");
  image.innerHTML = "";
  selected.shell.forEach(function (item, index) {
    if (item === "s") {
      selected.n.forEach(function (item1, index1) {
        const Eimage = document.createElement("img");
        Eimage.src = `images/${item1}${item}.png`;
        const subtitle = document.createElement("a");
        subtitle.innerHTML = `Orbital ${item1}${item}<br>`;
        const container = document.createElement("div");
        container.classList.add("orbital-display");
        container.appendChild(Eimage);
        container.appendChild(subtitle);
        image.appendChild(container);
      });
    } else {
      const Eimage = document.createElement("img");
      Eimage.src = `images/${item}.png`;
      const subtitle = document.createElement("a");
      subtitle.innerHTML = `Orbital ${item}<br>`;
      const container = document.createElement("div");
      container.classList.add("orbital-display");
      container.appendChild(Eimage);
      container.appendChild(subtitle);
      image.appendChild(container);
    }
  });
}

function display() {
  var result_class = document.getElementById("result");
  result_class.innerHTML = "Quantum numbers:";
  selected.n.forEach(function (nv, indexn) {
    selected.l.forEach(function (lv, indexn) {
      selected.m.forEach(function (mv, indexn) {
        selected.s.forEach(function (sv, indexn) {
          result_class.innerHTML += `<br>(n=${nv}, l=${lv}, m=${mv}, s=${sv})`;
        });
      });
    });
  });
}

function resetColor(elements) {
  let cells = elements.getElementsByTagName("td");
  for (let cell of cells) {
    cell.classList.remove("selected");
  }
}
