const tabButton = document.getElementById("tabBtn");
const tabCon = document.getElementById("tab-container");
const tabLi = document.getElementById("tab-li");

let tabs = [];
let tmpTxTData = "";


const STORE_KEY = "TMP";

function saveTabtoStorage(tab, title){
    localStorage.setItem((!title) ? STORE_KEY : title.trim(), JSON.stringify(tab));
}

function deleteTab(event){
    if(indicatorWithSaveEditToTextarea() === 0){
        return;
    } 
    const div = event.target.parentElement;
    const li = document.getElementById(div.id);
    div.remove();
    li.remove();
    const firstTab = tabCon.firstElementChild.id;
    changeTab(firstTab);
    // tabs = tabs.filter((tab) => tab.id !== parseInt(div.id));
}

function handleTab(newTab, title){
    if(handleTab_li(newTab, title) === 0){
        return alert("이미 불러온 데이터입니다.");
    }
    handleTab_div(newTab);  
    return 1;
}

function handleTab_li(newTab, title){
    let tabLiChild = tabLi.querySelectorAll(":scope > li");
    for(let i = 0; i < tabLiChild.length; i++){
        console.log("tabLiChild id : " + tabLiChild[i].id);
        console.log("newTab id : " + newTab.id);
        if(tabLiChild[i].id == newTab.id){
            return 0;
        }
    }
    for(let i = 0; i < tabLiChild.length; i++){
        tabLiChild[i].className = "notselected";
    }
    const li = document.createElement("li");
    li.className = "selected";
    li.id = newTab.id;
    li.innerText = (!title) ? "OO" : title;
    li.setAttribute("onclick", "changeTab(this.id)");
    tabLi.appendChild(li);
}

function handleTab_div(newTab){
    let tabConChild = tabCon.querySelectorAll(":scope > div");
    for(let i = 0; i < tabConChild.length; i++){
        tabConChild[i].className = "notselected";
    }
    const div = document.createElement("div");
    div.id = newTab.id;
    div.className = "selected"
    const button = document.createElement("button");
    button.innerText= "X";
    const textarea = document.createElement("textarea");
    textarea.innerText = newTab.text;
    textarea.addEventListener("input", indicator);
    button.addEventListener("click", deleteTab);
    div.appendChild(button);
    div.appendChild(textarea);
    tabCon.appendChild(div);
}

function changeTab(id){
    let tabLiChild = tabLi.querySelectorAll(":scope > li");
    for(let i = 0; i < tabLiChild.length; i++){
        tabLiChild[i].className = "notselected";
    }
    let clickTab = document.getElementById(id)
    if(clickTab){
        clickTab.className = "selected";
        clickTab.id = "tmp";
        changePage(id);
        clickTab.id = id;
    }
}

function changePage(id){
    let tabConChild = tabCon.querySelectorAll(":scope > div");
    for(let i = 0; i < tabConChild.length; i++){
        tabConChild[i].className = "notselected";
    }
    let clickPage = document.getElementById(id)
    clickPage.className = "selected";
}

function tabInfo(TxTData){
    const value = TxTData;
    const newTab = {
        text : value,
        id : Date.now()
    }
    return newTab
}

function clickTabBtn(TxTData){
    const newTab1 = tabInfo(TxTData);
    handleTab(newTab1);
    saveTabtoStorage(newTab1); 
}

function indicator(){
    if(!tabLi.querySelector(":scope > .selected").innerText.endsWith('*')){
        tabLi.querySelector(":scope > .selected").innerText += '*';
    }
}



tabButton.addEventListener("click", function(){clickTabBtn(tmpTxTData)});