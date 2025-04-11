import CommentsSection from "./CommentsSection";
import ProfilePageSection from "./ProfilePageSection";

const ProfilePage = () => {
  return (
    <div className="flex flex-col items-start p-6 w-full gap-8">
      <ProfilePageSection label="Recently Liked Movies" endpoint="liked" />
      <ProfilePageSection label="Recently Saved Movies" endpoint="saved" />
      <CommentsSection />
    </div>
  );
};

export default ProfilePage;
