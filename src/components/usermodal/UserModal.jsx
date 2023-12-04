import { MenuItem, Modal, Select, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { postUser, updateUser } from '../../actions/useractions'

const UserModal = ({ modalVisible, setModalVisible, curAvailability, curDomain, curEmail, curFirstName, curGender, curLastName, setCurAvailability, setCurDomain, setCurEmail, setCurFirstName, setCurGender, setCurLastName, genders, availabilities, domains, isUpdateForm=false, user={}, setUser=()=>{}, reload}) => {
  useEffect(() => {
    if (isUpdateForm===false) {
      setCurAvailability("Available");
      setCurDomain("Sales");
      setCurEmail("");
      setCurGender("Male");
      setCurFirstName("");
      setCurLastName("");
    } else {
      setCurAvailability(user.available? "Available" : "Not Available");
      setCurDomain(user.domain);
      setCurEmail(user.email);
      setCurGender(user.gender);
      setCurFirstName(user.first_name);
      setCurLastName(user.last_name);
    }
    // eslint-disable-next-line
  }, [modalVisible]);

  return (
    <Modal
        open={modalVisible}
        onClose={() => {setModalVisible(false); setUser({})}}
        className="flex justify-center items-center"
      >
        <div className="bg-white px-3 sm:px-10 py-5 rounded-lg">
          <div className="flex flex-col justify-center items-center gap-4 p-5 flex-wrap">
            <div className="w-full sm:max-w-[400px]">
              <TextField 
                label="First name"
                variant="outlined"
                size="medium"
                className="w-full"
                value={curFirstName}
                onChange={(e) => setCurFirstName(e.target.value)}
              />
            </div>
            <div className="w-full sm:max-w-[400px]">
              <TextField 
                label="Last name"
                variant="outlined"
                size="medium"
                className="w-full"
                value={curLastName}
                onChange={(e) => setCurLastName(e.target.value)}
              />
            </div>
            <div className="w-full sm:max-w-[400px]">
              <TextField 
                label="Email address"
                variant="outlined"
                size="medium"
                className="w-full"
                value={curEmail}
                onChange={(e) => setCurEmail(e.target.value)}
              />
            </div>
            <div className="w-full sm:max-w-[400px]">
              <Select
                value={curGender}
                label="Gender"
                onChange={(e) => setCurGender(e.target.value)}
                className="w-full"
              >
                {genders.map((item, index) => (
                  <MenuItem value={item} key={index}>{item}</MenuItem>
                ))}
              </Select>
            </div>
            <div className="w-full sm:max-w-[400px]">
              <Select
                value={curDomain}
                label="Domain"
                onChange={(e) => setCurDomain(e.target.value)}
                className="w-full"
              >
                {domains.map((item, index) => (
                  <MenuItem value={item} key={index}>{item}</MenuItem>
                ))}
              </Select>
            </div>
            <div className="w-full sm:max-w-[400px]">
              <Select
                value={curAvailability}
                label="Availability"
                onChange={(e) => setCurAvailability(e.target.value)}
                className="w-full"
              >
                {availabilities.map((item, index) => (
                  <MenuItem value={item} key={index}>{item}</MenuItem>
                ))}
              </Select>
            </div>
            <button 
              onClick={() => {
                const body = {
                    first_name: curFirstName, 
                    last_name: curLastName, 
                    email: curEmail, 
                    gender: curGender, 
                    domain: curDomain, 
                    available: curAvailability==="Available"? true : false,
                    avatar: 'https://robohash.org/sintessequaerat.png?size=50x50&set=set1'
                }
                if (isUpdateForm) {
                  updateUser(body, user.id, reload);
                  setUser({});
                } else {
                  postUser(body, reload);
                }
                setModalVisible(false);
                }}
              className="px-4 py-2 bg-slate-300 rounded-lg hover:bg-slate-400 active:bg-slate-400 transition-all disabled:cursor-not-allowed"
              disabled={curFirstName==="" || curLastName==="" || curEmail===""}
            >
              {isUpdateForm? "Update User" : "Add User"}
            </button>
          </div>
        </div>
      </Modal>
  )
}

export default UserModal