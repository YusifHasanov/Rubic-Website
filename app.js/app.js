// @ts-nocheck
let navbar = document.querySelector(".navbar");
let brand = document.querySelector(".navbar-brand");
let tabs = document.querySelectorAll(".title-item");
let https = new XMLHttpRequest();
let content = document.querySelector(".title-pane");
eventListeners();

function eventListeners() {
    window.addEventListener('scroll', scrollFunction)
    tabs.forEach(item => {
        item.addEventListener("click", CheckTab);
    })
}

function scrollFunction() {
    if (document.documentElement.scrollTop > 1 || document.body.scrollTop > 1) {
        navbar.classList.add("scroll");
        brand.classList.add("navbar-brand-scroll");
    } else {
        navbar.classList.remove("scroll");
        brand.classList.remove("navbar-brand-scroll");
    }
}

function CheckTab(e) {
    tabs.forEach(item=>{
        item.children[0].classList.remove("activated");
    })
    let target = e.target;
    let num=target.id;
    ChangeContent(num-1)
    target.classList.add("activated");
    e.preventDefault();
}

function ChangeContent(params) {
    https.open("GET", "text.txt", true);

    https.onload = () => {
        if (https.status === 200) {
            let object = JSON.parse(https.responseText)[params];
            WriteContent(object);
        }
    }
    https.send();
}


function WriteContent(params) {
    content.innerHTML = `
     <div class="title-pane" >
                    <h4 class="title-h">${params.title}</h4>
                    <p class="title">${params.text}</p>
                    <p class="title"><strong>${params.head}</strong></p>
                    <p>${params.content}</p>
                    ${params.button}
                </div>
    `
}














