document.getElementById("headerUserLogo").addEventListener("click", showMenu);

document.addEventListener("click", function(event) {
    const menu = document.getElementById("dropdownMenu");
    const avatar = document.getElementById("headerUserLogo");

    if (!menu.contains(event.target) && !avatar.contains(event.target)) {
        menu.classList.remove("active");
    }
});


function showMenu(){
    var menu = document.getElementById("dropdownMenu");
    menu.classList.toggle("active");

}

