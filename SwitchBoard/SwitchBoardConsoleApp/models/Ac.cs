using PLAY_GROUND.Abstract;
using PLAY_GROUND.enums;

namespace PLAY_GROUND.modals
{
    public class Ac : Appliance
    {
        public Ac(int id, int applianceID) : base(id, applianceID, ApplianceType.AC)
        {
        }
    }
}