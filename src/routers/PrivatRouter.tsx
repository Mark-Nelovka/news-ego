import { Navigate } from "react-router-dom";
import { useAppSelector } from "state/hook";

interface IPrivatRouterProps {
  children: React.ReactElement;
}

export default function PrivatRoute({ children }: IPrivatRouterProps) {
  const isToken = useAppSelector((state) => state.auth.token);
  return <>{isToken ? children : <Navigate to="/news-ego" />}</>;
}
