import { useEffect, useState } from "react";
import MultiSelect from "./components/multiselect/Multiselect";
import { Card, TextField } from "@mui/material";
import { PeopleAltOutlined } from "@mui/icons-material";
import UserCard from "./components/usercard/UserCard";
import TeamCard from "./components/teamcard/TeamCard";
import { fetchUserCount, fetchUsers } from "../src/actions/useractions";
import UserModal from "./components/usermodal/UserModal";


function App () {

  const domains = ['Sales', 'Finance', 'Marketing', 'IT', 'Management', 'UI Designing', 'Business Development'];
  const [selectedDomains, setSelectedDomains] = useState([]);
  const genders = ['Male', 'Female', 'Agender'];
  const [selectedGenders, setSelectedGenders] = useState([]);
  const availabilities = ['Available', 'Not Available'];
  const [selectedAvailability, setSelectedAvailability] = useState([]);

  const [searchUser, setSearchUser] = useState("");

  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [curTeam, setCurTeam] = useState([]);
  const [userCount, setUserCount] = useState(0);

  const [skipAmount, setSkipAmount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [curFirstName, setCurFirstName] = useState("");
  const [curLastName, setCurLastName] = useState("");
  const [curGender, setCurGender] = useState("Male");
  const [curDomain, setCurDomain] = useState("Sales");
  const [curEmail, setCurEmail] = useState("");
  const [curAvailability, setCurAvailability] = useState("Available");

  const [showDetails, setShowDetails] = useState(false);
  const [updateUser, setUpdateUser] = useState({});

  const getPreviousUsers = () => {
    fetchUsers(skipAmount - 20, searchUser, selectedGenders, selectedDomains, selectedAvailability);
    setSkipAmount(skipAmount - 20);
  }
  
  const getNextUsers = () => {
    fetchUsers(skipAmount + 20, searchUser, selectedGenders, selectedDomains, selectedAvailability);
    setSkipAmount(skipAmount + 20);
  }

  const dataFetcher = async () => {
    const count = await fetchUserCount(searchUser, selectedGenders, selectedDomains, selectedAvailability);
    setUserCount(count);
    const data = await fetchUsers(0, searchUser, selectedGenders, selectedDomains, selectedAvailability);
    setUsers(data);
  }

  useEffect(() => {
    // console.log([searchUser, selectedGenders, selectedDomains, selectedAvailability]);
    dataFetcher();
    // eslint-disable-next-line
  }, [searchUser, selectedGenders, selectedDomains, selectedAvailability]);

  return (
    <div className="w-full h-screen overflow-auto pb-20 relative scroll-smooth">
      <UserModal
        genders={genders} domains={domains} availabilities={availabilities}
        curAvailability={curAvailability} curDomain={curDomain} curEmail={curEmail} curFirstName={curFirstName} curGender={curGender} curLastName={curLastName} modalVisible={modalVisible}
        setCurAvailability={setCurAvailability} setCurDomain={setCurDomain} setCurEmail={setCurEmail} setCurFirstName={setCurFirstName} setCurGender={setCurGender} setCurLastName={setCurLastName} setModalVisible={setModalVisible}
        isUpdateForm={updateUser.id!==undefined}
        user={updateUser}
        setUser={setUpdateUser}
        reload={dataFetcher}
      />

      <div className="flex justify-center items-center p-5 bg-slate-100">
        <p className="text-xl font-semibold underline">Heliverse Assignment by Ganesh Utla</p>
      </div>

      <div className="w-full">
        <div className="flex justify-center items-center gap-4 p-5 flex-wrap">
          <div className="w-full sm:max-w-[300px]">
            <TextField 
              label="Search by name or email"
              variant="outlined"
              size="medium"
              className="w-full"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
          </div>
          <div className="w-full sm:max-w-[300px]">
            <MultiSelect 
              options={domains}
              selectedOptions={selectedDomains}
              setSelectedOptions={setSelectedDomains}
              title={"Filter Domains"}
            />
          </div>
          <div className="w-full sm:max-w-[300px]">
            <MultiSelect 
              options={genders}
              selectedOptions={selectedGenders}
              setSelectedOptions={setSelectedGenders}
              title={"Filter Genders"}
            />
          </div>
          <div className="w-full sm:max-w-[300px]">
            <MultiSelect 
              options={availabilities}
              selectedOptions={selectedAvailability}
              setSelectedOptions={setSelectedAvailability}
              title={"Filter Availabilities"}
            />
          </div>
        </div>

        <div className="mb-5 flex justify-center items-center gap-5">
          {userCount===0? 
          <p className="text-xl font-semibold text-center">No user found</p> :
          <p className="text-xl font-semibold text-center">{userCount} user(s) found</p>
          }
          <button 
            onClick={() => setModalVisible(true)}
            className="px-4 py-2 bg-slate-200 rounded-lg hover:bg-slate-300 active:bg-slate-300 transition-all"
          >
            Add User
          </button>
        </div>

        <div className="w-full px-5 sm:px-10 flex justify-center items-center flex-wrap gap-5">
          { users.map((user, index) => (
            <UserCard user={user} key={index} curTeam={curTeam} setCurTeam={setCurTeam} teams={teams} setModalVisible={setModalVisible} setUpdateUser={setUpdateUser} reload={dataFetcher} />
          ))}
        </div>

        <div className="mt-10 w-full flex justify-center items-center flex-wrap gap-5">
          <button 
            onClick={() => getPreviousUsers()}
            className="px-4 py-2 bg-slate-200 rounded-lg hover:bg-slate-300 active:bg-slate-300 transition-all disabled:cursor-not-allowed"
            disabled={skipAmount===0}
          >
            Previous
          </button>
          <button 
            onClick={() => getNextUsers()}
            className="px-4 py-2 bg-slate-200 rounded-lg hover:bg-slate-300 active:bg-slate-300 transition-all disabled:cursor-not-allowed"
            disabled={skipAmount+20 > userCount}
          >
            Next
          </button>
        </div>
        
        {
          curTeam.length > 0 && 
        <Card className="w-full my-10">
            <div className="flex justify-center items-center bg-slate-200 p-5">
                <div className="w-full max-w-3xl flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3">
                    <h3 className="font-semibold text-xl">Selected Team Members</h3>
                    <div className="flex justify-center items-center gap-4">
                        <button 
                            className="px-4 py-2 bg-slate-300 rounded-lg hover:bg-slate-400 active:bg-slate-400 transition-all"
                            onClick={() => {setTeams(prev => [{members: curTeam}, ...prev]); setCurTeam([])}}
                        >
                            Form Team
                        </button>
                        <button 
                            className="px-4 py-2 bg-slate-300 rounded-lg hover:bg-slate-400 active:bg-slate-400 transition-all"
                            onClick={() => setShowDetails(prev => !prev)}
                        >
                            {showDetails? "Hide details" : "Show details"}
                        </button>
                        <button 
                            className="px-4 py-2 bg-red-300 rounded-lg hover:bg-red-400 active:bg-red-400 transition-all"
                            onClick={() => setCurTeam([])}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full p-5 sm:px-10 flex justify-center items-center flex-wrap gap-5">
                {curTeam.map((member, index) => (
                    <UserCard user={member} key={index} showDetails={showDetails} isTeamCard={true} setModalVisible={setModalVisible} setUpdateUser={setUpdateUser} reload={dataFetcher}  />
                ))}
            </div>
            
        </Card>
        }

        <div id="teams-created" className="mt-20 mb-5">
          <p className="text-xl font-semibold text-center">{teams.length} team(s) created</p>
        </div>

        <div className="w-full px:5 sm:px-10">
          { teams.map((team, index) => (
            <TeamCard team={team} key={index} id={index+1} setTeams={setTeams} />
          ))}
        </div>

      </div>

      <a href="#teams-created">
        <div 
          className="w-[65px] h-[65px] bg-slate-400 hover:bg-slate-500 active:bg-slate-500 cursor-pointer rounded-full fixed bottom-10 right-10 flex flex-col justify-center items-center">
          <PeopleAltOutlined className="text-white " sx={{ width: 30, height: 30}} />
          <p className="text-white text-xs">Teams</p>
        </div>
      </a>
    </div>
  );
}

export default App;
