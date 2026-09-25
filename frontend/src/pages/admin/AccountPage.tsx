import AccountSettings from "@/components/admin/AccountSettings";
import PageHeader from "@/components/admin/PageHeader";

const AccountPage = () => {
  return (
    <div className="animate-fade-in-up">
      <PageHeader title="Account" subtitle="Your admin profile and password." />
      <AccountSettings />
    </div>
  );
};

export default AccountPage;
