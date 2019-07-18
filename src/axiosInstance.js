import axios from 'axios'

const instance = axios.create({
    baseURL: window.location.url
})

const httpRequest = ({url = "/posts", data = '', loader = false}) => {
    if(!url || typeof url !== 'string') return Promise.reject({error: 'Not a valid Request'});

    let sendRequest = instance.get(url);
    
    let responseRequest = sendRequest.then(response => {
        let status = response.status;
        if(status !== 200) Promise.reject(response)
        return Promise.resolve({data:response.data,statusText: response.statusText});
    }).catch(error=>{
       return Promise.reject({error, statusText:error.response.statusText})
    });

    return responseRequest;

}


export default httpRequest;
