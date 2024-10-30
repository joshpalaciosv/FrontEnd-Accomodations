export interface Booking {
  id: number;
  booking: string;
  check_in_date: Date;
  check_out_date: Date;
  total_amount: number;
  status: string;
  accomodation_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  user: string;
  accomodation: string;
}
