let checkElems = document.querySelectorAll('.check');
let launchButton = document.querySelector('.launch-button');

addDisable(checkElems);
addDisable(launchButton);

console.log(launchButton);
console.log(checkElems);


document
    .querySelector(".ok-button")
    .addEventListener("click", checkPassword);

checkElems.forEach(elem => elem.addEventListener("change", unlockLaunch));

function checkPassword(){
    const samplePassword = "1111";
    let password = document.querySelector(".password").value;

    if ( password === samplePassword) {
        removeDisable(checkElems);
        addDisable(document.querySelectorAll(".password, .ok-button"));
    }
}

function addDisable(item){
    if (item.length){
        item.forEach(elem => elem.setAttribute('disabled', 'disabled'));
    } else {
        item.setAttribute('disabled', 'disabled');
    }
}

function removeDisable(item){
    if (item.length){
        item.forEach(elem => elem.removeAttribute('disabled'));
    } else {
        item.removeAttribute('disabled');
    }
}

function unlockLaunch(){
    if (checkLevers() && checkBoxes()){
        removeDisable(launchButton);
        launchButton.addEventListener("click", launchRocket);
    }
    else if(launchButton.getAttribute('disabled') != 'disabled'){
        addDisable(launchButton);
        launchButton.removeEventListener("click", launchRocket);
    }
}

function checkLevers(){
    console.log('Checking Levers...')
    return Array.from(document.querySelectorAll(".lever")).every(elem => elem.value == 10);
}

function checkBoxes(){
    console.log('Checking Boxes...')
    return Array.from(document.querySelectorAll(".check-button")).every(elem => elem.checked == true);
}

function launchRocket(){
    launchButton.removeEventListener("click", launchRocket);

    let rocket = document.querySelector('.rocket');
    let id = null;
    let coords = rocket.getBoundingClientRect();
    const bottom = window.innerHeight - coords.y - coords.height;
    const left = coords.x;
    let pos = bottom;
    clearInterval(id);
    id = setInterval(frame, 10);

    function frame() {
        if (pos > window.innerHeight) {
            clearInterval(id);
            pos = bottom;
            rocket.style.left = '';
            rocket.style.bottom = '';

            launchButton.addEventListener("click", launchRocket);
        } else {
            console.log(pos)
            pos += 2;
            rocket.style.left = pos + 'px';
            rocket.style.bottom = pos + 'px';
        }
    }
}


