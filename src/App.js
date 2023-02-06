import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider } from "./services/firebaseConfig";

import "./App.css";
import AppRoutes from "./routes";

export const App = () => {
  const [user] = useAuthState(auth);
  console.log(user);
  return <AppRoutes />;
};

// export const SignOut = () => {
//   return (
//     auth.currentUser && (
//       <Button
//         variant="contained"
//         className="SignOutButton"
//         onClick={() => signOut(auth)}
//       >
//         Sair
//       </Button>
//     )
//   );
// };

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }
