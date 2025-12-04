import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const getAll = async () => {
    const req = axios.get(baseUrl);
    const res = await req;
    return res.data;
};

const update = async (id, newObj) => {
    const req = axios.post(`${baseUrl}/${id}`, newObj);
    const res = await req;
    return res.data;
};

const create = async (newObj) => {
    const req = axios.post(`${baseUrl}`, newObj);
    const res = await req;
    return res.data;
};

const deletePerson = async (id) => {
    const req = axios.delete(`${baseUrl}/${id}`);
    const res = await req;
    return res.data;
}

export default {getAll, update, create, deletePerson}