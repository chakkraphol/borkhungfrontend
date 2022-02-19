export default ({ app, store, req, res }, inject) => {
  inject("IsLogin", (bvModal) => {
    return true;
  });
  inject("setHeaders", (token) => {
    return {
      headers: {
        /*'cache-control': 'no-cache',*/
        "content-type": "application/json",
        token: token,
      },
    };
  });
  inject("convertDate", (date) => {
    if (date) {
      const dateArray = date.split("-");
      return dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
    }
  });
  inject("formatPrice", (price) => {
    if (!price) {
      return price;
    }
    price = parseInt(price);
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
  });
};
