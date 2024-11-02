// /api/V1/bookings/calendar/{id_accomodation}
//id_accomodation
//start_date
//end_date

export interface CalendarBooking {
    accomodation_id: number;
    booking: string;
    check_in_date: Date;
    check_out_date: Date;
    created_at: Date;
    id : number;
    status : string;
    total_amount : number;
    updated_at : Date;
    user_id : number;
  }

export interface CalendarEntry { 
    start: Date;
    end: Date;
    title: string;
}
  
