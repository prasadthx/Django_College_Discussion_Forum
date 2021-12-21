export default class User {
    id: String;
    firstName : String;
    lastName : String;
    rollNo : String;
    email : String;
    token : String;

    constructor() {
        this.id = "";
        this.firstName = "";
        this.lastName = "";
        this.rollNo = "";
        this.email = "";
        this.token = "";
    }

    getString(){
        return `{ "id" : "${this.id}", "firstName" : "${this.firstName}", "lastName" : "${this.lastName}", 
                  "rollNo" : "${this.rollNo}", "email" : "${this.email}" , "token" : "${this.token}" }`;
    }
}
