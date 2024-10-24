import RequestResetForm from "../components/forms/requestResetForm";
const RequestPasswordReset: React.FC = () => {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6 text-brand">Qwiz</h2>
      <p className="text-sm text-gray-500 text-center mb-6 leading-tight">
        Enter your email address to reset your password
      </p>
      <RequestResetForm />
    </>
  );
};

export default RequestPasswordReset;
