import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";

interface Props {
  isOpened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthDialog = ({ isOpened, setOpened }: Props) => {
  return (
    <AlertDialog open={isOpened}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Authentication Required</AlertDialogTitle>
          <AlertDialogDescription>
            To access this feature, you must be signed in. Please log in to
            continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpened(false)}>
            Cancel
          </AlertDialogCancel>
          <Link to={"/login"}>
            <AlertDialogAction>Log In</AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AuthDialog;
