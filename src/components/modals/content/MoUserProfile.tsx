import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import { User } from "../../../interfaces/user.interface";

interface UserProfileProps {
  user: User;
}
export const MoUserProfile = ({ user }: UserProfileProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
      <Typography level="h3">Perfil</Typography>
      <List
        aria-labelledby="ellipsis-list-demo"
        sx={{ "--ListItemDecorator-size": "56px" }}
      >
        <ListItem>
          <ListItemDecorator>
            <Avatar size="lg">{user.name[0]}</Avatar>
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">{user.name}</Typography>
            <Typography level="body-sm" noWrap>
              {user.email}
            </Typography>
          </ListItemContent>
        </ListItem>
      </List>
    </Box>
  );
};
