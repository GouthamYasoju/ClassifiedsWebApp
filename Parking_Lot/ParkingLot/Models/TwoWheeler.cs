using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot
{
    public class TwoWheeler:Slot
    {
        public TwoWheeler(int Id) : base( Id,2,enums.VehicleType.TwoWheeler ) { }
    }
}
