const UserProps = {
    name: String,
    username: String,
    avatar: String,
    online: Boolean
  };
  
  const MessageProps = {
    id: String,
    content: String,
    timestamp: String,
    unread: Boolean,
    sender: UserProps | 'You',
    attachment: {
      fileName: String,
      type: String,
      size: String
    }
  };
  
