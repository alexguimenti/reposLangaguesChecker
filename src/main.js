import api from "./api";

class App {
  constructor() {
    this.repositories = [];
    this.reposNames = [];
    this.formEl = document.querySelector("#repo-form")
    this.inputEl = document.querySelector('input')
    this.user = '';
    this.languages = {}
    this.sortedLanguagesArr = []

    this.registerHandler();
  }

  registerHandler() {
    this.formEl.onsubmit = event => this.searchRepos(event);
  }

  async searchRepos(event) {
    this.user = this.inputEl.value
    event.preventDefault();
    const reposResponse = await api.get(`users/${this.user}/repos`)
    //console.log(reposResponse)
    const repos = reposResponse.data
    let reposSize = 0, repo;
    for (repo in repos) {
      reposSize++;
    }

    for (let i = 0; i < reposSize; i++) {
      this.reposNames.push(repos[i].name)
    }
    //console.log(this.reposNames)

    

    this.loop()
    
  }

  async searchLanguages(repoName) {
    const languagesResponse = await api.get(`repos/${this.user}/${repoName}/languages`)
    //console.log(languagesResponse.data)
    let repoLangagues = Object.keys(languagesResponse.data);
    //console.log(repoLangagues)
    repoLangagues.forEach(language => {
      //onsole.log(`Olhando: ${language}`)
      //console.log(this.languages[`${language}`])
      if (this.languages[`${language}`]) {
        //console.log("Existe!")
        this.languages[`${language}`] += languagesResponse.data[`${language}`];

      } else {
        this.languages[`${language}`] = languagesResponse.data[`${language}`];
      }
    })
    console.log(`Total:`)
    console.log(this.languages)
  }

  async loop() {
    let limit = 0;
    await this.reposNames.forEach((repo, index) => {
      if (limit < 5) {
        limit++;
        this.searchLanguages(repo)
      }
    })

  }

  async sortResult() {
    await this.loop()
    this.sortedLanguagesArr = Object.keys(this.languages).sort(function (a, b) { return list[a] - list[b] })
    console.log(this.languages)
    console.log(this.sortedLanguagesArr)
  }



}

new App();