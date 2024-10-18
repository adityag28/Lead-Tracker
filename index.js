let myLeads = [];
let inputEl = document.getElementById("input-el");
let inputBtn = document.getElementById("input-btn");
let ulEL = document.getElementById("ul-el");
let deleteBtn = document.getElementById("delete-btn");
let saveTab = document.getElementById("save-tab");

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsFromLocalStorage);

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

saveTab.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listitems = "";
  for (let i = 0; i < leads.length; i++) {
    listitems += `
    <li>
    <a href='${leads[i]}'> 
    ${leads[i]} 
    </a>
    </li>`;
  }
  ulEL.innerHTML = listitems;
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});
