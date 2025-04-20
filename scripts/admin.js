document.querySelectorAll(".delete-button").forEach(function(button) {
    button.addEventListener("click", function() {

        var row = button.closest("tr");
        if (row) {
            row.remove();
        }
    });
});



document.querySelectorAll(".ban-button").forEach(function(button) {
    button.addEventListener("click", function() {

        var row = button.closest("tr");
        var status = row.querySelector(".admin-table-data-status");

        if(status.textContent.trim() === "Так") {
            status.textContent = "Ні";
        }
        else {
            status.textContent = "Так";
        }
    });
});