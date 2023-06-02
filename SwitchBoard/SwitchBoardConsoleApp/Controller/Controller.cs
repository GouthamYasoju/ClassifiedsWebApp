using PLAY_GROUND.Abstract;
using PLAY_GROUND.modals;

namespace PLAY_GROUND
{
    public class Controller

    {
        public static int applainceID = 1;
        public static int applianceNumber;
        public static string status = string.Empty;
        public static int applianceCount;
        public static string count;
        public static int fanCount;
        public static int acCount;
        public static int bulbCount;
        public static List<Appliance> applianceList = new List<Appliance>();
        public static List<Switch> SwitchList = new List<Switch>();


        public Controller()
        {

            Faninput();
            createFan(fanCount);
            Acinput();
            createAc(acCount);
            Bulbinput();
            createBulb(bulbCount);
            show();


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

        public static void CheckState(bool deviceState)
        {
            if (deviceState)
            {
                status = "ON";
            }
            else
            {
                status = "OFF";
            }
        }
        public static void show()
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("Here are the Appliances and their present state in your room");
            Console.ResetColor();
            for (int i = 0; i < applianceList.Count; i++)
            {
                CheckState(SwitchList[i].State);
                Console.WriteLine(i + 1 + ". " + applianceList[i].Name + " is " + status);
            }
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("Choose the Appliance's Switch you want to toggle....");
            Console.ResetColor();



            string SwitchNumber = Console.ReadLine();
            if (IsValidInput(SwitchNumber, 0, applainceID - 1))
            {
                applianceNumber = Convert.ToInt32(SwitchNumber);
                ApplianceStatus(applianceNumber);
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Oh!...ohhh...That wasn't a valid choice,choose a valid switch number");
                Console.ResetColor();
                show();
            }

        }
        public static void ApplianceStatus(int applianceNumber)
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("What Next....?");


            CheckState(!SwitchList[applianceNumber - 1].State);
            Console.WriteLine("1. " + "Switch " + status + " " + applianceList[applianceNumber - 1].Name + " ?");
            Console.WriteLine("2. " + " Or choose another Appliance?");
            Console.WriteLine("3. " + " Turn Off all switches and leave the room?");
            Console.ResetColor();

            string action = Console.ReadLine();
            try
            {
                int Number;
                Number = Convert.ToInt32(action);
                if (Number > 3 || Number < 1)
                {
                    throw new FormatException();
                }
                else if (Number == 1)
                {
                    SwitchList[applianceNumber - 1].State = !SwitchList[applianceNumber - 1].State;
                    CheckState(SwitchList[applianceNumber - 1].State);
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine("Switched " + status + " " + applianceList[applianceNumber - 1].Name + " " + " successfully");
                    Console.ResetColor();
                    show();
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.Blue;
                    Console.WriteLine("Okay...Bye!");
                    Console.ResetColor();
                }


            }
            catch (FormatException)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Oops,Your Choice was incorrect. Try Choosing Again");
                Console.ResetColor();
                ApplianceStatus(applianceNumber);
            }
        }
        public static void Faninput()
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("enter the number of Fans");
            Console.ResetColor();
            count = Console.ReadLine();
            if (IsValidInput(count, 0, 1000))
            {
                fanCount = Convert.ToInt32(count);
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Oops...That wasn't a valid input...Try Again");
                Console.ResetColor();
                Faninput();
            }


        }
        public static void createFan(int count)
        {
            for (int i = 0; i < count; i++)
            {
                applianceList.Add(new Fan(i + 1, applainceID));
                SwitchList.Add(new Switch(applainceID));
                applainceID += 1;
            }
        }
        public static void Acinput()
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("enter the number of ACs");
            Console.ResetColor();
            count = Console.ReadLine();
            if (IsValidInput(count, 0, 1000))
            {
                acCount = Convert.ToInt32(count);
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Oops...That wasn't a valid input...Try Again");
                Console.ResetColor();
                Acinput();
            }

        }
        public static void createAc(int count)
        {
            for (int i = 0; i < count; i++)
            {
                applianceList.Add(new Ac(i + 1, applainceID));
                SwitchList.Add(new Switch(applainceID));

                applainceID += 1;
            }
        }
        public static void Bulbinput()
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("enter the number of Bulbs");
            Console.ResetColor();
            count = Console.ReadLine();
            if (IsValidInput(count, 0, 1000))
            {
                bulbCount = Convert.ToInt32(count);
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Oops...That wasn't a valid input...Try Again");
                Console.ResetColor();
                Bulbinput();
            }
        }
        public static void createBulb(int count)
        {
            for (int i = 0; i < count; i++)
            {
                applianceList.Add(new Bulb(i + 1, applainceID));
                SwitchList.Add(new Switch(applainceID));
                applainceID += 1;
            }
        }
    }
}
