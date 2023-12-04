import { Card } from "@mui/material";
import UserCard from "../usercard/UserCard";
import { useState } from "react";

const TeamCard = ({ team, id, setTeams, teams }) => {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card className="w-full my-10">
            <div className="flex justify-center items-center bg-slate-200 p-5">
                <div className="w-full max-w-3xl flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3">
                    <h3 className="font-semibold text-xl">Team {id}</h3>
                    <div className="flex justify-center items-center gap-4">
                        <button 
                            className="px-4 py-2 bg-slate-300 rounded-lg hover:bg-slate-400 active:bg-slate-400 transition-all"
                            onClick={() => setShowDetails(prev => !prev)}
                        >
                            {showDetails? "Hide details" : "Show details"}
                        </button>
                        <button 
                            className="px-4 py-2 bg-red-300 rounded-lg hover:bg-red-400 active:bg-red-400 transition-all"
                            onClick={() => {setTeams(prev => [...prev.slice(0,id-1), ...prev.slice(id)])}}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full p-5 sm:px-10 flex justify-center items-center flex-wrap gap-5">
                {team.members.map((member, index) => (
                    <UserCard user={member} key={index} isTeamFormed={true} teamId={id} teams={teams} setTeams={setTeams} showDetails={showDetails} isTeamCard={true} />
                ))}
            </div>
            
        </Card>
    )
}

export default TeamCard;