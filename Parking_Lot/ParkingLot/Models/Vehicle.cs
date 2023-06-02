using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot
{
    public class Vehicle
    {
        public int RegNumber;
        public enums.VehicleType Type;
        public string Name;
        public Vehicle(enums.VehicleType Type, string Name, int Number)
        {
            this.Type = Type;
            this.Name = Name;
            this.RegNumber= Number;

        }

        
    }
}
