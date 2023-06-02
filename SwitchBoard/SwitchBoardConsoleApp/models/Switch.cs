namespace PLAY_GROUND
{
    public class Switch
    {
        public  int ID;
        public int ApplianceId;
        public bool State;
        public Switch (int id,bool state=false)
        {
            ID = id;
            ApplianceId = id;
            State = state;
        }
    }
}
