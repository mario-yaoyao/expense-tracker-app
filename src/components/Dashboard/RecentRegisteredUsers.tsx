// import { formatDate } from "../../utils/format";
// import { RoleBadge } from "../../utils/helper";
// import type { TRecentRegisteredUsersProps } from "../../types/dashboard";
// import "../../styles/dashboard/recent-users.scss";

// const RecentRegisteredUsers = ({ data }: TRecentRegisteredUsersProps) => {
//   return (
//     <div className="recent-users">
//       <label>Recently Registered Users</label>

//       <div className="list">
//         {data.map((recentUser) => (
//           <div key={recentUser.id} className="row">
//             <div className="content">
//               <div className="detail">
//                 <span>{recentUser.username}</span>
//                 <RoleBadge isSuperAdmin={recentUser.role === 0} />
//               </div>
//               <p className="date">{formatDate(recentUser.createdAt)}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecentRegisteredUsers;

import { formatDate } from "../../utils/format";
import { RoleBadge } from "../../utils/helper";
import Skeleton from "../ui/Sekeleton";
import type { TRecentRegisteredUsersProps } from "../../types/dashboard";
import "../../styles/dashboard/recent-users.scss";

const RecentRegisteredUsers = ({
  data,
  isLoading,
}: TRecentRegisteredUsersProps) => {
  return (
    <div className="recent-users">
      <label>Recently Registered Users</label>
      <div className="list">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <Skeleton width="100%" height="3.2rem" />
              </div>
            ))
          : data.map((recentUser) => (
              <div key={recentUser.id} className="row">
                <div className="content">
                  <div className="detail">
                    <span>{recentUser.username}</span>
                    <RoleBadge isSuperAdmin={recentUser.role === 0} />
                  </div>

                  <p className="date">{formatDate(recentUser.createdAt)}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default RecentRegisteredUsers;
