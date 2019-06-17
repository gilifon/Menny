class API {
  static GetLanguages(branch_id) {
    return fetch("http://localhost:5000/languages/branch=" + branch_id.trim()).then(res => res.json());
  }
  static GetBranch(branch_id) {
    return fetch("http://localhost:5000/branch/branch=" + branch_id.trim()).then(res => res.json());
  }
  static GetMenu(branch_id,language_id) {
    return fetch("http://localhost:5000/menu/branch=" + branch_id.trim() + "/language=" +  language_id.trim()).then(res => res.json());
  }
  static GetDefaultMenu(branch_id,language_id) {
    return fetch("http://localhost:5000/menu/branch=" + branch_id.trim()).then(res => res.json());
  }
}
export default API;
