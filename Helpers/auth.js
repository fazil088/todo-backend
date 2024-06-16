import bcrypt from 'bcrypt';

export const passwordHash = (password) =>{
        return new Promise((resolve, reject)=>{
            bcrypt.genSalt(10,(err, salt)=>{
                if(err){
                    reject(err)
                    console.log(err)
                }
                bcrypt.hash(password, salt, (err, hash)=>{
                    if(err){
                        reject(err)
                        console.log(err)
                    }
                    resolve(hash)
                })
            })
        })
}

export const comparePassword = (password, hashedPassword)=>{
    return  bcrypt.compare(password, hashedPassword);
}