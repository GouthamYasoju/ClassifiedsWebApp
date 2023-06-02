using PLAY_GROUND.Abstract;
using PLAY_GROUND.enums;

namespace PLAY_GROUND.modals
{
    public class Bulb : Appliance
    {
        public Bulb(int id, int applianceID) : base(id, applianceID, ApplianceType.Bulb)
        {
        }
    }
}