import httpClient from "../httpClient";

export const baseUrl = 'https://heliverse-backend-jixe.onrender.com';

export const fetchUsers = async (skip, searchUser, selectedGenders, selectedDomains, selectedAvailability) => {
    const query = { skip: skip };
    if (searchUser!=='') query.searchText = searchUser;
    if (selectedGenders.length!==0) query.gender = JSON.stringify(selectedGenders);
    if (selectedDomains.length!==0) query.domain = JSON.stringify(selectedDomains);
    if (selectedAvailability.length!==0) query.available = JSON.stringify(selectedAvailability);

    const res = await fetch(`${baseUrl}/api/users/?` +  new URLSearchParams(query));
    const data = await res.json();
    return data;
}

export const fetchUserCount = async (searchUser, selectedGenders, selectedDomains, selectedAvailability) => {
    const query = { skip: 0 };
    if (searchUser!=='') query.searchText = searchUser;
    if (selectedGenders.length!==0) query.gender = JSON.stringify(selectedGenders);
    if (selectedDomains.length!==0) query.domain = JSON.stringify(selectedDomains);
    if (selectedAvailability.length!==0) query.available = JSON.stringify(selectedAvailability);
    const res = await fetch(`${baseUrl}/api/users/?` + new URLSearchParams({
        usedfor: 'user-count',
        ...query
    }));
    const data = await res.json();
    return data.count;
}


export const postUser = async (body, reload) => {
    await httpClient.post('/api/users', {
        ...body
    })
    .then((res) => {
        if (res.status===200) {
            console.log("1 user added");
        }
        reload();
    })
    .catch(() => {
        console.log('error in adding user');
    });
}

export const updateUser = async (body, id, reload) => {
    await httpClient.put(`/api/users/${id}`, {
        ...body
    })
    .then((res) => {
        if (res.status===200) {
            console.log("1 user updated");
        }
        reload();
    })
    .catch(() => {
        console.log('error in updating user');
    });
}

export const deleteUser = async (id, reload) => {
    await httpClient.delete(`/api/users/${id}`)
    .then((res) => {
        if (res.status===200) {
            console.log("1 user deleted");
        }
        reload();
    })
    .catch(() => {
        console.log('error in deleting user');
    });
}