using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot
{
    public class FourWheeler : Slot
    {
        public FourWheeler(int Id) : base(Id,10, enums.VehicleType.FourWheeler) { }
    }
}
