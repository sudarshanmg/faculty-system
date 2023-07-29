"use client";

// Hooks
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";

// Actions
import { updateProfile } from "@/actions/updateAccount";

// UI
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/ui/Header";
import { Button } from "@/components/ui/button";
import Avatar from "./components/Avatar";

const Account = () => {
  const { user, userDetails, isLoading } = useUser();

  const [username, setUsername] = useState<any>(null);
  const [fullName, setFullName] = useState<any>(null);
  const [aadhaar, setAadhaar] = useState<any>(null);
  const [avatar_url, setAvatarUrl] = useState<any>(null);
  const [dob, setDob] = useState<any>(null);
  const [pan, setPan] = useState<any>(null);
  const [experience, setExperience] = useState<any>(null);
  const id = userDetails?.id;

  useEffect(() => {
    setUsername(userDetails?.username);
    setFullName(userDetails?.full_name);
    setAadhaar(userDetails?.aadhaar);
    setDob(userDetails?.dob);
    setPan(userDetails?.pan);
    setExperience(userDetails?.experience);
    setAvatarUrl(userDetails?.avatar_url);
  }, [userDetails]);

  const handleSubmit = async () => {
    await updateProfile({
      id,
      username,
      fullName,
      aadhaar,
      experience,
      dob,
      pan,
      avatar_url,
    });
  };

  return (
    <div>
      <header>
        <Header text="Account" />
      </header>
      {!isLoading && (
        <div className="mx-12">
          <Avatar
            uid={id}
            url={avatar_url}
            size={150}
            onUpload={(url: any) => {
              setAvatarUrl(url);
              updateProfile({
                fullName,
                username,
                avatar_url: url,
                aadhaar,
                dob,
                experience,
                pan,
                id,
              });
            }}
          />
          <div className="my-8">
            <Label htmlFor="id">User ID: </Label>
            <Input disabled type="text" name="id" value={id} />
          </div>
          <div className="my-8">
            <Label htmlFor="id">Email: </Label>
            <Input disabled type="text" value={user?.email} />
          </div>
          <div className="my-8">
            <Label htmlFor="username">Username: </Label>
            <Input
              name="username"
              type="text"
              value={username || ""}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="my-8">
            <Label htmlFor="full_name">Full name: </Label>
            <Input
              name="full_name"
              type="text"
              value={fullName || ""}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </div>
          <div className="my-8">
            <Label htmlFor="experience">Experience: </Label>
            <Input
              name="experience"
              type="number"
              value={experience || ""}
              onChange={(e) => {
                setExperience(+e.target.value);
              }}
            />
          </div>
          <div className="my-8">
            <Label htmlFor="dob">DOB: </Label>
            <Input
              name="dob"
              type="date"
              value={dob || ""}
              onChange={(e) => {
                setDob(e.target.value);
              }}
            />
          </div>
          <div className="my-8">
            <Label htmlFor="aadhaar">Aadhaar: </Label>
            <Input
              name="aadhaar"
              type="number"
              value={aadhaar || ""}
              onChange={(e) => {
                setAadhaar(+e.target.value);
              }}
            />
          </div>
          <div className="my-8">
            <Label htmlFor="pan">PAN: </Label>
            <Input
              name="pan"
              type="text"
              value={pan || ""}
              onChange={(e) => {
                setPan(e.target.value);
              }}
            />
          </div>
          <Button onClick={handleSubmit} className="my-8">
            Update Profile
          </Button>
        </div>
      )}
    </div>
  );
};

export default Account;
