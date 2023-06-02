using PLAY_GROUND.enums;

namespace PLAY_GROUND.Abstract
{
    public abstract class Appliance
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ApplianceType Type { get; set; }

        public Appliance(int id, int applianceID, ApplianceType type)
        {
            Id = applianceID;
            Type = type;
            Name = type.ToString() + id;

        }

        public string GetApplianceName()
        {
            return "";
        }
    }


}
