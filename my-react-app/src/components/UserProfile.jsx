import { useParams } from "react-router-dom";
const UserProfile = () => {
  const userId = useParams().userId;

  return (
    <div>
      <h1>User {userId} Profile Page</h1>
      <p>
        This page displays user-specific information based on the userId
        parameter in the URL.
      </p>
    </div>
  );
};

export default UserProfile;
