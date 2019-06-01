export function PostData(type, userData) {
    console.log(type);
    console.table(userData)
    let BaseURL = 'http://localhost:8080/backend/';
    return new Promise((resolve, reject) => {
        fetch(BaseURL + type + '.php', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
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
