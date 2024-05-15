export class Github{
    constructor(){
        this.client_id="Ov23libWN8Nsephmqxdu";
        this.client_secret="41d175cb67924ce275f3ad1b15e6496c7776adc7";//githubla iletisim kurmamıza yarar
        this.per_page=10;
        this.sort="asc";
    }
    //api den kullanıcıları alma
    async fetchUserData(username){
        //parametre kullanarak gelen kullanıcı ismine göre istek attik
        const profileRes=await fetch(
            `https://api.github.com/users/${username}?client_id=${this.client_id}&client_secret=${this.client_secret}`
        );
        //kullanıcı repolarını almak icin istek attık
        const repoRes=await fetch(
            `https://api.github.com/users/${username}/repos?client_id=${this.client_id}&client_secret=${this.client_secret}&per_page=${this.per_page}&sort=${this.sort}`
        );
        
        //apiden aldıgımızı json yapısına cevirdik
        const data=await profileRes.json();
        const repos =await repoRes.json();
        
        //fonksiyonun cagrildigi yere bilgileri gonderme
        return {data,repos};

    }
}