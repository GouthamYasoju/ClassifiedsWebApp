using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot
{
    public class HeavyVehicle: Slot
    {
        public HeavyVehicle(int Id) : base(Id,30, enums.VehicleType.HeavyVehicle) { }
    }
}
