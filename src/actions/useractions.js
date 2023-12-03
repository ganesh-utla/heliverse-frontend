export const baseUrl = 'http://localhost:5000';

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


export const postUser = async (body) => {
    console.log(body);
    // const res = await fetch(`${baseUrl}/api/users/`, {
    //     method: "post",
    //     headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': true},
    //     body: body
    // });
    console.log("1 user added");
}