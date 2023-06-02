using ParkingLot;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.ExceptionServices;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using static ParkingLot.enums;

namespace ParkingLot
{
    public class Manager
    {
        public UserInputs user = new UserInputs();
        public int TwoWheelerSlots { get; set; }
        public int FourWheelerSlots { get; set; }
        public int HeavyVehicleSlots { get; set; }
        public Dictionary<Slot, Ticket> Slots = new Dictionary<Slot, Ticket>();
        public int TwoWheelerPointer;
        public int FourWheelerPointer;
        public int HeavyVehiclePointer;
        public int unpark = 0;


        //public List<Slot> Slots = new List<Slot>();
        public Manager()
        {
            this.InputPrompt();

        }
        public static bool IsValidInput(string input, int low, int high)
        {
            try
            {
                int NumberInput = Convert.ToInt32(input);
                if (NumberInput > high || NumberInput < low)
                {
                    throw new FormatException();
                }
                else
                {
                    return true;
                }
            }
            catch (FormatException)
            {
                return false;
            }

        }
        public void InputPrompt() { 
            foreach(enums.VehicleType i in Enum.GetValues(typeof(enums.VehicleType)))
            {
                switch((int)i)
                {
                    case 0:
                        TwoWheelerSlots = user.GetCount(i);
                        TwoWheelerPointer = 0;
                        this.CreateSlot<TwoWheeler>(TwoWheelerSlots);
                        break;
                    case 1:
                        FourWheelerSlots = user.GetCount(i);
                        FourWheelerPointer = TwoWheelerSlots;
                        this.CreateSlot<FourWheeler>(FourWheelerSlots);
                        break;
                    case 2:
                        HeavyVehicleSlots = user.GetCount(i);
                        HeavyVehiclePointer = TwoWheelerSlots+FourWheelerSlots;
                        this.CreateSlot<HeavyVehicle>(HeavyVehicleSlots);
                        break;
                }
            }
            this.DialogueBox1();
            
        }
        public void CreateSlot<T>(int count) where T : Slot
        {
            for (int i = 1; i <= count; i++)
            {   
                Slots[((T)Activator.CreateInstance(typeof(T), new object[] { i }))] = null;
            }
        }
        public void DisplaySlots()
        {
            Console.WriteLine("The Slots in the Parking Lot");
            foreach (Slot i in Slots.Keys)
            {
                Console.WriteLine(Convert.ToString(i.Type) + i.SlotId + ": "+ CheckSlot(i.Parked));
            }
            this.DialogueBox1();
        }
        public string CheckSlot(bool Slot)
        {
            if (Slot)
            {
                return ("Parked");
            }
            else
            {
                return ("Vacant");
            }
        }

        public void DialogueBox1()
        {
            Console.WriteLine("What would you like to do....");
            Console.WriteLine("1. Park a Vehicle");
            Console.WriteLine("2. Display the Parking Lot Status");
            int unpark = 0;
            for (int i = 0;i< Slots.Count;i++)
            {
                if(Slots.ElementAt(i).Key.Parked == true)
                {
                    unpark = 1;
                }
            }
            if(unpark== 1)
            {
                Console.WriteLine("3. Unpark a vehicle");

            }
            int x = user.GetValue(0,4);
            if (x == 1)
            {
                this.ParkVehicle();
                
            }
            else if (x == 2)
            {
                this.DisplaySlots();
            }
            else if(x== 3)
            {
                this.UnparkVehicle();
            }
        }
        
