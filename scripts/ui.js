import { elements } from "./helpers.js";

export class UI {
    constructor() {
        this.profile = elements.profile;
        this.button = elements.btnClear;
        this.input = elements.searchInput;
        this.body = elements.body;
        this.btnDark = elements.btn
        this.repoArea = elements.repos


        //olay izleyicileri
        this.btnDark.addEventListener("click", this.darkMode.bind(this))
        this.button.addEventListener('click', this.clearProfile.bind(this))//bind herseyi aktarmak icin bu uı classında
    }
    //profil arayüzünü ekrana basar
    renderProfile(res) {

        const created_at = new Date(res.created_at).toLocaleDateString()
        this.profile.innerHTML = `
        <div class="row border p-4 my-4 rounded-3">
            <div class="col-md-3">
                <img src="${res.avatar_url}" alt="" class="img-fluid rounded shadow">
                <a href="${res.html_url}" target="_blank" class="btn btn-primary w-100 mt-4">Profili göster</a>
            </div>
            <div class="col-md-9 gap-3 " id="profileButton">
                <span class="badge fs-6 bg-primary">Açık Repolar:${res.public_repos}</span>
                <span class="badge fs-6 bg-secondary">Açık Gistler:${res.public_gists}</span>
                <span class="badge fs-6 bg-success">Takipçiler:${res.followers}</span>
                <span class="badge fs-6 bg-info">Takip Edilenler:${res.following}</span>

                <ul class="list-group mt-3">
                    <li class="list-group-item">Hakkında: ${res.bio}</li>
                    <li class="list-group-item">Şirket: ${res.company}</li>
                    <li class="list-group-item">Website: ${res.blog}</li>
                    <li class="list-group-item">Konum: ${res.location}</li>
                    <li class="list-group-item">Hesap Oluşturma: ${created_at}</li>

                </ul>

            </div>
        </div>
        `
    }
    //Uyari mesajı olusturma
    showAlert(message, className) {
        const div = document.createElement("div");
        div.className = className
        div.textContent = message

        elements.warning.appendChild(div)

        //showalert fonksiyonu calistiktan sonra  3 saniye sonra calistir.
        setTimeout(() => {
            this.clearAlert()
        }, 3000)
    }
    //uyarıyı ekrandan silme
    clearAlert() {
        const currentAlert = document.querySelector(".alert")
        if (currentAlert) {
            currentAlert.remove()
        }

    }
    //ekrani temizleme ve bildirim basma
    clearProfile(e) {
        e.preventDefault()
        if (confirm("silmek istediğinize emin misiniz?")) {
            this.profile.innerHTML = "";
            this.input.value = "";
            this.showAlert("Bütün veriler silindi.", "alert alert-info")
            this.repoArea.innerHTML="";
        }
    }
    darkMode() {
        if (this.body.classList.contains("bg-dark")) {
            this.body.className = "bg-light text-bg-light";
            this.btnDark.className = "btn btn-dark";
            this.btnDark.textContent = "Dark Mode";
        } else if (this.body.classList.contains("bg-light")) {
            this.body.className = "bg-dark text-bg-dark";
            this.btnDark.className = "btn btn-light";
            this.btnDark.textContent = "Light Mode";
        }

        elements.title.classList.toggle("text-dark");

    }
    renderProjects(data) {
        //projeler dizisindeki her elemana kart olustur ve ekrana bas
        data.forEach((repo) => {
            this.repoArea.innerHTML +=`
            <div class="border row p-3 mb-3">
            <div class="col-6 ">
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col-6 border">
                <span class="badge bg-secondary">Yıldız:${repo.stargazers_count}</span>
                <span class="badge bg-primary">Fork:${repo.forks_count}</span>
                <span class="badge bg-success">İzleyenler:${repo.watchers}</span>

            </div>

        </div>`
        });

    }
}