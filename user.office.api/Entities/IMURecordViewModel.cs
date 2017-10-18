namespace user.office.api.Entities
{
    public class IMURecordViewModel
    {
        
        public long Date{ get; set; }

        public double acc_x { get; set; }
        public double acc_y { get; set; }
        public double acc_z { get; set; }

        public double mag_x { get; set; }
        public double mag_y { get; set; }
        public double mag_z { get; set; }

        public double gyro_xangle { get; set; }
        public double gyro_yangle { get; set; }
        public double gyro_zangle { get; set; }
   
    }
}
