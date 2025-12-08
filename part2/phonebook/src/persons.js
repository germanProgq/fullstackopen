import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons"

const getAll = async () => {
    try {
        const req = axios.get(baseUrl);
        const res = await req;
        return res.data;
    }
    catch (err) {
        return err.response.data;
    }
};

const update = async (id, newObj) => {
    try {
        const req = axios.put(`${baseUrl}/${id}`, newObj);
        const res = await req;
        return res.data;
    }
    catch (err) {
        return err.response.data;
    }
};

const create = async (newObj) => {
  try {
    const res = await axios.put(baseUrl, newObj);
    return res.data;            // success
  } catch (err) {
    return err.response.data;   // backend error response
  }
};

const deletePerson = async (id) => {
    try {    
        const req = axios.delete(`${baseUrl}/${id}`);
        return res.data;
    }
    catch (err) {
        return err.response.data;
    }
}

export default {getAll, update, create, deletePerson}