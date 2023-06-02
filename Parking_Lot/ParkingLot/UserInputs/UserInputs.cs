using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot
{
    public class UserInputs
    { public int value;
        public int GetValue(int lo,int hi)
        {
            string b = Console.ReadLine();
            if (Manager.IsValidInput(b, lo, hi))
            {
                value = Convert.ToInt16(b);
            }
            else
            {
                Console.WriteLine("OH..ohhh!...INVALID input. Try Again");
                GetValue(lo, hi);
            }
            
            return value;

        }
        public ArrayList GetVehicleDetails(enums.VehicleType Vehicle)
        {
            ArrayList vehicleDetails = new ArrayList();
            Console.WriteLine("Enter the " + Vehicle+"name");
            string name=Console.ReadLine();
            vehicleDetails.Add(name);
            Console.WriteLine("Enter the vehicle Registration Number");
            int Reg= Convert.ToInt16(Console.ReadLine());
            vehicleDetails.Add(Reg);
            return vehicleDetails;
        }

        public int count;
        public int GetCount(enums.VehicleType i)
        {   
            Console.WriteLine("Enter the number of " + i + " solts: ");
            string b = Console.ReadLine();
            if (Manager.IsValidInput(b, 0, 1000))
            {
                count = Convert.ToInt16(b);
                
            }
            else
            {
                Console.WriteLine("Oops...That wasn't a valid input. Try Again");
                GetCount(i);
            }
            return count;
        }
    }
}
