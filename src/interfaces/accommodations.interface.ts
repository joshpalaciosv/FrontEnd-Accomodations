export interface Accommodation {
  id: number;
  name: string;
  address: string;
  description: string;
  image: string;
  created_at: Date;
  updated_at: Date;
}

export interface AddAccommodationForm {
  // El id no lo pide al crear el alojamiento, solo lo voy a usar para editarlo y usar la misma interfaz.
  id?: number;
  name: string;
  address: string;
  description: string;
}
