using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot
{
    public class Ticket
    {
        public int VehicleNumber;
        public int SlotNumber;
        public DateTime InTime;
        public string OutTime= null;
        public Ticket(int vehicleNumber,int slotNumber,DateTime inTime) 
        { 
            this.VehicleNumber= vehicleNumber;
            this.SlotNumber= slotNumber;
            this.InTime= inTime;
        }
    }
}
