import { Github } from "./scripts/api.js";
import { elements } from "./scripts/helpers.js";
import { UI } from "./scripts/ui.js";
//Github class ının ornegini(miras) olusturma
const github = new Github()
//UI class ının ornegi
const ui = new UI()
github.fetchUserData();
const getInput = (e) => {
    e.preventDefault();//tıklanıldı kelimesi ekranda kalması icin
    const value = elements.searchInput.value
    if (value == "") {
        ui.showAlert("Lütfen form alanını doldurunuz.", "alert alert-warning")
        return;//asagıya gecmesini onler
    }
    if (value) {
        github.fetchUserData(value).then((res) => {
            if (res.message === "Not Found") {
                ui.showAlert("Aradığınız kullanıcı bulunamadı.", "alert alert-danger")
            } else {
                ui.showAlert("Kullanıcı bulundu", "alert alert-success")
                ui.renderProfile(res.data)
                console.log(res);
                ui.renderProjects(res.repos);
            }
        })
            .catch((err) => (console.log(err)));//then bir Promise nesnesinin işlemi tamamlandığında veya reddedildiğinde çağrılacak olan bir veya iki argümanlı bir fonksiyon döndürür.
        return;
    }
}
//!Olay izleyicileri



elements.searchBtn.addEventListener('click', getInput);

