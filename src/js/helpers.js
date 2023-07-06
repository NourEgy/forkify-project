
import { TIMEOUT_SEC } from "./config";

const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request Took Too Long! timeout After ${s} second`))
        }, s * 1000);
    });
};


export const AJAX = async function(url, uploadData = undefined) {
    try {
        // Fetch API
        const fetchPro = uploadData ? 
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData)
        })
        : fetch(url);
        //const rest = await fetchPro;
        const rest = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await rest.json();

        // Check Erorr
        if (!rest.ok) throw new Error(`${data.message} (${rest.stauts})`);

        // Return Data With Function
        return data;

    } catch(error) {
       throw error;
    }
}
/*
export const getJSON = async function(url) {
    try {
        
        // Fetch API
        const fetchPro = fetch(url);
        //const rest = await fetchPro;
        const rest = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await rest.json();

        // Check Erorr
        if (!rest.ok) throw new Error(`${data.message} (${rest.stauts})`);

        // Return Data With Function
        return data;

    } catch(error) {
       throw error;
    }
}


export const sendJSON = async function(url, uploadData) {
    try {
        // Fetch API
        const fetchPro = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData)
        });
        //const rest = await fetchPro;
        const rest = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await rest.json();

        // Check Erorr
        if (!rest.ok) throw new Error(`${data.message} (${rest.stauts})`);

        // Return Data With Function
        return data;

    } catch(error) {
       throw error;
    }
}
*/

