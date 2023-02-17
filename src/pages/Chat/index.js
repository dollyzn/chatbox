import ChatsManager from "../../components/ChatsManager";

import LoggedInLayout from "../../layout";

function Chat() {
  return (
    <LoggedInLayout>
      <ChatsManager />
    </LoggedInLayout>
  );
}

export default Chat;
