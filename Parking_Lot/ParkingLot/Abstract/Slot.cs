using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot
{
    public abstract class Slot
    {
        public int SlotId { get; set; }
        public enums.VehicleType Type { get; set; }
        public bool Parked { get; set; }
        public int FarePerMinute { get; set; }
        //public int Fare { get; set; }
        public Slot(int number,int price,enums.VehicleType vehicle) 
        {
            this.SlotId = number;
            this.Type = vehicle;
            this.Parked = false;
            this.FarePerMinute = price;
           // this.Fare = price;
            
        }
    }
}
