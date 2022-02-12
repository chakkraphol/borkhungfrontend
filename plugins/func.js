export default ({ app, store, req, res }, inject) => {
  inject("IsLogin", (bvModal) => {
    alert("xxx");
    return true;
  });
};
