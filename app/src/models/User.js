"use struct";

const UserStorage = require("./UserStorage");

class User{
    constructor(body){
        this.body = body;
    }
    login(){
        const client = this.body;
        const {id, psword} = UserStorage.getUserInfo(client.id);
        
        if(id){
            if(id===client.id && psword===client.psword){
                return {sucess:true};
            }
            return {sucess:false, msg:"비밀번호가 틀렸씁니다."};
        }
        return {sucess:false, msg:"존재하지 않는 아이디입니다."};
    
    }
    register(){
        const client = this.body;
        const response = UserStorage.save(client);
        return response;
    }
}
module.exports = User;