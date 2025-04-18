// Globalne varijable
var selectedRow = null;

// Validacija prijave
function validateLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username == "admin" && password == "admin") {
        window.location.href = "dashboard.html";
    } else {
        alert("Prijava nije bila uspješna! Provjerite korisničke podatke!");
    }
}

// Dodavanje novog studenta
function addEntry() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastname").value;
    
    if (firstName && lastName) {
        var table = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
        var newRow = table.insertRow(table.rows.length);
        
        var cellFirstName = newRow.insertCell(0);
        var cellLastName = newRow.insertCell(1);
        var cellActions = newRow.insertCell(2);
        
        cellFirstName.innerHTML = firstName;
        cellLastName.innerHTML = lastName;
        cellActions.innerHTML = 
            '<button onclick="editRow(this)">Uredi</button>' + 
            '<button onclick="deleteRow(this)">Obriši</button>';
        
        // Resetiranje forme
        document.getElementById("inputForm").reset();
    } else {
        alert("Molimo unesite i ime i prezime studenta!");
    }
}

// Uređivanje studenta
function editRow(button) {
    selectedRow = button.parentNode.parentNode;
    
    // Postavljanje vrijednosti u modal
    document.getElementById("editFirstName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("editLastName").value = selectedRow.cells[1].innerHTML;
    
    // Prikaz modala
    document.getElementById("editModal").style.display = "block";
}

// Spremanje promjena
function saveChanges() {
    if (selectedRow) {
        selectedRow.cells[0].innerHTML = document.getElementById("editFirstName").value;
        selectedRow.cells[1].innerHTML = document.getElementById("editLastName").value;
        closeModal();
    }
}

// Zatvaranje modala
function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

// Brisanje studenta
function deleteRow(button) {
    if (confirm("Jeste li sigurni da želite obrisati ovog studenta?")) {
        var row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
}

// Pretraga studenata
function searchTable() {
    var input = document.getElementById("search-input");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("dataTable");
    var tr = table.getElementsByTagName("tr");

    for (var i = 1; i < tr.length; i++) {
        var found = false;
        var td = tr[i].getElementsByTagName("td");
        
        for (var j = 0; j < td.length - 1; j++) { // -1 da preskočimo ćeliju s akcijama
            if (td[j]) {
                var txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase() == filter) {
                    found = true;
                    break;
                }
            }
        }
        
        tr[i].style.display = found ? "" : "none";
    }
}