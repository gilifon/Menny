class API {
  static GetLanguages(val) {
    return fetch("http://localhost:5000/languages/branch=" + val.trim()).then(res => res.json());
  }
  static GetBranch(val) {
    return fetch("http://localhost:5000/branch/branch=" + val.trim()).then(res => res.json());
  }

  static GetClientInfo(val) {
    return fetch("http://localhost:5000/" + val.trim()).then(res => res.json());
  }
}
export default API;
