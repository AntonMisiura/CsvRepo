using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AdminDashboard.Models
{
    public class PidsDictionaryHolder
    {
     
        public static Dictionary<string, string> pids =
             new Dictionary<string, string>();
        string contentRootPath;

        public PidsDictionaryHolder(IHostingEnvironment hostingEnvironment)
        {
            contentRootPath = hostingEnvironment.ContentRootPath;
            FormDictionary(GetPidsList());
        }

        public string GetPidsList() {
            string result;
            try
            {
                FileStream fileStream = new FileStream(contentRootPath + "/pidsDictionary.txt", FileMode.Open);
                using (StreamReader reader = new StreamReader(fileStream))
                {
                    result = reader.ReadToEnd();
                }
                return result;
            }
            catch (Exception ex) {
                return null;
            }

            
        }
        public void FormDictionary(string fileData) {
            if (fileData != null) {
                string[] pidLines = fileData.Split('*');
                foreach (var line in pidLines)
                {
                    var buf = line.Split('#');
                    pids.Add(buf[0], buf[1]);
                }
            }
            
        }




       /* public void PidsDictionaryHolderN() {
            pids.Add(0, "PIDs supported [01 - 20]");
            pids.Add(1, "Monitor status since DTCs cleared. (Includes malfunction indicator lamp (MIL) status and number of DTCs.)");
            pids.Add(2, "Freeze DTC"); pids.Add(3, "Fuel system status"); pids.Add(4, "Calculated engine load");
            pids.Add(5, "Engine coolant temperature"); pids.Add(6, "Short term fuel trim-Bank 1"); pids.Add(7, "Long term fuel trim-Bank 1");
            pids.Add(8, "Short term fuel trim-Bank 2"); pids.Add(9, "Long term fuel trim-Bank 2"); pids.Add(10, "Fuel pressure (gauge pressure)");
            pids.Add(11, "Intake manifold absolute pressure"); pids.Add(12, "Engine RPM"); pids.Add(13, "Vehicle speed"); pids.Add(14, "Timing advance");
            pids.Add(15, "Intake air temperature"); pids.Add(16, "MAF air flow rate"); pids.Add(17, "Throttle position"); pids.Add(18, "Commanded secondary air status");
            pids.Add(19, "Oxygen sensors present (in 2 banks)");
            pids.Add(20, "Oxygen Sensor 1 A: Voltage B: Short term fuel trim");
            pids.Add(21, "Oxygen Sensor 2 A: Voltage B: Short term fuel trim");
            pids.Add(22, "Oxygen Sensor 3 A: Voltage B: Short term fuel trim");
            pids.Add(23, "Oxygen Sensor 4 A: Voltage B: Short term fuel trim");
            pids.Add(24, "Oxygen Sensor 5 A: Voltage B: Short term fuel trim");
            pids.Add(25, "Oxygen Sensor 6 A: Voltage B: Short term fuel trim");
            pids.Add(26, "Oxygen Sensor 7 A: Voltage B: Short term fuel trim");
            pids.Add(27, "Oxygen Sensor 8 A: Voltage B: Short term fuel trim");
            pids.Add(28, "OBD standards this vehicle conforms to");
            pids.Add(29, "Oxygen sensors present(in 4 banks)");
            pids.Add(30, "Auxiliary input status");
            pids.Add(31, "Run time since engine start");
            pids.Add(32, "PIDs supported[21 - 40]");
            pids.Add(33, "Distance traveled with malfunction indicator lamp(MIL) on");
            pids.Add(34, "Fuel Rail Pressure(relative to manifold vacuum)");
            pids.Add(35, "Fuel Rail Gauge Pressure(diesel, or gasoline direct injection)");
            pids.Add(36, "Oxygen Sensor 1 AB: Fuel–Air Equivalence Ratio CD: Voltage");
            pids.Add(37, "Oxygen Sensor 2 AB: Fuel–Air Equivalence Ratio CD: Voltage");
            pids.Add(38, "Oxygen Sensor 3 AB: Fuel–Air Equivalence Ratio CD: Voltage");
            pids.Add(39, "Oxygen Sensor 4 AB: Fuel–Air Equivalence Ratio CD: Voltage");
            pids.Add(40, "Oxygen Sensor 5 AB: Fuel–Air Equivalence Ratio CD: Voltage");
            pids.Add(41, "Oxygen Sensor 6 AB: Fuel–Air Equivalence Ratio CD: Voltage"); 
            pids.Add(42, "Oxygen Sensor 7 AB: Fuel–Air Equivalence Ratio CD: Voltage");
            pids.Add(43, "Oxygen Sensor 8 AB: Fuel–Air Equivalence Ratio CD: Voltage");
            pids.Add(44, "Commanded EGR"); pids.Add(45, "EGR Error");
            pids.Add(46, "Commanded evaporative purge");
            pids.Add(47, "Fuel Tank Level Input");
            pids.Add(48, "Warm - ups since codes cleared");
            pids.Add(49, "Distance traveled since codes cleared");
            pids.Add(50, "Evap.System Vapor Pressure");
            pids.Add(51, "Absolute Barometric Pressure"); pids.Add(52, "Oxygen Sensor 1AB: Fuel–Air Equivalence RatioCD: Current");
            pids.Add(53, "Oxygen Sensor 2 AB: Fuel–Air Equivalence Ratio CD: Current");
            pids.Add(54, "Oxygen Sensor 3 AB: Fuel–Air Equivalence Ratio CD: Current");
            pids.Add(55, "Oxygen Sensor 4 AB: Fuel–Air Equivalence Ratio CD: Current");
            pids.Add(56, "Oxygen Sensor 5 AB: Fuel–Air Equivalence Ratio CD: Current");
            pids.Add(57, "Oxygen Sensor 6 AB: Fuel–Air Equivalence Ratio CD: Current");
            pids.Add(58, "Oxygen Sensor 7 AB: Fuel–Air Equivalence Ratio CD: Current");
            pids.Add(59, "Oxygen Sensor 8 AB: Fuel–Air Equivalence Ratio CD: Current");
            pids.Add(60, "Catalyst Temperature: Bank 1, Sensor 1");
            pids.Add(61, "Catalyst Temperature: Bank 2, Sensor 1");
            pids.Add(62, "Catalyst Temperature: Bank 1, Sensor 2");
            pids.Add(63, "Catalyst Temperature: Bank 2, Sensor 2");
            pids.Add(64, "PIDs supported[41 - 60]");
            pids.Add(65, "Monitor status this drive cycle");
            pids.Add(66, "Control module voltage");
            pids.Add(67, "Absolute load value");
            pids.Add(68, "Fuel–Air commanded equivalence ratio");
            pids.Add(69, "Relative throttle position");
            pids.Add(70, "Ambient air temperature");
            pids.Add(71, "Absolute throttle position B");
            pids.Add(72, "Absolute throttle position C");
            pids.Add(73, "Accelerator pedal position D");
            pids.Add(74, "Accelerator pedal position E");
            pids.Add(75, "Accelerator pedal position F"); pids.Add(76, "Commanded throttle actuator"); pids.Add(77, "Time run with MIL on"); pids.Add(78, "Time since trouble codes cleared");
            pids.Add(79, "Maximum value for Fuel–Air equivalence ratio, oxygen sensor voltage, oxygen sensor current, and intake manifold absolute pressure");
            pids.Add(80, "Maximum value for air flow rate from mass air flow sensor"); pids.Add(81, "Fuel Type"); pids.Add(82, "Ethanol fuel % ");
            pids.Add(83, "Absolute Evap system Vapor Pressure"); pids.Add(84, "Evap system vapor pressure"); pids.Add(85, "Short term secondary oxygen sensor trim, A: bank 1, B: bank 3");
            pids.Add(86, "Long term secondary oxygen sensor trim, A: bank 1, B: bank 3"); pids.Add(87, "Short term secondary oxygen sensor trim, A: bank 2, B: bank 4");
            pids.Add(88, "Long term secondary oxygen sensor trim, A: bank 2, B: bank 4"); pids.Add(89, "Fuel rail absolute pressure"); pids.Add(90, "Relative accelerator pedal position");
            pids.Add(91, "Hybrid battery pack remaining life"); pids.Add(92, "Engine oil temperature"); pids.Add(93, "Fuel injection timing"); pids.Add(94, "Engine fuel rate");
            pids.Add(95, "Emission requirements to which vehicle is designed"); pids.Add(96, "PIDs supported[61 - 80]"); pids.Add(97, "Driver's demand engine - percent torque");
            pids.Add(98, "Actual engine - percent torque"); pids.Add(99, "Engine reference torque"); pids.Add(100, "Engine percent torque data"); pids.Add(101, "Auxiliary input / output supported");
            pids.Add(102, "Mass air flow sensor"); pids.Add(103, "Engine coolant temperature"); pids.Add(104, "Intake air temperature sensor"); pids.Add(105, "Commanded EGR and EGR Error");
            pids.Add(106, "Commanded Diesel intake air flow control and relative intake air flow position"); pids.Add(107, "Exhaust gas recirculation temperature");
            pids.Add(108, "Commanded throttle actuator control and relative throttle position"); pids.Add(109, "Fuel pressure control system"); pids.Add(110, "Injection pressure control system");
            pids.Add(111, "Turbocharger compressor inlet pressure"); pids.Add(112, "Boost pressure control"); pids.Add(113, "Variable Geometry turbo (VGT) control"); pids.Add(114, "Wastegate control");
            pids.Add(115, "Exhaust pressure"); pids.Add(116, "Turbocharger RPM"); pids.Add(117, "Turbocharger temperature"); pids.Add(118, "Turbocharger temperature"); pids.Add(119, "Charge air cooler temperature (CACT)");
            pids.Add(120, "Exhaust Gas temperature (EGT) Bank 1"); pids.Add(121, "Exhaust Gas temperature (EGT) Bank 2"); pids.Add(122, "Diesel particulate filter (DPF)"); pids.Add(123, "Diesel particulate filter (DPF)");
            pids.Add(124, "Diesel Particulate filter (DPF) temperature"); pids.Add(125, "NOx NTE (Not-To-Exceed) control area status"); pids.Add(126, "PM NTE (Not-To-Exceed) control area status"); pids.Add(127, "Engine run time");
            pids.Add(128, "PIDs supported [81 - A0]"); pids.Add(129, "Engine run time for Auxiliary Emissions Control Device(AECD)"); pids.Add(130, "Engine run time for Auxiliary Emissions Control Device(AECD)");
            pids.Add(131, "NOx sensor"); pids.Add(132, "Manifold surface temperature"); pids.Add(133, "NOx reagent system"); pids.Add(134, "Particulate matter (PM) sensor"); pids.Add(135, "Intake manifold absolute pressure");
            pids.Add(160, "PIDs supported [A1 - C0]"); pids.Add(192, "PIDs supported [C1 - E0]"); pids.Add(195, " ?"); pids.Add(196, " ?"); 


        }*/
    }
}
