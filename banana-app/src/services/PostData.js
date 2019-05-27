export function PostData(type, userData) {

    let BaseURL = 'http://api.thewallscript.com/restful/';
    return new Promise((resolve, reject) => {
        fetch(BaseURL+type, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
