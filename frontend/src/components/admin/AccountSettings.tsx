import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { changePassword, updateProfile } from "@/api/auth";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { cardCls, errorCls, inputCls, labelCls, primaryBtnCls, successCls } from "./ui";

const AccountSettings = () => {
  const { admin } = useAdminAuth();

  const [email, setEmail] = useState(admin?.email || "");
  const [name, setName] = useState(admin?.name || "");
  const [profileMsg, setProfileMsg] = useState<string | null>(null);
  const [profileErr, setProfileErr] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<string | null>(null);
  const [passwordErr, setPasswordErr] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setProfileErr(null);
    setProfileMsg(null);
    setProfileLoading(true);
    try {
      await updateProfile({ name, email });
      setProfileMsg("Profile updated successfully.");
    } catch (err: any) {
      setProfileErr(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordErr(null);
    setPasswordMsg(null);
    setPasswordLoading(true);
    try {
      await changePassword(currentPassword, newPassword);
      setPasswordMsg("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setPasswordErr(err?.response?.data?.message || "Failed to update password");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <form onSubmit={handleProfileSubmit} className={`${cardCls} flex flex-col gap-4 p-6`}>
        <h2 className="text-sm font-semibold text-admin-navy">Account details</h2>
        <div>
          <label className={labelCls}>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
          />
        </div>
        {profileErr && <p className={errorCls}>{profileErr}</p>}
        {profileMsg && <p className={successCls}>{profileMsg}</p>}
        <button
          type="submit"
          disabled={profileLoading}
          className={primaryBtnCls}
        >
          {profileLoading ? "Saving..." : "Save changes"}
        </button>
      </form>

      <form onSubmit={handlePasswordSubmit} className={`${cardCls} flex flex-col gap-4 p-6`}>
        <h2 className="text-sm font-semibold text-admin-navy">Change password</h2>
        <div>
          <label className={labelCls}>Current password</label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={`${inputCls} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-muted hover:text-admin-navy"
              aria-label={showCurrentPassword ? "Hide password" : "Show password"}
            >
              {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div>
          <label className={labelCls}>New password</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`${inputCls} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-muted hover:text-admin-navy"
              aria-label={showNewPassword ? "Hide password" : "Show password"}
            >
              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {passwordErr && <p className={errorCls}>{passwordErr}</p>}
        {passwordMsg && <p className={successCls}>{passwordMsg}</p>}
        <button
          type="submit"
          disabled={passwordLoading}
          className={primaryBtnCls}
        >
          {passwordLoading ? "Updating..." : "Update password"}
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
