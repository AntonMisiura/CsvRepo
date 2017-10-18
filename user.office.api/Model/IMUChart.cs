using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace user.office.api.Model
{
    public class IMUChart
    {
       
        public List<DataItem> acc_x { get; set; }
        public List<DataItem> acc_y { get; set; }
        public List<DataItem> acc_z { get; set; }

        public List<DataItem> mag_x { get; set; }
        public List<DataItem> mag_y { get; set; }
        public List<DataItem> mag_z { get; set; }

        public List<DataItem> gyro_xangle { get; set; }
        public List<DataItem> gyro_yangle { get; set; }
        public List<DataItem> gyro_zangle { get; set; }

        public IMUChart()
        {
            acc_x = new List<DataItem>();
            acc_y = new List<DataItem>();
            acc_z = new List<DataItem>();
            mag_x = new List<DataItem>();
            mag_y = new List<DataItem>();
            mag_z = new List<DataItem>();
            gyro_xangle = new List<DataItem>();
            gyro_yangle = new List<DataItem>();
            gyro_zangle = new List<DataItem>();
        }

    }
   
}
