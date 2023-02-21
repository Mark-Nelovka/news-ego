import { Navigate } from "react-router-dom";

interface IPrivatRouterProps {
  children: React.ReactElement;
}

export default function PrivatRoute({ children }: IPrivatRouterProps) {
  const isToken = null; // We you will add token with redux store
  return <>{isToken ? children : <Navigate to="/news-ego" />}</>;
}
