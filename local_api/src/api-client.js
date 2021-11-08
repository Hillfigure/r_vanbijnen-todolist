const baseUrl = "http://localhost:3000/"

async function getAllItems() {

    try {
        return await fetch(baseUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
        } catch (error) {
            console.log(error);
        }
}

async function postItem(data) {

    try {
        return await fetch(baseUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
        } catch (error) {
            console.log(error);
        }
}

async function deleteItem(id) {

    try {
        return await fetch(baseUrl + id, {
            method: 'DELETE',
        })
        } catch (error) {
            console.log(error);
        }
}

async function putItem(data, id) {

    try {
        return await fetch(baseUrl + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
        } catch (error) {
            console.log(error);
        }
}