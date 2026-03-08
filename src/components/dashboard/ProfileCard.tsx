import { MapPin, GraduationCap, Building } from "lucide-react";
import { currentUser } from "@/data/mockData";

const ProfileCard = () => {
  const initials = currentUser.name.split(" ").map(n => n[0]).join("");

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full gradient-orange flex items-center justify-center text-xl font-bold text-primary-foreground shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-foreground text-lg truncate">{currentUser.name}</h3>
          <p className="text-sm text-muted-foreground">@{currentUser.username}</p>
        </div>
      </div>
      <p className="text-sm text-secondary-foreground/70 italic mb-4 leading-relaxed">
        "{currentUser.bio}"
      </p>
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-3.5 h-3.5 text-primary" />
          <span>{currentUser.year}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building className="w-3.5 h-3.5 text-primary" />
          <span className="truncate">{currentUser.university}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span>{currentUser.location}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
