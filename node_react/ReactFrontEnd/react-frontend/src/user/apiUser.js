export const read =(userId, token)=>{
    return fetch(`http://localhost:8080/user/${userId}`,{
        method: 'GET',
        headers: {
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

export const update =(userId, token, user)=>{
    console.log('user data update ', user)
    return fetch(`http://localhost:8080/user/${userId}`,{
        method: 'PUT',
        headers: {
            Accept:"application/json",
            //"Content-Type":"application/json",            
            Authorization:`Bearer ${token}`
        },
        body: user// JSON.stringify(user)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}


export const remove =(userId, token)=>{
    return fetch(`http://localhost:8080/user/${userId}`,{
        method: 'DELETE',
        headers: {
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

export const list = ()=>{
    return fetch(`http://localhost:8080/users`,{
        method: 'GET',        
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

export const updateUser = (user,next) => {
    if(typeof window !== undefined){
        if(localStorage.getItem('jwt')){
            let auth = JSON.parse(localStorage.getItem('jwt'));
            auth.user = user;
            localStorage.setItem('jwt',JSON.stringify(auth))
            next()
        }
    }
}