        public void UnparkVehicle()
        {
            unpark = 1;
            Console.WriteLine("Enter the Slot Number in which you parked your Vehicle...Refer to your Ticket");
            int UnparkSlotNumber= user.GetValue(0,TwoWheelerSlots+FourWheelerSlots+HeavyVehicleSlots);
            if (Slots.ElementAt(UnparkSlotNumber).Key.Type == enums.VehicleType.TwoWheeler)
            {
                this.TwoWheelerPointer -= 1;
            }
            else if (Slots.ElementAt(UnparkSlotNumber).Key.Type == enums.VehicleType.FourWheeler)
            {
                this.FourWheelerPointer -= 1;
            }
            if (Slots.ElementAt(UnparkSlotNumber).Key.Type == enums.VehicleType.HeavyVehicle)
            {
                this.HeavyVehiclePointer -= 1;
            }
            UnparkSlotNumber -= 1;
            Slots.ElementAt(UnparkSlotNumber).Key.Parked = false;
            Console.WriteLine("Vehicle Unparked Successfully...Here's your Ticket");
            this.ViewTicket(UnparkSlotNumber);
        }
        public void ParkVehicle()
        {
            unpark = 0;
            Console.WriteLine("Enter the type of Vehicle to be parked");
            Console.WriteLine("1. Two Wheeler");
            Console.WriteLine("2. Four Wheeler");
            Console.WriteLine("3. Heavy Wheeler");
            int VehicleType=user.GetValue(0,4);
            ArrayList VehicleDetails= new ArrayList();
            if (VehicleType== 1)
            {
                SlotAvailability(enums.VehicleType.TwoWheeler,ref TwoWheelerPointer,TwoWheelerSlots);
                }
            else if (VehicleType == 2)
            {
                SlotAvailability(enums.VehicleType.FourWheeler,ref FourWheelerPointer,TwoWheelerSlots+FourWheelerSlots);
            }
            else if (VehicleType == 3)
            {
                SlotAvailability(enums.VehicleType.HeavyVehicle,ref HeavyVehiclePointer, TwoWheelerSlots + FourWheelerSlots+HeavyVehicleSlots);
               
            }
        }
        public void SlotAvailability(enums.VehicleType vehicleType,ref int slotPointer,int toatalSlots)
        {  
            if (slotPointer < toatalSlots)
                {   
                    AssignSlot(vehicleType,ref slotPointer);
                    
  
                }
            else
                {
                    Console.WriteLine("Sorry, No "+ vehicleType+ " are available at the moment");
                    this.DialogueBox1();
                }
        }
        public void AssignSlot(enums.VehicleType vehicleType,ref int slotLocation)
        {
            ArrayList VehicleDetails = new ArrayList();
            List<Vehicle> VehicleList = new List<Vehicle>();
            VehicleDetails = user.GetVehicleDetails(vehicleType);
            VehicleList.Add(new Vehicle(vehicleType, (string)VehicleDetails[0], (int)VehicleDetails[1]));
            Slots[Slots.ElementAt(slotLocation).Key]= new Ticket((int)VehicleDetails[1], slotLocation, DateTime.Now);
            int x = slotLocation + 1;
            Console.WriteLine("Vehicle Parked Successfully at Slot " + x);
            Slots.ElementAt(slotLocation).Key.Parked = true;
            slotLocation += 1;
            this.ViewTicket(slotLocation-1); 
        }

        public void ViewTicket(int slot)
        { 
            Console.WriteLine("Vehicle Number: " + Slots.ElementAt(slot).Value.VehicleNumber);
            int x = slot + 1;
            Console.WriteLine("Slot Number: " + x);
            Console.WriteLine("In Time: " + Slots.ElementAt(slot).Value.InTime.ToLongTimeString());
            if (unpark == 1)
            {
                Slots.ElementAt(slot).Value.OutTime= Convert.ToString(DateTime.Now);
                Console.WriteLine("Out Time: " + DateTime.Now.ToLongTimeString());
                Console.WriteLine("Fare: " + Math.Round(((DateTime.Now) - Slots.ElementAt(slot).Value.InTime).TotalMinutes*Slots.ElementAt(slot).Key.FarePerMinute));
                Slots[Slots.ElementAt(slot).Key] = null;

            }
            this.DialogueBox1();
        }
    }
}
