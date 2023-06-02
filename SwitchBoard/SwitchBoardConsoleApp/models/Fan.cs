using PLAY_GROUND.Abstract;
using PLAY_GROUND.enums;

namespace PLAY_GROUND.modals
{
    public class Fan : Appliance
    {
        public Fan(int id, int applianceID) : base(id, applianceID, ApplianceType.Fan)
        {
        }
    }
}
