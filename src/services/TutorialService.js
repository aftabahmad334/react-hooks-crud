import http from "../http-common";

const getAll = () => {
  return http.get("/fetch_list.php");
};

const get = id => {
  return http.get(`/fetchOne.php?id=${id}`);
};

const create = data => {
  return http.post("/create.php/", data);
};

const update = (id, data) => {
  return http.post(`/update.php/`,data);
};

const remove = id => {
  return http.delete(`/remove.php?id=${id}`);
};

const removeAll = () => {
  return http.delete(`/remove.php/`);
};

const findByTitle = title => {
  return http.get(`/fetch_list.php?title=${title}`);
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default TutorialService;