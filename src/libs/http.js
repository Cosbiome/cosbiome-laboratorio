import axios from "axios";

// const endpointserver = "https://cosbiome.online/";
const endpointserver = "http://192.168.15.157:1337/";

class Http {
  // static instance = new Http();

  get = async (url) => {
    try {
      let req = await axios.get(`${endpointserver}${url}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      return req.data;
    } catch (error) {
      throw Error(error);
    }
  };

  post = async (url, body) => {
    try {
      let req = await axios.post(`${endpointserver}${url}`, body, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      return req.data;
    } catch (error) {
      throw Error(error);
    }
  };

  update = async (url, body) => {
    try {
      let req = await axios.put(`${endpointserver}${url}`, body, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      return req.data;
    } catch (error) {
      throw Error(error);
    }
  };

  delete = async (url) => {
    try {
      let req = await axios.delete(`${endpointserver}${url}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      return req.data;
    } catch (error) {
      // throw Error(error);
    }
  };

  login = async (url, body) => {
    try {
      let req = await axios.post(`${endpointserver}${url}`, body, {
        headers: {
          "Content-type": "application/json",
        },
      });

      return req.data;
    } catch (error) {
      throw Error(error);
    }
  };
}

const http = new Http();

export { http };
