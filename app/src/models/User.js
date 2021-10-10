"use struct";

const UserStorage = require("./UserStorage");

class User{
    constructor(body){
        this.body = body;
    }
    async login(){
        const client = this.body;
        //await은 promise를 반환하는 것에만 사용 가능 (.then()도 가능)
        try{
            const {id, psword} = await UserStorage.getUserInfo(client.id);
        
            if(id){
                if(id===client.id && psword===client.psword){
                    return {sucess:true};
                }
                return {sucess:false, msg:"비밀번호가 틀렸습니다."};
            }
            return {sucess:false, msg:"존재하지 않는 아이디입니다."};
        } catch(err){
            return {sucess:false, err};
        }
    }
    async register(){
        const client = this.body;
        try{
            const response = await UserStorage.save(client);
            return response;
        } catch(err){
            return { sucess:false, err };
        }
    }
}
module.exports = User;