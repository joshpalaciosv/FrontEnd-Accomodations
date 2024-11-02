import {
    Avatar,
    Box,
    List,
    ListItem,
    Typography,
} from "@mui/joy";

import { Accommodation } from "../../../interfaces/accommodations.interface";

interface AccommodationProps {
    accommodation: Accommodation;
}

export const MoAccommodation = ({ accommodation }: AccommodationProps) => {
    const fechaCreacion = new Date(accommodation.created_at).toISOString().split("T")[0];
    const fechaActualizacion = new Date(accommodation.updated_at).toISOString().split("T")[0];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2, width: "500px" }}>
            <Typography level="h3">Información de Alojamiento</Typography>
            <List aria-labelledby="accommodation-info" sx={{ "--ListItemDecorator-size": "56px", display: "flex", flexDirection: "column", gap: 2 }}>
                <ListItem sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box
                        sx={{
                            display: { xs: "block", md: "flex" },
                            flexDirection: { xs: "column", md: "row" },
                            gap: 2,
                            alignItems: "center", 
                        }}
                    >
                        <Avatar
                            src={accommodation.image}
                            alt={accommodation.name}
                            sx={{ width: 100, height: 100, borderRadius: 2, alignSelf: { xs: "center", md: "flex-start" } }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                flexGrow: 1, 
                                justifyContent: "center", 
                            }}
                        >
                            <Typography level="title-sm">Nombre alojamiento: {accommodation.name}</Typography>
                            <Typography level="body-sm" noWrap>Dirección: {accommodation.address}</Typography>
                            <Typography level="body-sm">Fecha creación: {fechaCreacion}</Typography>
                            <Typography level="body-sm">Última actualización: {fechaActualizacion}</Typography>
                        </Box>
                    </Box>
                    <Typography level="body-sm">Descripción: {accommodation.description}</Typography>
                </ListItem>
            </List>
        </Box>
    );
};
