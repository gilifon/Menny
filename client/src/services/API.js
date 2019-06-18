class API {
  static GetLanguages(branch_id) {
    return fetch("/api/languages/branch=" + branch_id.trim()).then(res =>
      res.json()
    );
  }
  static GetBranch(branch_id) {
    return fetch("/api/branch/branch=" + branch_id.trim()).then(res =>
      res.json()
    );
  }
  static GetMenu(branch_id, language_id) {
    return fetch(
      "/api/menu/branch=" + branch_id.trim() + "/language=" + language_id.trim()
    ).then(res => res.json());
  }
  static GetDefaultMenu(branch_id, language_id) {
    return fetch("/api/menu/branch=" + branch_id.trim()).then(res =>
      res.json()
    );
  }
  static GetLanguage(language_id) {
    return fetch("/api/language/language=" + language_id.trim()).then(res =>
      res.json()
    );
  }
}
export default API;
