import axios from "axios";

export default class BulletinApi {
    static async getList() {
        try {
            const results = await axios.get(`http://localhost:3001/api/v1/bulletins`);
            return results.data;
        } catch (e) {
            console.log(e);
        }
    }

    static async setDecisions(bulletins) {
        try {
            const results = await axios.post(`http://localhost:3001/api/v1/decisions`, {bulletins});
            return results.data;
        } catch (e) {
            console.log(e);
        }
    }

    static getImage(imageFile) {
        return "http://localhost:3001" + imageFile;
    }
}