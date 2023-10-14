export const userMapping = (user: SUser): User => {
  return {
    id: user._id,
    name: user.email,
    avatar: user?.imageUri || "",
    role: user.role,
    displayName: user.displayName || "",
    profileStory: user.profileStory || "",
    profileTitles: user.profileTitles || "",
    profileYoutubeLink: user.profileYoutubeLink || "",
    profileDiscordLink: user.profileDiscordLink || "",
    profileYoutubeCount: user.profileYoutubeCount || "",
    profileSubscriber: user.profileSubscriber || "",
    profileTotalCourse: user.profileTotalCourse || "",
    discordId: user.discordId || "",
    guideId: user.guideId || "",
  };
};

export const usersMapping = (users: SUser[]): User[] => {
  return users.map((user) => userMapping(user));
};
