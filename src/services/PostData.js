export function PostData(type, userData) {
    let BaseURL = 'https://localhost/desafio-php/api/index.php';
    return new Promise((resolve, reject) =>{
    
    fetch(BaseURL+'?tp='+type,
    {
        method: 'POST',
        headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body:JSON.stringify(userData)
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