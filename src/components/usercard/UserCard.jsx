import { Delete, Edit } from "@mui/icons-material";
import { Card } from "@mui/material";

const UserCard = ({ user, showDetails=true, isTeamCard=false, curTeam, setCurTeam, teams }) => {

    return (
        <Card className="w-full sm:max-w-[300px]">
              <div className="flex justify-between items-center bg-slate-200 p-3">
                <div className="flex justify-left items-center gap-2">
                  <div className="w-50 h-50">
                    <img 
                      src={user.avatar} 
                      alt={user.first_name + " " + user.last_name} 
                      className="w-full h-full rounded-lg object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{user.first_name} {user.last_name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                {isTeamCard &&
                  <button>
                    <Delete color="error" />
                  </button>
                }
              </div>
              {showDetails && (
                <div className="px-5 py-3">
                    <p className="text-sm">
                    <span className="font-semibold">Gender: </span>{user.gender}
                    </p>
                    <p className="text-sm">
                    <span className="font-semibold">Domain: </span>{user.domain}
                    </p>
                    <p className="text-sm">
                    <span className="font-semibold">Availability: </span>{user.available? "Available" : "Not Available"}
                    </p>
                </div>
              )}
              {!isTeamCard && (
                <div className="mt-2 mb-5 flex justify-center items-center gap-4">
                  <button 
                    onClick={() => {
                      if (!user.available) {
                        alert('user not available');
                      }
                      else if (curTeam.includes(user)) {
                        alert('user already exists in list');
                      } else {
                        let f = true;
                        for (let i=0; i<curTeam.length; i++) {
                          if (curTeam[i].domain===user.domain) {
                            f = false;
                            alert('select user with another domain');
                            break;
                          }
                        }
                        if (!f) return;
                        for (let i=0; i<teams.length; i++) {
                          if (teams[i].members.includes(user)) {
                            f = false;
                            alert('user already exists in another team');
                            break;
                          }
                        }
                        if (f) {
                          setCurTeam(prev => [user, ...prev]);
                        }
                      }
                    }}
                    className="px-4 py-2 bg-slate-200 rounded-lg hover:bg-slate-300 active:bg-slate-300 transition-all">
                    Add to Team
                  </button>
                  <Edit color="info" className="cursor-pointer" />
                  <Delete color="error" className="cursor-pointer" />
                  
                </div>
              )}
            </Card>
    )
}

export default UserCard;